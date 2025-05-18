import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import Newsletter from "@/components/home/Newsletter";
import BlogSection from "@/components/blog/BlogSection";
import GallerySection from "@/components/gallery/GallerySection";
import AboutSection from "@/components/about/AboutSection";
import ContactSection from "@/components/contact/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Blaire Delanné | Hospitality, Wine and Wedding Design. Travel, Cheese and Fashion With Ease.</title>
        <meta name="description" content="Blaire Delanné specializes in hospitality, wine and wedding design while sharing insights on travel, cheese, and fashion from New York, Sydney, and New Zealand." />
        <meta property="og:title" content="Blaire Delanné | Hospitality, Wine and Wedding Design. Travel, Cheese and Fashion With Ease." />
        <meta property="og:description" content="Discover hospitality expertise, wedding design, travel insights, and fashion advice from Blaire Delanné's journey across three countries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedeanne.com" />
        <meta property="og:image" content="/images/hero/homepage-hero.jpg" />
      </Helmet>

      <HeroSection />
      <FeaturedPosts />
      <Newsletter />
      <BlogSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
