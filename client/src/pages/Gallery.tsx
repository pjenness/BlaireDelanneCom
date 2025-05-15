import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { GalleryImage } from "@shared/schema";
import MasonryGrid from "@/components/ui/masonry-grid";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const { data: galleryImages, isLoading, error } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
  });

  return (
    <>
      <Helmet>
        <title>Visual Portfolio | Blaire Delanné</title>
        <meta name="description" content="Explore Blaire Delanné's gallery of hospitality venues, wedding designs, travel destinations, and fashion inspiration from around the world." />
        <meta property="og:title" content="Visual Portfolio | Blaire Delanné" />
        <meta property="og:description" content="Explore Blaire Delanné's gallery of hospitality venues, wedding designs, travel destinations, and fashion inspiration from around the world." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedeanne.com/gallery" />
      </Helmet>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">Visual Portfolio</h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              A curated collection of my work across hospitality venues, wedding designs, 
              memorable travel destinations, and fashion inspirations.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <Skeleton 
                  key={i} 
                  className="w-full aspect-[3/4] rounded-none"
                  style={{ height: i % 2 === 0 ? '300px' : '400px' }}
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-charcoal/70">Failed to load gallery images. Please try again later.</p>
            </div>
          ) : (
            <MasonryGrid columns={[1, 2, 3, 4]} gap={6}>
              {galleryImages?.map((image) => (
                <div key={image.id} className="relative overflow-hidden group mb-6">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title} 
                    className="w-full h-auto transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center p-4">
                      <p className="font-playfair text-lg">{image.title}</p>
                      <span className="text-sm font-light">{image.tags}</span>
                    </div>
                  </div>
                </div>
              ))}
            </MasonryGrid>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
