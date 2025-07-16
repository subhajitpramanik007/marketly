import { ProductCard } from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/products/useProducts';

function HomePage() {
  const { data: productsData } = useProducts();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {productsData?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
