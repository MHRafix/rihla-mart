import { Card, CardContent } from '@/components/ui/card';
import { colors } from '@/theme/color';
import { Star } from 'lucide-react';

const Testimonials = () => {
	return (
		<section className='pb-16'>
			<h3 className='text-3xl font-bold mb-6 text-purple-950 dark:text-white'>
				What customers say
			</h3>
			<br />
			<br />
			<div className='grid md:grid-cols-3  gap-y-16 md:gap-6'>
				{[1, 2, 3].map((i) => (
					<Card
						key={i}
						className='relative rounded-md dark:bg-[#1A1030] bg-white border'
					>
						{/* Customer Avatar */}
						<div className='absolute -top-[60px] left-18 -translate-x-1/2'>
							<img
								src='https://cdn-icons-png.flaticon.com/128/2202/2202112.png'
								alt='Customer'
								className='w-[100px] h-[100px] rounded-full border-2 border-white dark:border-[#1A1030] shadow-md'
							/>
						</div>

						<CardContent className='p-6 pt-9'>
							<div className='flex items-center gap-2 mb-3'>
								{Array.from({ length: 5 }).map((_, idx) => (
									<Star
										key={idx}
										className='h-4 w-4'
										style={{ color: colors.accent }}
									/>
								))}
							</div>
							<p className='text-sm mb-4 dark:text-white text-purple-950 font-medium'>
								“Super comfy and super light. I wore them all day and my feet
								still felt fresh. The yellow accents are 🔥.”
							</p>
							<div className='text-xs font-medium dark:text-[#C8B8FF] text-purple-950'>
								— A happy customer
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Testimonials;
