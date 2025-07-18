import { useProducts } from '@/hooks/products/useProducts';
import { ProductsContainer, ProductsSkeletonContainer } from '@/components/products';

function HomePage() {
  const { data: productsData, isLoading, isError } = useProducts();

  if (isLoading) {
    return <ProductsSkeletonContainer />;
  }

  return <ProductsContainer products={productsData?.products} />;
}

export default HomePage;
