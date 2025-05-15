import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { GalleryImage } from "@shared/schema";
import MasonryGrid from "@/components/ui/masonry-grid";

const GallerySection = () => {
  const { data: galleryImages, isLoading, error } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery/featured'],
  });

  return (
    <section id="gallery" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Style Gallery</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Visual inspiration from the world of fashion, curated by Blaire.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="aspect-[3/4] bg-gray-200 animate-pulse"
                style={{ height: i % 2 === 0 ? '300px' : '400px' }}
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-gray-500">
            <p>Failed to load gallery images. Please try again later.</p>
          </div>
        ) : (
          <MasonryGrid>
            {galleryImages?.map((image) => (
              <div key={image.id} className="relative overflow-hidden group">
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
        
        <div className="text-center mt-12">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 uppercase tracking-wide font-medium transition duration-300"
          >
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
