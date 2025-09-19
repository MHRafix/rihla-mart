import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	LineItem,
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
	ProductPagination,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { trackEvent } from '@/lib/fbPixel';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { All_Products_Query, Place_Order_Mutation } from './~query.gql/query';
// @ts-ignore
import 'swiper/css';
import Header from './~module/components/Header';
import PriceAndReview from './~module/components/PriceAndReview';
import ProductDetails from './~module/components/ProductDetails';
import VideoAndHeading from './~module/components/VideoAndHeading';

export const Route = createFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [productData, setProductData] = useState<ProductDataType>();
	const navigate = useNavigate();

	const form = useForm<FormValues>({
		// @ts-ignore
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			quantity: 1,
			code: '',
			specialNote: '', // 👈 now optional
		},
	});

	const placeOrder = useMutation({
		mutationFn: async (payload: any) => {
			await gqlRequest({
				query: Place_Order_Mutation,
				variables: payload,
			});

			trackEvent('Purchase', {
				value: payload?.payload?.total,
				currency: 'BDT',
				content_ids: [productFetchedData?._id],
				contents: payload?.payload?.items?.map((item: LineItem) => ({
					code: item?.code,
					quantity: item?.quantity,
					item_price: item?.price,
					id: item?.product,
				})),
			});
		},
		onSuccess(data) {
			toast.success('Order has been placed.');
			// @ts-ignore
			navigate({ to: `/order-success?orderId=${data?.placeOrder?._id}` });
		},
	});

	const { data: productFetchedData } = useQuery({
		queryKey: ['All_Products_Query'],
		queryFn: async () => {
			const res = await gqlRequest<{ products: ProductPagination }>({
				query: All_Products_Query,
				variables: {
					orgUid: import.meta.env.VITE_APP_ORGANIZATION_UID,
				},
			});
			return res?.products?.nodes?.[0];
		},
	});

	// ✅ submit handler
	const onSubmit = (data: FormValues) => {
		const productPrice = priceByQuantity(data?.quantity, productData!);

		const payload = {
			payload: {
				items: [
					{
						product: productFetchedData?._id,
						price: productPrice,
						quantity: data?.quantity,
						code: data?.code,
						subtotal: productPrice,
					},
				],
				status: OrderStatus.Pending,
				billing: {
					name: data?.name,
					phone: data?.phone,
					address: data?.address,
				},
				specialNote: data?.specialNote,
				total: productPrice,
				deliveryFee: 0,
				payment: {
					amount: productPrice,
					method: PaymentMethod.CashOnDelivery,
					status: PaymentStatus.Due,
				},
				orgUID: import.meta.env.VITE_APP_ORGANIZATION_UID,
			},
		};
		placeOrder?.mutate(payload);
	};

	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/MHRafix/rihla-mart-data/main/data.json'
		)
			.then((res) => res.json())
			.then((data) => {
				setProductData(data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className='bg-white text-purple-950 min-h-screen'>
			<Header productData={productData!} />
			<main className='space-y-12'>
				<VideoAndHeading />
				<ProductDetails
					productData={productData!}
					productFetchedData={productFetchedData!}
				/>
				<PriceAndReview productData={productData!} />

				<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
					<p className='text-md text-amber-500 leading-12'>✅ ২ পিস ১৭০০</p>
					<p className='text-md text-amber-500 leading-12'>✅ ৩ পিস ২৪৫০</p>
					<p className='text-md text-amber-500 leading-12'>✅ ৪ পিস ৩২০০</p>

					<h2 className='mt-3 text-lg font-medium bg-amber-800 p-2 rounded-xl'>
						✅ পাইকারি নিতে কল করুন {productData?.whatsappNumber}
					</h2>
				</section>
				<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
					<h1 className='text-3xl text-amber-500 leading-12'>
						😍 ডেলিভারি চার্জ <br /> ফ্রি 😍
					</h1>

					<h2 className='mt-3 text-xl font-medium leading-8'>
						অগ্রিম কোন টাকা দিতে হবে না। পার্সেল হাতে বুঝে পেয়ে, চেক করে তারপর
						ডেলিভারি ম্যানের কাছে টাকা পরিশোধ করতে পারবেন।
					</h2>
				</section>
				<section className='mx-4 py-3'>
					<Card className='bg-white text-purple-950 border shadow-sm mx-auto'>
						<CardContent className='px-4 space-y-4'>
							<h3 className='text-2xl font-bold text-center'>
								অর্ডার করুন এখনই
							</h3>

							<Form {...form}>
								<form // @ts-ignore
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-4'
								>
									{/* Name */}
									<FormField // @ts-ignore
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													আপনার নাম <span className='text-red-500'>*</span>
												</FormLabel>
												<FormControl>
													<Input
														placeholder='আপনার নাম'
														{...field}
														className='py-6'
														disabled={placeOrder.isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Phone */}
									<FormField // @ts-ignore
										control={form.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													মোবাইল নাম্বার <span className='text-red-500'>*</span>
												</FormLabel>
												<FormControl>
													<Input
														placeholder='মোবাইল নাম্বার'
														{...field}
														className='py-6'
														disabled={placeOrder.isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Address */}
									<FormField // @ts-ignore
										control={form.control}
										name='address'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													ঠিকানা - (জেলা, থানা, পোস্ট/ইউনিয়ন, গ্রাম)
													<span className='text-red-500'>*</span>
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='বিস্তারিত ঠিকানা ...'
														{...field}
														className='py-6'
														disabled={placeOrder.isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Quantity with stepper */}
									<FormField // @ts-ignore
										control={form.control}
										name='quantity'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													কোয়ান্টিটি <span className='text-red-500'>*</span>
												</FormLabel>
												<div className='grid grid-cols-3 w-full border rounded-xl overflow-hidden'>
													<Button
														type='button'
														variant='ghost'
														className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-6'
														onClick={() =>
															field.onChange(
																Math.max(1, (field.value ?? 1) - 1)
															)
														}
														disabled={
															field?.value === 1 || placeOrder.isPending
														}
													>
														➖
													</Button>
													<div className='flex items-center justify-center bg-white font-semibold'>
														{field?.value}
													</div>
													<Button
														type='button'
														variant='ghost'
														className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-6'
														onClick={() =>
															field.onChange((field.value ?? 1) + 1)
														}
														disabled={
															field?.value === 4 || placeOrder.isPending
														}
													>
														➕
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Product Code */}
									<FormField // @ts-ignore
										control={form.control}
										name='code'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													প্রোডাক্ট কোড <span className='text-red-500'>*</span>
												</FormLabel>

												<FormControl>
													<Input
														disabled={placeOrder.isPending}
														placeholder='প্রোডাক্ট কোড দিন'
														{...field}
														className='py-6'
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Extra Note (Optional) */}
									<FormField
										// @ts-ignore
										control={form.control}
										name='specialNote'
										render={({ field }) => (
											<FormItem>
												<FormLabel>অতিরিক্ত নোট (অপশনাল)</FormLabel>
												<FormControl>
													<Textarea
														placeholder='অতিরিক্ত কিছু জানাতে চাইলে লিখুন'
														{...field}
														className='py-6'
														disabled={placeOrder.isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className='text-purple-950 bg-white p-4 rounded-xl border border-purple-950 space-y-2'>
										<h2 className='text-lg font-semibold text-center'>
											অর্ডার সারাংশ
										</h2>
										<div className='flex justify-between text-base'>
											<span className='text-lg font-medium'>একক মূল্য:</span>
											<span className='text-lg font-medium'>
												<span className='font-extrabold'>৳</span> 900
											</span>
										</div>
										<div className='flex justify-between text-base'>
											<span className='text-lg font-medium'>কোয়ান্টিটি:</span>
											<span className='text-lg font-medium'>
												{form.watch('quantity')}
											</span>
										</div>
										<div className='flex justify-between text-base'>
											<span className='text-lg font-medium'>ডিসকাউন্ট:</span>
											<span className='font-extrabold'>
												৳{' '}
												{(form.watch('quantity') === 2 && 100) ||
													(form.watch('quantity') === 3 && 250) ||
													(form.watch('quantity') === 4 && 400) ||
													0.0}
											</span>
										</div>
										<hr className='border-purple-300 my-2' />
										<div className='flex justify-between text-xl font-bold'>
											<span>মোট টাকা:</span>
											<span className='font-extrabold'>
												৳{' '}
												{(form.watch('quantity') === 1 && 900) ||
													(form.watch('quantity') === 2 && 1700) ||
													(form.watch('quantity') === 3 && 2450) ||
													(form.watch('quantity') === 4 && 3200)}
											</span>
										</div>
									</div>

									<Button
										type='submit'
										className='w-full bg-purple-950 text-white font-bold py-7 cursor-pointer text-xl'
										disabled={placeOrder.isPending}
									>
										{placeOrder.isPending ? (
											<Loader2 className='!w-6 !h-6 animate-spin spin-in-180' />
										) : (
											'অর্ডার কনফার্ম করুন'
										)}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</section>
			</main>
		</div>
	);
}
// ✅ Yup validation schema
const schema = yup.object({
	name: yup.string().required('আপনার নাম দিন'),
	phone: yup
		.string()
		.required('মোবাইল নাম্বার দিন')
		.matches(/^(?:\+?88)?01[3-9]\d{8}$/, 'সঠিক মোবাইল নাম্বার দিন'),
	address: yup.string().required('ঠিকানা দিন'),
	quantity: yup
		.number()
		.typeError('সংখ্যা দিন')
		.min(1, 'কমপক্ষে ১ টি দিতে হবে')
		.required('কমপক্ষে ১ টি দিতে হবে'),
	code: yup.string().required('প্রোডাক্ট কোড দিন'),
	extraNote: yup
		.string()
		.transform((val) => (val === '' ? undefined : val)) // 👈 fix for optional
		.optional(),
});

type FormValues = {
	name: string;
	phone: string;
	address: string;
	quantity: number;
	code: string;
	specialNote?: string; // 👈 এখানে optional
};

export type ProductDataType = {
	productMainTitle: string;
	productVideoLink: string;
	unitPrice: number;
	priceFor2product: number;
	priceFor3product: number;
	priceFor4product: number;
	mobileNumber: string;
	facebook: string;
	whatsappNumber: string;
	description: string[];
	reviewImages: string[];
};

const priceByQuantity = (quantity: number, productData: ProductDataType) => {
	switch (quantity) {
		case 1:
			return productData?.unitPrice;
		case 2:
			return productData?.priceFor2product;
		case 3:
			return productData?.priceFor3product;
		case 4:
			return productData?.priceFor4product;

		default:
			break;
	}
};
