import { colors } from '@/theme/color';

const Categories = () => {
	return (
		<section>
			<div
				className='grid md:flex items-center justify-between gap-3 py-4'
				style={{ borderColor: colors.card }}
			>
				<div>
					<h2 className='text-3xl font-bold text-purple-950 dark:text-white'>
						All Products
					</h2>
				</div>
				<div className='flex flex-wrap items-center gap-2'>
					{[
						'All',
						'Running',
						'Lifestyle',
						'Basketball',
						'Hiking',
						'Slides',
					].map((c) => (
						<button
							key={c}
							className='px-3 py-2 rounded-md text-sm cursor-pointer 
        bg-white text-purple-950 dark:bg-purple-950 dark:text-white
        hover:bg-purple-950 hover:text-white dark:hover:bg-purple-900 
        transition-colors duration-300 flex-1 sm:flex-none border'
						>
							{c}
						</button>
					))}

					<select
						className='w-full sm:w-[200px] px-3 py-2 rounded-md text-sm border border-gray-300 
      bg-transparent text-purple-950 dark:bg-[#1A1030] dark:text-white 
      dark:border-gray-700'
					>
						<option>Filter products</option>
						<option>Price: Low to High</option>
						<option>Price: High to Low</option>
						<option>Top Rated</option>
						<option>Newest</option>
					</select>
				</div>
			</div>
		</section>
	);
};

export default Categories;
