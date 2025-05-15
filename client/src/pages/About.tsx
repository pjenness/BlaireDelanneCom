import { Helmet } from "react-helmet";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Blaire | BlaireFashionHub</title>
        <meta name="description" content="Learn more about Blaire, the fashion enthusiast behind BlaireFashionHub and her journey in the world of style." />
        <meta property="og:title" content="About Blaire | BlaireFashionHub" />
        <meta property="og:description" content="Learn more about Blaire, the fashion enthusiast behind BlaireFashionHub and her journey in the world of style." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairefashionhub.com/about" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" />
      </Helmet>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">About Blaire</h1>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Blaire, Fashion Editor" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="font-playfair text-3xl font-bold mb-6">The Face Behind the Blog</h2>
              
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
            </div>
          </div>
          
          <div className="bg-secondary p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-3xl font-bold mb-6 text-center">My Philosophy</h2>
              
              <p className="text-charcoal/80 mb-6">
                Through BlaireFashionHub, I aim to provide insightful commentary on industry developments, 
                practical styling advice, and thoughtful analyses of the cultural significance of what we wear. 
                Whether you're a fashion insider or simply someone who appreciates the transformative power of 
                a well-curated wardrobe, I hope you'll find inspiration and value in the content I create.
              </p>
              
              <p className="text-charcoal/80 mb-6">
                I believe in sustainable fashion practices and supporting brands that prioritize ethical 
                production methods and fair labor practices. Fashion should be inclusive, accessible, and 
                environmentally conscious—these values guide my approach to content creation and curation.
              </p>
              
              <blockquote className="italic text-center text-charcoal/70 text-xl font-cormorant border-l-4 border-accent pl-6 my-8">
                "Fashion is about dressing according to what's fashionable. Style is more about being yourself."
              </blockquote>
              
              <p className="text-charcoal/80">
                I'm constantly learning and evolving in my understanding of fashion and its impact on individuals 
                and society. This blog is a reflection of that journey—a space where we can explore, question, 
                and celebrate the ever-changing world of style together.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-3">Fashion Writing</h3>
              <p className="text-charcoal/70">
                Creating engaging, informative content about the latest trends, historical context of styles, and the cultural impact of fashion.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-3">Style Curation</h3>
              <p className="text-charcoal/70">
                Carefully selecting and showcasing innovative designs, emerging talents, and iconic pieces that define contemporary style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-3">Industry Analysis</h3>
              <p className="text-charcoal/70">
                Providing thoughtful commentary on fashion industry developments, business trends, and the future of style.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold mb-6">Let's Connect</h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto mb-8">
              I love hearing from readers and connecting with fellow fashion enthusiasts. 
              Whether you have a question, suggestion, or just want to chat about style, 
              feel free to reach out through social media or the contact form.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 uppercase tracking-wide font-medium transition duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
