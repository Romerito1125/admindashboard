// (dashboard)/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProducts } from '@/lib/getProducts';
import { ProductsClient } from './productsClient';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = parseInt(searchParams.offset ?? '0');

  const { products, newOffset, totalProducts } = await getProducts(search, offset);

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Todos</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <ProductsClient
          products={products}
          newOffset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
