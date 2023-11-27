"use client";

import { useEffect, useState } from "react";
import CarouselComp from "./components/CarouselComp";
import Product from "./components/Product";
import UseIsLoading from "./hooks/useIsLoading";
import MainLayout from "./layouts/MainLayout";

// Define the Product type
type ProductType = {
  id: number;
  title: string;
  description: string;
  url: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]); // Specify the type here

  const getProducts = async () => {
    UseIsLoading(true);

    const response = await fetch("/api/products");
    const prods = await response.json();

    setProducts([]);
    setProducts(prods);
    UseIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <MainLayout>
      <CarouselComp />
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-3xl font-bold mt-8 mb-6">Products</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
