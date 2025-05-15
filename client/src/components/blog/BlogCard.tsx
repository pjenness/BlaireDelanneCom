import { Link } from "wouter";
import { formatDate } from "@/lib/utils";
import { Post } from "@shared/schema";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="bg-white shadow-sm hover-up">
      <div className="h-60 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <span className="text-accent font-medium uppercase tracking-wider text-xs mb-2 block">
          {post.category}
        </span>
        <h3 className="font-playfair text-xl font-semibold mb-3">{post.title}</h3>
        <p className="text-charcoal/80 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-charcoal/60">{formatDate(post.publishedAt)}</span>
          <Link href={`/blog/${post.id}`} className="text-accent hover:underline font-medium">
            Continue Reading
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
