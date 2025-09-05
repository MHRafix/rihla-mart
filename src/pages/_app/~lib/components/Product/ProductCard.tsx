import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/gql/graphql';
import { cartAtom } from '@/store/cart.atom';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ShoppingBasketIcon, ShoppingCart, Star } from 'lucide-react';

const colors = {
	card: '#1A1030',
	accent: '#FFD600',
	text: '#F5F3FF',
	sub: '#C8B8FF',
};

export const ProductCard = ({ p: product }: { p: Product }) => {
	const navigate = useNavigate();
	const [, setCartList] = useAtom(cartAtom);

	const handleAddToCart = (product: Product) => {
		// Get existing cart from localStorage (or empty array)
		const storedCart = localStorage.getItem('cartItems');
		let cart: any[] = storedCart ? JSON.parse(storedCart) : [];

		// Check if the product already exists in the cart
		const existingIndex = cart.findIndex((item) => item._id === product._id);

		if (existingIndex >= 0) {
			// Already exists → update quantity
			cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
		} else {
			// Not exist → add new product with quantity = 1
			cart.push({ ...product, quantity: 1 });
		}

		// Save updated cart back to localStorage
		localStorage.setItem('cartItems', JSON.stringify(cart));

		setCartList({ productsInCart: cart, isPending: false });
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4 }}
		>
			<Card
				className='overflow-hidden cursor-pointer py-0 rounded-md dark:bg-[#1A1030] bg-white dark:hover:bg-slate-800 hover:bg-gray-100 hover:duration-300'
				// style={{ background: colors.card }}
			>
				<div
					className='relative group'
					onClick={() =>
						navigate({
							to: '/shop/$productId',
							params: { productId: product?._id! },
						})
					}
				>
					<img
						src={product?.thumbnail?.externalUrl!}
						alt={product?.title}
						className='h-64 w-full object-cover'
					/>
					<div className='absolute top-3 left-3 flex gap-2'>
						<Badge>{product?.brand?.name || 'N/A'}</Badge>
					</div>
					{/* <button
					className='absolute top-3 right-3 p-2 rounded-full opacity-100 transition'
					style={{ background: 'rgba(0,0,0,0.4)' }}
				>
					<Heart className='h-4 w-4' style={{ color: colors.accent }} />
				</button> */}
				</div>
				<CardContent className='px-4'>
					<div className='flex items-start justify-between gap-2'>
						<div>
							<h3 className='font-semibold text-lg dark:text-white text-purple-800'>
								{product?.title}
							</h3>
							<p className='text-sm dark:text-white text-purple-800'>
								{product?.model}
							</p>
						</div>
						<div className='text-right'>
							<div className='font-bold text-xl dark:text-[#FFD600] text-purple-800'>
								{product?.salePrice}{' '}
								<span className='font-extrabold text-md'>৳</span>
							</div>
							<div className='flex items-center dark:text-white text-purple-800 justify-end gap-1 text-sm'>
								<Star className='h-4 w-4' style={{ color: colors.accent }} />{' '}
								{5}
							</div>
						</div>
					</div>
					<div className='w-full my-4 flex gap-2 opacity-100 transition'>
						<button
							onClick={() => handleAddToCart(product)}
							className='flex items-center py-2.5 justify-center w-full sm:w-1/2 font-medium text-md rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black'
						>
							<ShoppingCart className='!h-5 !w-5 mr-2' /> Add to Cart
						</button>
						<button
							className='flex items-center py-2.5 justify-center w-full sm:w-1/2 font-medium text-md rounded-md bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800'
							style={{ color: 'white' }}
							onClick={() =>
								navigate({
									to: '/shop/$productId',
									params: { productId: product?._id! },
								})
							}
						>
							<ShoppingBasketIcon className='!h-5 !w-5 mr-2' /> Buy Now
						</button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};
