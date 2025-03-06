import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OfferClient } from './offerClient';
import { AuthRedirect } from '../authredirect';
import { getOffers } from '@/lib/getOffers';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParamsData = await searchParams;
  const search = searchParamsData.q ?? '';
  const offset = parseInt(searchParamsData.offset ?? '0');

  const { offers, totalOffers } = await getOffers(search, offset);

  return (
    <>
      <AuthRedirect />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OfferClient
            offers={offers}  
            totalOffers={totalOffers} 
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
