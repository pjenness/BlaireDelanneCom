// Mapping from remote URLs to local image paths
export const imageMapping: Record<string, string> = {
  // Blog post images
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04": "/images/blog/investment-dressing.jpg",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc": "/images/blog/luxury-wedding-planning.jpg",
  "https://images.unsplash.com/photo-1559563458-527698bf5295": "/images/blog/sustainable-fashion.jpg",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae": "/images/blog/sydney-culinary-treasures.jpg",
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed": "/images/blog/accessories-styling.jpg",
  "https://images.unsplash.com/photo-1602192509154-0b900ee1f851": "/images/blog/wellness-event-design.jpg",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf": "/images/blog/luxury-travel.jpg",
  "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e": "/images/blog/autumn-harvest-festivals-otago.jpg",
  "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9": "/images/blog/moving-to-sydney.jpg",
  "https://images.unsplash.com/photo-1507699622108-4be3abd695ad": "/images/blog/new-zealand-adventure.jpg",
  "https://images.unsplash.com/photo-1533993036450-7c48a147e09c": "/images/blog/byron-bay-weddings.jpg",
  "https://images.unsplash.com/photo-1522157201180-a47e26c4dea4": "/images/blog/sustainable-weddings-nz.jpg",
  
  // Gallery images
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d": "/images/gallery/fashion-editorial-1.jpg",
  "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04": "/images/gallery/fashion-editorial-2.jpg",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b": "/images/gallery/fashion-editorial-3.jpg",
  "https://images.unsplash.com/photo-1445205170230-053b83016050": "/images/gallery/wedding-design-1.jpg",
  "https://images.unsplash.com/photo-1604017011826-d3b4c25007f4": "/images/gallery/wedding-design-2.jpg",
  "https://images.unsplash.com/photo-1464288550599-43d5a73451b8": "/images/gallery/luxury-travel-1.jpg",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa": "/images/gallery/luxury-hotel-1.jpg",
  
  // About/profile images
  "https://images.unsplash.com/photo-1587614382231-d1590f0039e7": "/images/about/blaire-profile-1.jpg",
  "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a": "/images/about/blaire-profile-2.jpg",
  "https://images.unsplash.com/photo-1512479355258-8da9d459e31c": "/images/about/blaire-at-work-1.jpg",
  "https://images.unsplash.com/photo-1557682260-96773eb01377": "/images/about/blaire-at-fashion-event.jpg",
  "https://images.unsplash.com/photo-1615585624427-97626c6b6783": "/images/about/blaire-at-wedding-planning.jpg",
  
  // Hero/banner images
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f": "/images/hero/homepage-hero.jpg",
  "https://images.unsplash.com/photo-1470816692786-c70581fe355c": "/images/hero/about-hero.jpg",
  "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8": "/images/hero/wedding-specialties-hero.jpg",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb": "/images/hero/travel-specialties-hero.jpg",
  "https://images.unsplash.com/photo-1617103996702-96ff29b1c467": "/images/hero/hospitality-specialties-hero.jpg",
  "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b": "/images/hero/blog-hero.jpg",
  "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5": "/images/hero/gallery-hero.jpg",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d": "/images/hero/experience-hero.jpg",
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee": "/images/hero/contact-hero.jpg",
};

// Function to get local image path from remote URL
export function getLocalImagePath(remoteUrl: string): string {
  // Extract the base URL without query parameters
  const baseUrl = remoteUrl.split('?')[0];
  
  // Check if we have a mapping for this URL
  if (imageMapping[baseUrl]) {
    return imageMapping[baseUrl];
  }
  
  // If no mapping is found, return the original URL
  return remoteUrl;
}