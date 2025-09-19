import { Card, CardContent } from '@/components/ui/card';
import { FC } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ProductDataType } from '../..';

const ProductDetails: FC<{
	productData: ProductDataType;
}> = ({ productData }) => {
	const products = [
		'/products/101.jpg',
		'/products/101l.jpg',
		'/products/102.jpg',
		'/products/102l.jpg',
		'/products/103.jpg',
		'/products/103l.jpg',
		'/products/104.jpg',
		'/products/104l.jpg',
		'/products/105.jpg',
		'/products/105l.jpg',
		'/products/106.jpg',
		'/products/106l.jpg',
		'/products/107.jpg',
		'/products/107l.jpg',
		'/products/108.jpg',
		'/products/108l.jpg',
		'/products/109.jpg',
		'/products/109l.jpg',
		'/products/110.jpg',
		'/products/110l.jpg',
		'/products/111.jpg',
		'/products/111l.jpg',
		'/products/112.jpg',
		'/products/112l.jpg',
		'/products/113.jpg',
		'/products/113l.jpg',
		'/products/114.jpg',
		'/products/114l.jpg',
		'/products/115.jpg',
		'/products/115l.jpg',
		'/products/116.jpg',
		'/products/116l.jpg',
		'/products/117.jpg',
		'/products/117l.jpg',
		'/products/118.jpg',
		'/products/118l.jpg',
		'/products/119.jpg',
	];

	return (
		<div className='space-y-8'>
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
			</section>{' '}
			<section className='px-4'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					{products?.map((img, idx) => (
						<Zoom key={idx}>
							<img
								src={img!}
								alt='Product'
								className='w-full h-[250px] object-cover rounded-xl border'
							/>
						</Zoom>
					))}
				</div>
			</section>{' '}
			<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
				<h1 className='text-3xl text-amber-500 leading-12'>
					😍 ডেলিভারি চার্জ <br /> ফ্রি 😍
				</h1>

				<h2 className='mt-3 text-xl font-medium leading-8'>
					অগ্রিম কোন টাকা দিতে হবে না। পার্সেল হাতে বুঝে পেয়ে, চেক করে তারপর
					ডেলিভারি ম্যানের কাছে টাকা পরিশোধ করতে পারবেন।
				</h2>
			</section>
		</div>
	);
};

export default ProductDetails;
