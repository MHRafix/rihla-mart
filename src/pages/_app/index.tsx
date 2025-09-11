import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
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
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
	ProductPagination,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Pause, Play } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { All_Products_Query, Place_Order_Mutation } from './~query.gql/query';

export const Route = createFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [productData, setProductData] = useState<ProductDataType>();
	const navigate = useNavigate();

	const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 1,
		},
	});

	// autoplay effect
	useEffect(() => {
		if (!slider) return;
		let timer: NodeJS.Timeout;
		function autoplay() {
			timer = setInterval(() => {
				slider.current?.next();
			}, 2500); // 2.5s autoplay
		}
		autoplay();
		return () => clearInterval(timer);
	}, [slider]);

	const form = useForm<FormValues>({
		// @ts-ignore
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			quantity: 1,
			code: '',
			extraNote: undefined, // 👈 now optional
		},
	});

	const placeOrder = useMutation({
		mutationFn: (payload: any) =>
			gqlRequest({
				query: Place_Order_Mutation,
				variables: payload,
			}),
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
					extraNote: data?.extraNote,
				},
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

	const productImages = Array.from(
		{ length: 40 },
		(_, i) => `https://picsum.photos/400/400?random=${i + 1}`
	);

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

	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleTogglePlay = () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
		}
	};
	return (
		<div className='bg-white text-purple-950 min-h-screen'>
			{/* Header */}
			<header className='flex justify-between items-center px-4 py-4 shadow-md border-b'>
				<h1 className='text-2xl font-bold'>RihlaMart</h1>
				<div className='flex gap-3'>
					<img
						onClick={() =>
							window.open(
								'https://facebook.com/sunnahsmartcollection',
								'_blank'
							)
						}
						src='https://cdn-icons-png.flaticon.com/128/15047/15047435.png'
						className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					/>
					<img
						onClick={() =>
							window.open(
								`https://wa.me/${productData?.whatsappNumber}`,
								'_blank'
							)
						}
						src='https://cdn-icons-png.flaticon.com/128/3670/3670051.png'
						className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					/>
					<img
						onClick={() =>
							(window.location.href = `tel:${productData?.whatsappNumber}`)
						}
						src='https://cdn-icons-png.flaticon.com/128/724/724664.png'
						className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					/>
				</div>
			</header>

			<main className='space-y-12'>
				<div className='text-center px-4 py-5 bg-purple-950 text-white rounded-xl mt-5 mx-4'>
					<h2 className='text-xl font-bold'>
						১০০% সুতি কাপড়ের সালাত লং খিমার।
					</h2>
				</div>
				{/* Section 1: Hadith */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					className='text-center px-4 py-5 bg-purple-950 text-white rounded-xl mt-5 mx-4'
				>
					<h2 className='text-xl md:text-4xl font-bold mb-4'>
						রাসূলুল্লাহ (সা.) বলেন,
					</h2>
					<h2 className='text-3xl font-bold mb-4'>
						لا تقبل صلاة الحائض إلا بخمار
					</h2>
					<p className='mt-2 text-xl font-semibold'>
						খিমার পরিধান ছাড়া কোনো প্রাপ্ত বয়স্কা নারীর নামাজ কবূল হবেনা।
						(তিরমিজি ৩৭৭, মিশকাত ৭৬২ ও আবু দাউদ ৬৪১)
					</p>
				</motion.section>

				{/* Section 2: Video */}
				<div className='mx-auto px-4'>
					<div className='relative !w-full h-[400px] overflow-hidden rounded-2xl shadow-lg bg-black aspect-video'>
						<video
							ref={videoRef}
							className='absolute inset-0 w-full h-full object-fill rounded-2xl'
							src='/video.mp4'
							controls={false} // hide default controls
						/>

						{/* Center play button */}
						<button
							onClick={handleTogglePlay}
							className='absolute inset-0 flex items-center justify-center'
						>
							<div className='bg-black/50 rounded-full p-6 hover:bg-black/70 transition'>
								{isPlaying ? (
									<Pause className='w-10 h-10 text-white' />
								) : (
									<Play className='w-10 h-10 text-white' />
								)}
							</div>
						</button>
					</div>
				</div>

				{/* Section 3: Price */}
				<section className='text-center font-bold space-y-6 rounded-xl mx-4'>
					{/* Title & Price Block */}
					<div className='bg-purple-950 text-white rounded-xl p-6 space-y-4 shadow-lg'>
						<h3 className='text-2xl'>
							খিমার প্রাইস{' '}
							<span className='ml-2 text-4xl font-extrabold text-amber-400 underline underline-offset-[10px]'>
								{productData?.unitPrice} টাকা
							</span>
						</h3>
					</div>

					{/* Delivery Block */}
					<div className='bg-teal-800 text-white rounded-xl p-5 shadow-md'>
						<h2 className='text-2xl'>ডেলিভারি চার্জ ফ্রি 😀</h2>
					</div>
				</section>

				{/* Section 4: Product Carousel */}
				<section className='px-4'>
					<div
						ref={sliderRef}
						className='keen-slider rounded-xl overflow-hidden'
					>
						{productImages.slice(0, 5).map((img, idx) => (
							<div key={idx} className='keen-slider__slide flex justify-center'>
								<img
									src={img}
									alt='Product'
									className='w-full h-80 object-cover rounded-xl border'
								/>
							</div>
						))}
					</div>
				</section>

				{/* Section 5: Product Details */}
				<section className='px-4'>
					<Card className='text-white bg-purple-950 border shadow-sm'>
						<CardContent className='px-4 py-3 space-y-3'>
							<h3 className='text-2xl font-bold'>প্রোডাক্ট ডিটেইলসঃ</h3>
							<ul className='list-disc pl-5 space-y-2 text-lg font-medium'>
								{productData?.description?.map((description, idx) => (
									<li key={idx}>{description}</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</section>

				{/* Section 6: Image Grid */}
				<section className='px-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{productFetchedData?.carouselImages?.map((img, idx) => (
							<img
								key={idx}
								src={img?.externalUrl!}
								alt='Product'
								className='w-full h-[250px] object-cover rounded-xl border'
							/>
						))}
					</div>
				</section>

				{/* Section 7: Free Delivery */}
				<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
					<h1 className='text-3xl text-amber-500 leading-12'>
						✅ ডেলিভারি চার্জ <br /> 😀 একদম ফ্রি 😀
					</h1>

					<h2 className='mt-3 text-xl font-medium leading-8'>
						অগ্রিম কোন টাকা দিতে হবে না। পার্সেল হাতে বুঝে পেয়ে, চেক করে তারপর
						ডেলিভারি ম্যানের কাছে টাকা পরিশোধ করতে পারবেন।
					</h2>
				</section>

				<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
					<p className='text-lg text-amber-500 leading-12'>✅ ২ পিস ১৭০০</p>
					<p className='text-lg text-amber-500 leading-12'>✅ ৩ পিস ২৪৫০</p>
					<p className='text-lg text-amber-500 leading-12'>✅ ৪ পিস ৩২০০</p>

					<h2 className='mt-3 text-lg font-medium bg-amber-800 p-2 rounded-xl'>
						✅ পাইকারি নিতে কল করুন {productData?.whatsappNumber}
					</h2>
				</section>
				{/* Section 8: Checkout Form */}
				<section className='mx-4 py-10'>
					<Card className='bg-white text-purple-950 border shadow-sm mx-auto'>
						<CardContent className='p-6 space-y-4'>
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
														disabled={field?.value === 1}
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
														disabled={field?.value === 4}
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
										name='extraNote'
										render={({ field }) => (
											<FormItem>
												<FormLabel>অতিরিক্ত নোট (অপশনাল)</FormLabel>
												<FormControl>
													<Textarea
														placeholder='অতিরিক্ত কিছু জানাতে চাইলে লিখুন'
														{...field}
														className='py-6'
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
									>
										অর্ডার কনফার্ম করুন
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
	extraNote?: string; // 👈 এখানে optional
};

type ProductDataType = {
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
