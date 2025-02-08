import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProducts } from '@/lib/getProducts';
import { ProductsClient } from './productsClient';
import { AuthRedirect } from './authredirect';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParamsData = await searchParams;
  const search = searchParamsData.q ?? '';

  const { products } = await getProducts(search);

  return (
    <>
      <AuthRedirect />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ProductsClient products={products} />
        </TabsContent>
      </Tabs>
    </>
  );
}
/* Conflicto */