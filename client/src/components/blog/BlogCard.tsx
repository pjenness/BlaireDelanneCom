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
        <div className="flex justify-between items-center mb-2">
          <span className="text-accent font-medium uppercase tracking-wider text-xs">
            {post.category}
          </span>
          {post.location && (
            <span className="text-charcoal/60 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {post.location}
            </span>
          )}
        </div>
        <h3 className="font-playfair text-xl font-semibold mb-3">{post.title}</h3>
        <p className="text-charcoal/80 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-charcoal/60">{formatDate(post.publishedAt)}</span>
          <Link href={`/journal/${post.id}`} className="text-accent hover:underline font-medium">
            Continue Reading
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
