import { setRequestLocale } from "next-intl/server";
import { HeroVideo } from "@/components/home/HeroVideo";
import { ScrollStory } from "@/components/home/ScrollStory";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroVideo />
      <ScrollStory />
    </>
  );
}
