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
        <title>Blaire Delanné | Hospitality & Wedding Design Specialist</title>
        <meta name="description" content="Blaire Delanné is a hospitality, wedding design, travel, and fashion specialist with experience across New York, Sydney, and New Zealand." />
        <meta property="og:title" content="Blaire Delanné | Hospitality & Wedding Design Specialist" />
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
