"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Usa este hook en lugar de 'next/router'
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProducts } from '@/lib/getProducts';
import { ProductsClient } from './productsClient';

const SECRET_KEY = process.env.JWT_SECRET!;

export default function ProductsPage(props: { searchParams: Promise<{ q: string; offset: string }> }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie;
    const parsedCookies = parse(cookies);
    const token = parsedCookies.token;
    console.log(token)

    if (!token) {
      router.push('/login?sinToken');
      return;
    }

    try {
      jwt.verify(token, SECRET_KEY); 
      setIsAuthenticated(true);
    } catch (error) {
      router.push('/login?nosirveToken'); 
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Si está cargando o no está autenticado, no renderizamos el contenido
  if (loading || !isAuthenticated) {
    return <div>Loading...</div>; // O un componente de loading
  }

  // Si está autenticado, cargamos los productos
  const fetchData = async () => {
    const searchParams = await props.searchParams;
    const search = searchParams.q ?? '';
    const offset = parseInt(searchParams.offset ?? '0');
    const { products, newOffset, totalProducts } = await getProducts(search, offset);
    
    return { products, newOffset, totalProducts };
  };

  const [productsData, setProductsData] = useState<any>({ products: [], newOffset: 0, totalProducts: 0 });

  useEffect(() => {
    fetchData().then((data) => setProductsData(data));
  }, [props.searchParams]);

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Todos</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <ProductsClient
          products={productsData.products}
          newOffset={productsData.newOffset}
          totalProducts={productsData.totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}