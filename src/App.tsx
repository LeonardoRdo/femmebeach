import { Outlet, RouterProvider, ScrollRestoration, createHashRouter } from "react-router";
import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Confetti from "@/components/Confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ProductPage from "@/pages/ProductPage";
import SizePage from "@/pages/SizePage";
import CollectionPage from "@/pages/CollectionPage";
import CollectionPiecePage from "@/pages/CollectionPiecePage";
import NotFound from "@/pages/NotFound";

function Layout() {
  return (
    <CartProvider>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <CartDrawer />
      <Confetti />
      <WhatsAppFab />
      <ScrollRestoration />
    </CartProvider>
  );
}

// Hash (#/produto/x): o build abre direto do disco (file://), sem servidor reescrevendo rotas
const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categoria/:slug", element: <CategoryPage /> },
      { path: "/produto/:slug", element: <ProductPage /> },
      { path: "/tamanho/:tam", element: <SizePage /> },
      { path: "/colecao/:slug", element: <CollectionPage /> },
      { path: "/colecao/:slug/:peca", element: <CollectionPiecePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
