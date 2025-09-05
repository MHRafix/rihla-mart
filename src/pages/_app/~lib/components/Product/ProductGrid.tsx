import { Product } from '@/gql/graphql';
import { productAtom } from '@/store/products.atom';
import { useAtom } from 'jotai';
import { ProductCard } from './ProductCard';

const ProductGrid = () => {
	// all products
	const [products] = useAtom(productAtom);

	return (
		<section className='py-10'>
			<div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
				{products?.products?.map((p: Product) => (
					<ProductCard key={p._id} p={p} />
				))}
			</div>
		</section>
	);
};

export default ProductGrid;
