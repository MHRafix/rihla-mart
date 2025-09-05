import { Badge } from '@/components/ui/badge';
import { colors } from '@/theme/color';
import { motion } from 'framer-motion';
import {
	RotateCcw,
	ShieldCheck,
	ShoppingBasketIcon,
	ShoppingCart,
	Truck,
} from 'lucide-react';
import { Feature } from '../Features/FeatureCard';

const HeroSlider = () => {
	return (
		<section className='relative'>
			<div className='py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='inline-flex items-center gap-2 mb-4'>
						<span
							className='h-1 w-8 rounded-full'
							style={{ background: colors.accent }}
						/>
						<span
							className='text-xs uppercase  tracking-widest font-semibold'
							style={{ color: colors.accent }}
						>
							New Season
						</span>
					</div>
					<h1
						className='text-4xl md:text-6xl dark:text-[#F5F3FF] text-purple-950 font-extrabold leading-tight mb-4'
						// style={{ color: colors.text }}
					>
						Step Into <span style={{ color: colors.accent }}>Comfort</span> &
						Style
					</h1>
					<p className='text-base md:text-lg dark:text-[#C8B8FF] text-purple-950 mb-8'>
						Explore premium footwear engineered for everyday performance.
						Breathable materials, feather-light midsoles, and bold looks.
					</p>
					<div className='flex gap-3'>
						<button className='flex items-center py-2.5 px-5 sm:px-8 justify-center font-medium text-md rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black'>
							<ShoppingCart className='!h-6 !w-6 mr-2' /> Add to Cart
						</button>
						<button
							className='flex items-center py-2.5 justify-center px-5 sm:px-8 font-medium text-md rounded-md bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800'
							style={{ color: 'white' }}
						>
							<ShoppingBasketIcon className='!h-6 !w-6 mr-2' /> Buy Now
						</button>
					</div>
					<div className='mt-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-6'>
						<Feature
							icon={Truck}
							title='ফ্রি ডেলিভারি'
							subtitle='১-৩ কার্যদিবস'
						/>
						<Feature
							icon={ShieldCheck}
							title='সহজ এবং নিরাপদ'
							subtitle='সহজ এবং নিরাপদ পেমেন্ট'
						/>
						<Feature
							icon={RotateCcw}
							title='০৭ দিনের গ্যারান্টি'
							subtitle='শর্ত প্রযোজ্য'
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className='relative'>
						<div
							className='absolute -inset-6 rounded-[2rem] blur-2xl'
							style={{
								background: `conic-gradient(from 180deg at 50% 50%, ${colors.accent}33, transparent)`,
							}}
						/>
						<div
							className='relative rounded-[2rem] overflow-hidden ring-1'
							// style={{ ringColor: colors.card }}
						>
							<img
								src='/slider.jpg'
								alt='Hero shoe'
								className='w-full h-[460px] object-cover'
							/>
							<div className='absolute bottom-4 left-4'>
								<Badge>Featured Drop</Badge>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSlider;
