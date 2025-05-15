import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Post } from "@shared/schema";
import { formatDate } from "@/lib/utils";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const { data: featuredPost, isLoading: featuredLoading } = useQuery<Post>({
    queryKey: ['/api/posts/featured/main'],
  });

  const { data: recentPosts, isLoading: recentLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts/recent'],
  });

  const isLoading = featuredLoading || recentLoading;

  return (
    <section id="blog" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">The Blog</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Discover the latest fashion insights, trend analyses, and style advice curated by Blaire.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
        </div>
        
        {/* Featured Blog Post */}
        <div className="mb-16">
          {isLoading || !featuredPost ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 animate-pulse">
                <div className="h-4 bg-gray-200 w-32 mb-4 rounded"></div>
                <div className="h-8 bg-gray-200 w-full mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-3/4 mb-6 rounded"></div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 w-20 mb-1 rounded"></div>
                    <div className="h-3 bg-gray-200 w-32 rounded"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 w-32 rounded"></div>
              </div>
              <div className="order-1 lg:order-2 h-80 bg-gray-200 animate-pulse"></div>
            </div>
          ) : (
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-accent font-medium uppercase tracking-wider text-sm mb-2 block">
                  Editor's Pick
                </span>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-charcoal/80 mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                      alt="Blaire" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-charcoal font-medium">Blaire</span>
                    <span className="text-sm text-charcoal/60">
                      {formatDate(featuredPost.publishedAt)} • {featuredPost.readTime} min read
                    </span>
                  </div>
                </div>
                
                <Link 
                  href={`/blog/${featuredPost.id}`} 
                  className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 transition duration-300"
                >
                  Read Full Article
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </article>
          )}
        </div>
        
        {/* Regular Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading || !recentPosts ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow-sm animate-pulse">
                <div className="h-60 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-3 bg-gray-200 w-24 mb-2 rounded"></div>
                  <div className="h-6 bg-gray-200 w-full mb-3 rounded"></div>
                  <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                  <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                  <div className="h-4 bg-gray-200 w-3/4 mb-4 rounded"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 w-20 rounded"></div>
                    <div className="h-3 bg-gray-200 w-24 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            recentPosts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 uppercase tracking-wide font-medium transition duration-300"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
