import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/about/blaire-profile-1.jpg" 
              alt="Blaire Delanné, Hospitality & Wedding Specialist" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Meet Blaire</h2>
            <div className="w-20 h-1 bg-accent mb-6"></div>
            
            <p className="text-charcoal/80 mb-6">
              Hello, I'm Blaire Delanné. I've spent years exploring the art of creating meaningful experiences
              across hospitality, wedding design, travel, and fashion. My journey has taken me from New York's
              bustling hotel scene to the serene wedding venues of New Zealand.
            </p>
            
            <p className="text-charcoal/80 mb-6">
              I believe in simple pleasures - a perfectly paired wine and cheese, an intimate gathering with loved ones,
              or discovering a hidden gem while traveling. My approach is practical and authentic, focused on creating
              moments that feel personal and genuine.
            </p>
            
            <p className="text-charcoal/80 mb-6">
              With Blaire Delanné, you'll find a reliable partner who understands the beauty in both grand events
              and quiet moments. Whether you're planning a wedding, seeking travel recommendations, or looking for
              hospitality advice, I'm here to help you create experiences that truly matter.
            </p>
            
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            
            <div className="flex items-center">
              <div className="mr-6 text-accent font-playfair text-4xl">B</div>
              <blockquote className="italic text-charcoal/70">
                "The best moments in life aren't about perfection - they're about connection, authenticity, and joy."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
