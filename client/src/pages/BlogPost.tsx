import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Post, Comment, InsertComment } from "@shared/schema";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");

  // Fetch blog post
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: [`/api/posts/${id}`],
  });

  // Fetch comments
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: [`/api/posts/${id}/comments`],
    enabled: !!id,
  });

  // Add comment mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (comment: InsertComment) => {
      await apiRequest("POST", `/api/posts/${id}/comments`, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${id}/comments`] });
      setCommentText("");
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    mutate({
      postId: Number(id),
      name: "Guest User", // In a real app, this would come from auth
      content: commentText,
    });
  };

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
        <title>{post.title} | BlaireFashionHub</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | BlaireFashionHub`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://blairefashionhub.com/blog/${post.id}`} />
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
            
            <Card className="bg-neutral p-6 rounded">
              <CardContent className="p-0">
                <h4 className="font-playfair text-xl font-semibold mb-4">Join the Conversation</h4>
                <form onSubmit={handleSubmitComment}>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-4 border border-gray-300 focus:border-accent focus:outline-none mb-4"
                    rows={4}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-accent hover:bg-accent/90 text-white px-6 py-2 transition duration-300"
                    disabled={isPending}
                  >
                    {isPending ? "Posting..." : "Post Comment"}
                  </Button>
                </form>
                
                <div className="mt-8">
                  <h5 className="font-medium mb-4">Comments ({comments.length})</h5>
                  
                  {comments.length === 0 ? (
                    <p className="text-charcoal/70 italic">Be the first to comment on this article!</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-start mb-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center text-gray-500">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="block text-charcoal font-medium">{comment.name}</span>
                            <span className="text-sm text-charcoal/60">{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>
                        <p className="text-charcoal/80">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
