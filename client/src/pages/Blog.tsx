import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Post } from "@shared/schema";
import BlogCard from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Blog = () => {
  const [pathLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  
  // Get URL parameters
  const params = new URLSearchParams(pathLocation.split("?")[1]);
  const categoryParam = params.get("category");
  const locationParam = params.get("location");
  
  // Set initial states from URL if present
  React.useEffect(() => {
    if (categoryParam) setCategory(categoryParam);
    if (locationParam) setLocation(locationParam);
  }, [categoryParam, locationParam]);
  
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts', categoryParam || "all", locationParam || "all"],
  });

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === "" || post.category === category;
    const matchesLocation = location === "" || post.location === location;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled reactively above
  };

  return (
    <>
      <Helmet>
        <title>Journal | Blaire Delanne</title>
        <meta name="description" content="Follow Blaire's journey from New York to Sydney to New Zealand and her experiences in hospitality, wedding design, travel, and fashion." />
        <meta property="og:title" content="Journal | Blaire Delanne" />
        <meta property="og:description" content="Follow Blaire's journey from New York to Sydney to New Zealand and her experiences in hospitality, wedding design, travel, and fashion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedelanne.com/journal" />
      </Helmet>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">My Journal</h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Following my journey from New York to Sydney to New Zealand, and my adventures in hospitality, weddings, travel, and fashion.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-accent focus:ring-accent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="Wedding">Wedding</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-white">
                <Filter className="mr-2" size={16} /> Filter
              </Button>
            </form>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
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
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-charcoal/70">Failed to load blog posts. Please try again later.</p>
              </div>
            ) : filteredPosts?.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-charcoal/70">No blog posts found matching your criteria.</p>
              </div>
            ) : (
              filteredPosts?.map((post) => <BlogCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
