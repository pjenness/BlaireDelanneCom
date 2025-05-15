import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Fashion model on runway" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-white font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          Redefining Style <br/> One Story at a Time
        </h1>
        <p className="text-white/90 font-cormorant text-xl md:text-2xl max-w-3xl mb-8">
          Your trusted curator for the latest in fashion trends, styling tips, and industry insights
        </p>
        <Link 
          href="/blog" 
          className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-none uppercase tracking-wide font-montserrat font-medium transition duration-300"
        >
          Explore Latest
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
