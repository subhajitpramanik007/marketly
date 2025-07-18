import { ProductCardSkeleton, ProductsContainer } from '@/components/products';
import { useProductsByCategory } from '@/hooks/products/useProductsByCategory';

function CategoryPage({ category }: { category: string }) {
  const { data, isLoading, isError } = useProductsByCategory(category);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return <ProductsContainer products={data?.products} />;
}

export default CategoryPage;
