'use client';
import Link from 'next/link';

const Product = ({ product }: any) => {
  return (
    <>
      <Link
        href={`/product/${product.id}`}
        className="max-w-fit p-1.5 border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-100 rounded mx-auto"
      >
        {product?.url ? (
          <img className="rounded cursor-pointer" src={product.url + '/190'} />
        ) : null}
        <div className="pt-2 px-1">
          <div className="font-semibold text-sm hover:underline cursor-pointer">
            {product?.title}
          </div>
          <div className="font-extrabold">
            ${(product?.price / 100).toFixed(2)}
          </div>
          <div className="relative flex items-center text-xs text-gray-500">
            <div className="line-through">
              ${((product?.price * 1.2) / 100).toFixed(2)}
            </div>
            <div className="px-2">-</div>
            <div className="">20% OFF</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
