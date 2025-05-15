import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Blaire, Fashion Editor" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Meet Blaire</h2>
            <div className="w-20 h-1 bg-accent mb-6"></div>
            
            <p className="text-charcoal/80 mb-6">
              Welcome to BlaireFashionHub. I'm Blaire, a fashion enthusiast with a passion for discovering 
              and sharing the stories behind style. With a background in fashion journalism and a 
              keen eye for emerging trends, I've created this space to celebrate the art of personal 
              expression through clothing and accessories.
            </p>
            
            <p className="text-charcoal/80 mb-6">
              My journey in fashion began over a decade ago, working with leading publications and brands 
              to decode the language of style for diverse audiences. I believe that fashion is more than 
              just clothing—it's a powerful form of communication that reflects our identities, values, 
              and aspirations.
            </p>
            
            <p className="text-charcoal/80 mb-6">
              Through BlaireFashionHub, I aim to provide insightful commentary on industry developments, 
              practical styling advice, and thoughtful analyses of the cultural significance of what we wear. 
              Whether you're a fashion insider or simply someone who appreciates the transformative power of 
              a well-curated wardrobe, I hope you'll find inspiration and value in the content I create.
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
                "Fashion is about dressing according to what's fashionable. Style is more about being yourself."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
