import { useProducts } from '@/hooks/products/useProducts';
import { ProductCard, ProductCardSkeleton } from '@/components/products';

function HomePage() {
  const { data: productsData, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(12)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {productsData?.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
