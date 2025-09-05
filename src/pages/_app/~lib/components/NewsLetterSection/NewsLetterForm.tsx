import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsLetterForm = () => {
	return (
		<section className='pb-20'>
			<div className='rounded-md p-4 md:p-10 grid md:grid-cols-2 gap-8 items-center dark:bg-[#1A1030] bg-white border '>
				<div>
					<h3 className='text-2xl md:text-3xl font-bold mb-2  text-purple-950 dark:text-white'>
						Stay in the loop
					</h3>
					<p className='text-sm mb-4 text-purple-950 dark:text-white'>
						Get early access to drops and exclusive offers.
					</p>
				</div>
				<div className='grid md:flex md:justify-end gap-2'>
					<Input
						placeholder='Enter your email'
						className=' text-black dark:text-white py-6 rounded-md border-[1px] border-gray-300 dark:border-gray-700 focus:outline-0'
						style={{ background: 'transparent' }}
					/>
					<Button className='rounded-md text-black py-6 cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500'>
						Stay Connected
					</Button>
				</div>
			</div>
		</section>
	);
};

export default NewsLetterForm;
