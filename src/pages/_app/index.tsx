import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { Facebook, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [form, setForm] = useState({
		name: '',
		phone: '',
		address: '',
		quantity: 1,
		code: '',
	});

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

	// const productImages = [
	// 	'https://images.unsplash.com/photo-1606813902768-9b82e0e0a5c7',
	// 	'https://images.unsplash.com/photo-1581291519195-ef11498d1cf5',
	// 	'https://images.unsplash.com/photo-1519681393784-d120267933ba',
	// 	'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
	// 	'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
	// 	'https://images.unsplash.com/photo-1531177075249-4e6e4f9d7854',
	// 	'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
	// 	'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8',
	// 	'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
	// 	'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
	// ];

	const productImages = Array.from(
		{ length: 20 },
		(_, i) => `https://picsum.photos/400/400?random=${i + 1}`
	);

	return (
		<div className='bg-white text-purple-950 min-h-screen'>
			{/* Header */}
			<header className='flex justify-between items-center px-6 py-4 shadow-md border-b'>
				<h1 className='text-2xl font-bold'>RihlaMart</h1>
				<div className='flex gap-3'>
					<Button
						className='rounded-full bg-purple-950 text-white'
						size='icon'
						onClick={() => window.open('https://facebook.com', '_blank')}
					>
						<Facebook className='h-5 w-5' />
					</Button>
					<Button
						className='rounded-full bg-purple-950 text-white'
						size='icon'
						onClick={() => window.open('https://wa.me/8801700000000', '_blank')}
					>
						<MessageCircle className='h-5 w-5' />
					</Button>
					<Button
						className='rounded-full bg-purple-950 text-white'
						size='icon'
						onClick={() => (window.location.href = 'tel:+8801700000000')}
					>
						<Phone className='h-5 w-5' />
					</Button>
				</div>
			</header>

			<main className='space-y-12'>
				{/* Section 1: Hadith */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					className='text-center px-6 py-10'
				>
					<h2 className='text-xl md:text-4xl font-bold'>
						لا تقبل صلاة الحائض إلا بخمار
					</h2>
					<p className='mt-2 text-lg font-semibold'>
						খিমার পরিধান ছাড়া কোনো প্রাপ্ত বয়স্কা নারীর নামাজ কবূল হবেনা।
						(তিরমিজি ৩৭৭, মিশকাত ৭৬২ ও আবু দাউদ ৬৪১)
					</p>
				</motion.section>

				{/* Section 2: Video */}
				<section className='flex justify-center px-6'>
					<iframe
						className='w-full md:w-2/3 h-64 md:h-96 rounded-xl border'
						src='https://www.youtube.com/embed/dQw4w9WgXcQ'
						title='Product Video'
						allowFullScreen
					/>
				</section>

				{/* Section 3: Price */}
				<section className='text-center py-6 font-bold text-2xl'>
					সালাত খিমার প্রাইস ৮৯৯ টাকা। সারা বাংলাদেশে ডেলিভারি চার্জ একদম ফ্রি।
				</section>

				{/* Section 4: Product Carousel */}
				<section className='px-6'>
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
				<section className='px-6'>
					<Card className='bg-white text-purple-950 border shadow-sm'>
						<CardContent className='px-6 py-3 space-y-3'>
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
				<section className='px-6'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{productImages.map((img, idx) => (
							<img
								key={idx}
								src={img}
								alt='Product'
								className='w-full h-44 object-cover rounded-lg border'
							/>
						))}
					</div>
				</section>

				{/* Section 7: Free Delivery */}
				<section className='text-center py-6 px-4 font-bold text-lg bg-purple-50 rounded-md mx-6'>
					✅ ডেলিভারি চার্জ : সারা বাংলাদেশ সম্পূর্ণ ফ্রি!
					<br />
					অগ্রিম কোন টাকা দিতে হবে না। পার্সেল হাতে বুঝে পেয়ে, চেক করে তারপর
					ডেলিভারি ম্যানের কাছে টাকা পরিশোধ করতে পারবেন।
				</section>

				{/* Section 8: Checkout Form */}
				<section className='px-6 py-10'>
					<Card className='bg-white text-purple-950 border shadow-sm max-w-md mx-auto'>
						<CardContent className='p-6 space-y-4'>
							<h3 className='text-2xl font-bold text-center'>
								অর্ডার করুন এখনই
							</h3>

							<Input
								placeholder='আপনার নাম'
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								className='border w-full py-6'
							/>

							<Input
								placeholder='মোবাইল নাম্বার'
								value={form.phone}
								onChange={(e) => setForm({ ...form, phone: e.target.value })}
								className='border w-full py-6'
							/>

							<Textarea
								placeholder='ঠিকানা'
								value={form.address}
								onChange={(e) => setForm({ ...form, address: e.target.value })}
								className='border w-full py-6'
							/>

							{/* Quantity with grid stepper */}
							<div className='grid grid-cols-3 w-full border rounded-lg overflow-hidden'>
								<Button
									type='button'
									variant='ghost'
									className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-6'
									onClick={() =>
										setForm({
											...form,
											quantity: Math.max(1, (form.quantity || 1) - 1),
										})
									}
								>
									➖
								</Button>
								<div className='flex items-center justify-center bg-white font-semibold'>
									{form.quantity || 1}
								</div>
								<Button
									type='button'
									variant='ghost'
									className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-6'
									onClick={() =>
										setForm({ ...form, quantity: (form.quantity || 1) + 1 })
									}
								>
									➕
								</Button>
							</div>

							<Select
								onValueChange={(value) => setForm({ ...form, code: value })}
							>
								<SelectTrigger className='border w-full py-6'>
									<SelectValue placeholder='প্রোডাক্ট কোড নির্বাচন করুন' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='SK-101'>SK-101</SelectItem>
									<SelectItem value='SK-102'>SK-102</SelectItem>
									<SelectItem value='SK-103'>SK-103</SelectItem>
								</SelectContent>
							</Select>

							<Button className='w-full bg-purple-950 text-white font-bold py-6'>
								অর্ডার কনফার্ম করুন
							</Button>
						</CardContent>
					</Card>
				</section>
			</main>
		</div>
	);
}
