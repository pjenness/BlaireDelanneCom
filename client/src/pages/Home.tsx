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
        <title>BlaireFashionHub - Your Style Curator</title>
        <meta name="description" content="BlaireFashionHub is your trusted curator for the latest in fashion trends, styling tips, and industry insights." />
        <meta property="og:title" content="BlaireFashionHub - Your Style Curator" />
        <meta property="og:description" content="Discover the latest fashion insights, trend analyses, and style advice curated by Blaire." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairefashionhub.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" />
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
