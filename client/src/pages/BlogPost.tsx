import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Post } from "@shared/schema";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();

  // Fetch blog post
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: [`/api/posts/${id}`],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="flex items-center mb-8">
            <Skeleton className="w-12 h-12 rounded-full mr-4" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="w-full h-[400px] mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <h2 className="font-playfair text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the article you're looking for.</p>
            <Button onClick={() => navigate("/blog")} variant="outline">
              Back to Blog
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Blaire Delanné Journal</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Blaire Delanné Journal`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://blairedeanne.com/journal/${post.id}`} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="article:published_time" content={new Date(post.publishedAt).toISOString()} />
        <meta property="article:section" content={post.category} />
      </Helmet>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="article-content">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                  alt="Blaire" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block text-charcoal font-medium">Blaire</span>
                <span className="text-sm text-charcoal/60">
                  {formatDate(post.publishedAt)} • {post.readTime} min read
                </span>
              </div>
              <div className="ml-auto flex space-x-3">
                <a 
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-accent"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-accent"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(post.coverImage)}&description=${encodeURIComponent(post.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-accent"
                  aria-label="Share on Linkedin"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-accent"
                  aria-label="Share on Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto mb-8"
            />
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="flex justify-between items-center border-t border-b border-gray-200 py-6 my-8">
              {post.prevPostId ? (
                <Link href={`/blog/${post.prevPostId}`} className="flex items-center gap-2 font-medium hover:text-accent">
                  <ArrowLeft size={16} /> Previous Article
                </Link>
              ) : (
                <div></div>
              )}
              {post.nextPostId ? (
                <Link href={`/blog/${post.nextPostId}`} className="flex items-center gap-2 font-medium hover:text-accent">
                  Next Article <ArrowRight size={16} />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
