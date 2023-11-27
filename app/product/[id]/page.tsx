'use client';

import { useEffect, useState } from 'react';
import SimilarProducts from '@/app/components/SimilarProducts';
import { useCart } from '@/app/context/cart';
import UseIsLoading from '@/app/hooks/useIsLoading';
import MainLayout from '@/app/layouts/MainLayout';
import { toast } from 'react-toastify';

type Product = {
  id: number;
  title: string;
  description: string;
  url: string;
  price: number;
};

type PageProps = {
  params: Product; // Replace with the actual type of 'params'
};

const Product = ({ params }: PageProps) => {
  const cart = useCart();

  const [product, setProduct] = useState<Product>({
    // Define the type here
    id: 0,
    title: '',
    description: '',
    url: '',
    price: 0,
  });

  // const [product, setProduct] = useState({});

  const getProduct = async () => {
    UseIsLoading(true);
    setProduct({
      id: 0,
      title: '',
      description: '',
      url: '',
      price: 0,
    });

    const response = await fetch(`/api/product/${params.id}`);
    const prod = await response.json();
    setProduct(prod);
    cart.isItemAddedToCart(prod);
    UseIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex px-4 py-10">
            {product?.url ? (
              <img
                className="w-2/5 rounded-lg"
                src={`${product?.url}/200`}
                alt="image"
              />
            ) : (
              <div className="w-2/5"></div>
            )}
            <div className="px-4 w-full">
              <div className="font-bold text-xl">{product?.title}</div>
              <div className="text-sm text-gray-700 pt-2">
                Brand New - Full Warranty
              </div>
              <div className="border-b py-1"></div>
              <div className="pt-3 pb-2">
                <div className="flex items-center">
                  Condition:{' '}
                  <span className="font-bold text-base ml-2">New</span>
                </div>
              </div>
              <div className="border-b py-1"></div>
              <div className="pt-3">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center">
                    Price:
                    {product?.price ? (
                      <div className="font-bold text-xl ml-2">
                        US ${(product?.price / 100).toFixed(2)}
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => {
                      if (cart.isItemAdded) {
                        cart.removeFromCart(product);
                        toast.info('Removed from cart', { autoClose: 3000 });
                      } else {
                        cart.addToCart(product);
                        toast.success('Added to cart', { autoClose: 3000 });
                      }
                    }}
                    className={`
                  text-white bg-[#3498c9] py-2 px-20 rounded-full cursor-pointer
                  ${
                    cart.isItemAdded
                      ? 'bg-[#e9a321] hover:bg-[#bf851a]'
                      : 'bg-[#3498C9] hover:bg-[#0054A0]'
                  }
                  `}
                  >
                    {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'}
                  </button>
                </div>
              </div>
              <div className="border-b py-1"></div>
              <div className="pt-3">
                <div className="font-semibold pb-1">Description</div>
                <div className="text-sm">{product?.description}</div>
              </div>
            </div>
          </div>
        </div>
        <SimilarProducts />
      </MainLayout>
    </>
  );
};

export default Product;
