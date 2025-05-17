import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, Facebook, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-3 lg:col-span-1">
            <Link href="/" className="font-playfair text-2xl font-bold mb-4 block">
              Blaire <span className="text-accent">Delanné</span>
            </Link>
            <p className="text-white/70 mb-6">
              Bringing elegance and expertise to hospitality, wedding design, travel, and fashion.
              Experience the journey from the USA to Australia to New Zealand.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/blairedelanne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@blairedelanne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition duration-300"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
              </a>
              <a 
                href="mailto:blaire@blairedelanne.com" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition duration-300"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4">Specialties</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/specialties#hospitality" className="text-white/70 hover:text-accent transition duration-300">
                  Hospitality
                </Link>
              </li>
              <li>
                <Link href="/specialties#wedding" className="text-white/70 hover:text-accent transition duration-300">
                  Wedding Design
                </Link>
              </li>
              <li>
                <Link href="/specialties#travel" className="text-white/70 hover:text-accent transition duration-300">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/specialties#fashion" className="text-white/70 hover:text-accent transition duration-300">
                  Fashion
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-accent transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-accent transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-white/70 hover:text-accent transition duration-300">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-white/70 hover:text-accent transition duration-300">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-accent transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4">Subscribe</h4>
            <p className="text-white/70 mb-4">Join my newsletter for exclusive content and updates.</p>
            <form className="flex" onSubmit={handleSubmit}>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" 
                className="px-3 py-2 bg-white/10 border border-white/20 focus:border-accent focus:outline-none text-white placeholder-white/50 w-full" 
                required 
              />
              <button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-white px-4 py-2 uppercase tracking-wide transition duration-300 ml-2"
                disabled={isSubmitting}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Blaire Delanné. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
