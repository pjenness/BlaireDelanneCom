import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@shared/schema";
import { formatDate } from "@/lib/utils";

const FeaturedPosts = () => {
  const { data: featuredPosts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts/featured'],
  });

  if (isLoading) {
    return (
      <section id="featured" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Featured Stories</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="hover-up bg-neutral overflow-hidden">
                <div className="h-80 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 mb-4 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/5 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !featuredPosts) {
    return (
      <section id="featured" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Featured Stories</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="text-center text-gray-500">
            <p>Failed to load featured posts. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Featured Stories</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article key={post.id} className="group hover-up bg-neutral overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
                  <span className="text-white/90 font-montserrat text-sm uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-3 group-hover:text-accent transition duration-300">
                  {post.title}
                </h3>
                <p className="text-charcoal/80 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/60">
                    {formatDate(post.publishedAt)}
                  </span>
                  <Link href={`/blog/${post.id}`} className="text-accent hover:underline font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
