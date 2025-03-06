import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OfferClient } from './offerClient';
import { AuthRedirect } from '../authredirect';
import { getOffers } from '@/lib/getOffers';

export default async function ProductsPage() {
  const { offers } = await getOffers();

  return (
    <>
      <AuthRedirect />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OfferClient offers={offers} />
        </TabsContent>
      </Tabs>
    </>
  );
}
