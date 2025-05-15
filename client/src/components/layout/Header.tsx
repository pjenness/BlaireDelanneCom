import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-secondary ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-shadow duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-primary font-playfair text-2xl md:text-3xl font-bold">
            Blaire <span className="text-accent">Delanné</span>
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-primary focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`nav-link text-primary hover:text-accent transition duration-300 ${
              location === "/" ? "font-medium text-accent" : ""
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`nav-link text-primary hover:text-accent transition duration-300 ${
              location === "/about" ? "font-medium text-accent" : ""
            }`}
          >
            About
          </Link>
          <Link 
            href="/specialties" 
            className={`nav-link text-primary hover:text-accent transition duration-300 ${
              location === "/specialties" ? "font-medium text-accent" : ""
            }`}
          >
            Specialties
          </Link>
          <Link 
            href="/experience" 
            className={`nav-link text-primary hover:text-accent transition duration-300 ${
              location === "/experience" ? "font-medium text-accent" : ""
            }`}
          >
            Experience
          </Link>
          <Link 
            href="/journal" 
            className={`nav-link text-primary hover:text-accent transition duration-300 ${
              location === "/journal" || location.startsWith("/journal/") ? "font-medium text-accent" : ""
            }`}
          >
            Journal
          </Link>
          <Link 
            href="/contact" 
            className={`nav-link text-primary hover:text-accent transition duration-300 ${
              location === "/contact" ? "font-medium text-accent" : ""
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} px-4 py-4 bg-white md:hidden`}>
        <div className="flex flex-col space-y-4">
          <Link onClick={closeMobileMenu} href="/" className="text-primary hover:text-accent transition duration-300">
            Home
          </Link>
          <Link onClick={closeMobileMenu} href="/about" className="text-primary hover:text-accent transition duration-300">
            About
          </Link>
          <Link onClick={closeMobileMenu} href="/specialties" className="text-primary hover:text-accent transition duration-300">
            Specialties
          </Link>
          <Link onClick={closeMobileMenu} href="/experience" className="text-primary hover:text-accent transition duration-300">
            Experience
          </Link>
          <Link onClick={closeMobileMenu} href="/journal" className="text-primary hover:text-accent transition duration-300">
            Journal
          </Link>
          <Link onClick={closeMobileMenu} href="/contact" className="text-primary hover:text-accent transition duration-300">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
