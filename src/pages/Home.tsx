import Hero from "@/components/Hero";
import SizeFinder from "@/components/SizeFinder";
import ShopByCategory from "@/components/ShopByCategory";
import Collection from "@/components/Collection";
import Instagram from "@/components/Instagram";
import { SITE_DESCRIPTION, SITE_TITLE, usePageMeta } from "@/lib/usePageMeta";

export default function Home() {
  usePageMeta(SITE_TITLE, SITE_DESCRIPTION);
  return (
    <>
      <Hero />
      <SizeFinder />
      <ShopByCategory />
      <Collection />
      <Instagram />
    </>
  );
}
