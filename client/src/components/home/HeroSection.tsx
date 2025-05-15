import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute inset-0">
        <img 
          src="/images/hero/blaire-hero-image.jpg" 
          alt="Blaire Delanne - Hospitality and Wedding Specialist" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-white font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          Elevating Experiences <br/> With Elegance & Expertise
        </h1>
        <p className="text-white/90 font-cormorant text-xl md:text-2xl max-w-3xl mb-8">
          Hospitality, Wedding Design, Travel, and Fashion Specialist
          <span className="block mt-2">From New York to Sydney to New Zealand</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/specialties" 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-none uppercase tracking-wide font-montserrat font-medium transition duration-300"
          >
            My Specialties
          </Link>
          <Link 
            href="/journal" 
            className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 rounded-none uppercase tracking-wide font-montserrat font-medium transition duration-300"
          >
            Read My Journal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
