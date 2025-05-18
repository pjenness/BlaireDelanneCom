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
                  src="/images/about/blaire-profile-square.jpg" 
                  alt="Blaire Delanné" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block text-charcoal font-medium">Blaire Delanné</span>
                <span className="text-sm text-charcoal/60">
                  {formatDate(post.publishedAt)} • {post.readTime} min read
                </span>
              </div>
              <div className="ml-auto flex space-x-3">
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
                  aria-label="Share on Pinterest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/blairedelanne/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-accent"
                  aria-label="Blaire's Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.tiktok.com/@blairedelanne" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-accent"
                  aria-label="Blaire's TikTok"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                  </svg>
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
