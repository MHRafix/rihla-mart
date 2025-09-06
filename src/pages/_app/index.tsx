import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect } from 'react';
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

export const Route = createFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
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

	// ✅ submit handler
	const onSubmit = (data: FormValues) => {
		console.log('Order Submitted:', data);
	};
	const productImages = Array.from(
		{ length: 40 },
		(_, i) => `https://picsum.photos/400/400?random=${i + 1}`
	);

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
						onClick={() => window.open('https://wa.me/0 1602-819394', '_blank')}
						src='https://cdn-icons-png.flaticon.com/128/3670/3670051.png'
						className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					/>
					<img
						onClick={() => (window.location.href = 'tel:+8801700000000')}
						src='https://cdn-icons-png.flaticon.com/128/724/724664.png'
						className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					/>
				</div>
			</header>

			<main className='space-y-12'>
				<div className='text-center px-4 py-5 bg-purple-950 text-white rounded-2xl mt-5 mx-4'>
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
				<section className='flex justify-center px-4'>
					<iframe
						className='w-full h-[350px] rounded-xl border'
						src='https://www.youtube.com/embed/dQw4w9WgXcQ'
						title='Product Video'
						allowFullScreen
					/>
				</section>

				{/* Section 3: Price */}
				<section className='text-center py-8 font-bold bg-purple-950 text-white space-y-5  rounded-2xl mt-5 mx-4'>
					<h3 className='text-3xl mb-8'>খিমারের দাম মাত্র</h3>

					<h1 className='text-5xl text-amber-500 underline-offset-[10px] underline'>
						৯০০ টাকা
					</h1>
					<br />
					<h2 className='text-3xl text-teal-500'>
						😀 ডেলিভারি চার্জ একদম ফ্রি 😀
					</h2>
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
								<li>১০০% পিওর সুতি কাপড় (ভেক্সি ফেব্রিক্স)</li>
								<li>আমাদের নিজস্ব সুদক্ষ কারিগর দ্বারা তৈরি।</li>
								<li>দুই হাতের কব্জিতে উন্নতমানের লেইসওয়ার্ক</li>
								<li>লম্বা ৬৮ থেকে ৭২ ইঞ্চি</li>
								<li>চওড়া/ঘের ৮৫ থেকে ৯০ ইঞ্চি</li>
								<li>থুতনি ও হাতায় সফট ইলাস্টিক রাবার</li>
								<li>ফেব্রিকস কোয়ালিটি এবং কালার, কশ গ্যারান্টি</li>
								<li>সম্পূর্ণ শরীয়াহ সম্মত পোষাক</li>
							</ul>
						</CardContent>
					</Card>
				</section>

				{/* Section 6: Image Grid */}
				<section className='px-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{productImages.map((img, idx) => (
							<img
								key={idx}
								src={img}
								alt='Product'
								className='w-full h-[250px] object-cover rounded-lg border'
							/>
						))}
					</div>
				</section>

				{/* Section 7: Free Delivery */}
				<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-6'>
					<h1 className='text-3xl text-amber-500 leading-12'>
						✅ ডেলিভারি চার্জ <br /> 😀 একদম ফ্রি 😀
					</h1>

					<h2 className='mt-3 text-xl font-medium leading-8'>
						অগ্রিম কোন টাকা দিতে হবে না। পার্সেল হাতে বুঝে পেয়ে, চেক করে তারপর
						ডেলিভারি ম্যানের কাছে টাকা পরিশোধ করতে পারবেন।
					</h2>
				</section>

				<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-6'>
					<p className='text-lg text-amber-500 leading-12'>
						✅ ২ টি কিনলেই পাচ্ছেন ১০০ টাকা ছাড়
					</p>
					<p className='text-lg text-amber-500 leading-12'>
						✅ ৩ টি কিনলেই পাচ্ছেন ১৫০ টাকা ছাড়
					</p>
					<p className='text-lg text-amber-500 leading-12'>
						✅ ৪ টি কিনলেই পাচ্ছেন ২০০ টাকা ছাড়
					</p>

					<h2 className='mt-3 text-lg font-medium bg-amber-800 p-2 rounded-xl'>
						✅ পাইকারি নিতে কল করুন ০১৬০২-৮১৯৩৯৪
					</h2>
				</section>
				{/* Section 8: Checkout Form */}
				<section className='px-4 py-10'>
					<Card className='bg-white text-purple-950 border shadow-sm max-w-md mx-auto'>
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
												<div className='grid grid-cols-3 w-full border rounded-lg overflow-hidden'>
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
										<hr className='border-purple-300 my-2' />
										<div className='flex justify-between text-xl font-bold'>
											<span>মোট টাকা:</span>
											<span className='font-extrabold '>
												৳ {900 * form.watch('quantity')}
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
