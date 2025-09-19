import { FC } from 'react';
// @ts-ignore
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductDataType } from '../..';

const PriceAndReview: FC<{ productData: ProductDataType }> = ({
	productData,
}) => {
	return (
		<div className='space-y-8'>
			<section className='text-center font-bold space-y-6 rounded-xl mx-4'>
				<div className='bg-purple-950 text-white rounded-xl p-6 space-y-4 shadow-lg'>
					<h3 className='text-2xl'>
						খিমার প্রাইস
						<span className='ml-2 text-3xl font-extrabold text-amber-400'>
							{productData?.unitPrice}
						</span>{' '}
						টাকা
					</h3>
				</div>

				<div className='bg-teal-800 text-white rounded-xl p-5 shadow-md'>
					<h2 className='text-2xl'>ডেলিভারি চার্জ ফ্রি 😍</h2>
				</div>
			</section>
			<section className='mx-4 px-4 py-8 bg-purple-950  rounded-2xl'>
				<h3 className='text-2xl font-bold mb-6 text-center text-white'>
					✨ কাস্টমার রিভিউ ✨
				</h3>

				<Swiper
					autoplay={{
						delay: 2000, // 2.5s per slide
						disableOnInteraction: false, // keep autoplay after interaction
					}}
					modules={[Autoplay]}
					className='mySwiper'
				>
					{productData?.reviewImages?.map((img, idx) => (
						<SwiperSlide key={idx}>
							<div className='relative w-full overflow-hidden rounded-2xl border'>
								<img
									src={img}
									alt={`Review ${idx + 1}`}
									className='w-full h-[700px] object-cover transform transition-transform duration-500 group-hover:scale-110'
								/>
								{/* Overlay gradient */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl' />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</section>
		</div>
	);
};

export default PriceAndReview;
