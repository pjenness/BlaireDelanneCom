import { Helmet } from "react-helmet";

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Professional Experience | Blaire Delanne</title>
        <meta name="description" content="Explore Blaire Delanne's professional journey across the USA, Australia, and New Zealand in hospitality, wedding design, travel, and fashion." />
        <meta property="og:title" content="Professional Experience | Blaire Delanne" />
        <meta property="og:description" content="Explore Blaire Delanne's professional journey across the USA, Australia, and New Zealand in hospitality, wedding design, travel, and fashion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedelanne.com/experience" />
      </Helmet>

      <section className="py-16 bg-secondary bg-opacity-50 bg-[url('https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-4.0.3&auto=format&fit=crop')] bg-fixed bg-blend-soft-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">My Journey & Adventures</h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              From the bustling streets of New York to the scenic shores of Sydney to the breathtaking landscapes of New Zealand — my story of passion, creativity, and growth.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>

          <div className="mt-16">
            {/* Timeline */}
            <div className="relative border-l-2 border-accent/20 ml-4 md:ml-0 md:mx-auto md:max-w-4xl pl-8 md:pl-0">
              
              {/* New York - 2019 */}
              <div className="relative md:flex items-center mb-16">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">New York, USA</h3>
                  <span className="text-charcoal/60 font-medium">2018 - 2019</span>
                  <p className="mt-2 text-charcoal/80">
                    My journey began in the vibrant, fast-paced energy of Manhattan, where I fell in love with the intoxicating blend of luxury hospitality and fashion. These formative experiences shaped my aesthetic and passion for creating memorable moments.
                  </p>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold">NY</span>
                </div>
                
                <div className="md:w-1/2 md:pl-12 mt-0 md:mt-0">
                  <div className="md:hidden">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">New York, USA</h3>
                    <span className="text-charcoal/60 font-medium">2018 - 2019</span>
                  </div>
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0 border-t-2 border-accent/30">
                    <h4 className="font-semibold text-lg mb-2 font-playfair">The Peninsula New York</h4>
                    <p className="text-charcoal/80 mb-3">
                      I was enchanted by the world of luxury hospitality at this iconic hotel, where I curated special experiences for guests and developed a keen eye for those little details that transform a stay into an unforgettable memory.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Kleinfeld Bridal</h4>
                    <p className="text-charcoal/80">
                      At this magical bridal destination, I discovered my passion for helping couples bring their wedding dreams to life. Each dress, each veil, each teary-eyed smile when a bride found "the one" reinforced my love for creating moments of pure joy and celebration.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Sydney - 2020-2021 */}
              <div className="relative md:flex items-center mb-16">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="md:hidden">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">Sydney, Australia</h3>
                    <span className="text-charcoal/60 font-medium">2020 - 2021</span>
                  </div>
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0 border-t-2 border-accent/30">
                    <h4 className="font-semibold text-lg mb-2 font-playfair">Four Seasons Hotel Sydney</h4>
                    <p className="text-charcoal/80 mb-3">
                      The stunning harbor views from this property inspired me daily as I crafted beautiful experiences for guests. I delighted in introducing them to Sydney's hidden gems and creating personalized adventures that showcased Australia's unique blend of sophistication and natural beauty.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Luxe Society Events</h4>
                    <p className="text-charcoal/80">
                      Here I embraced the art of designing breathtaking celebrations that reflected each couple's love story. From intimate vineyard gatherings to lavish harbor-front soirées, I wove Australian landscapes and culture into each event, creating magical spaces where memories bloom.
                    </p>
                  </div>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold">SY</span>
                </div>
                
                <div className="hidden md:block w-1/2 pl-12">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">Sydney, Australia</h3>
                  <span className="text-charcoal/60 font-medium">2020 - 2021</span>
                  <p className="mt-2 text-charcoal/80">
                    Australia captured my heart with its breathtaking beauty and relaxed elegance. Here, I embraced the laid-back sophistication of Australian style while learning to incorporate native flowers, local wines, and stunning natural settings into my event designs.
                  </p>
                </div>
              </div>
              
              {/* New Zealand - 2022-2023 */}
              <div className="relative md:flex items-center">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">Auckland, New Zealand</h3>
                  <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  <p className="mt-2 text-charcoal/80">
                    New Zealand's majestic landscapes and warm culture became my newest canvas and inspiration. Here I found my true voice as I embraced sustainability and mindful luxury, weaving local traditions, indigenous elements, and the country's spectacular natural beauty into unforgettable experiences.
                  </p>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold">NZ</span>
                </div>
                
                <div className="md:w-1/2 md:pl-12 mt-0 md:mt-0">
                  <div className="md:hidden">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">Auckland, New Zealand</h3>
                    <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  </div>
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0 border-t-2 border-accent/30">
                    <h4 className="font-semibold text-lg mb-2 font-playfair">Blaire Delanne Consulting</h4>
                    <p className="text-charcoal/80 mb-3">
                      My proudest achievement—creating my own consultancy where I blend all my passions: designing intimate, soulful weddings; crafting personalized travel itineraries; and helping venues create magical experiences that touch the heart. Every day brings new creative possibilities and beautiful connections.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Hotel DeBrett</h4>
                    <p className="text-charcoal/80">
                      This charming boutique hotel became my creative playground, where I collaborate on special projects that marry luxury with sustainability. Here I've curated wine tasting events, seasonal dining experiences, and partnerships with local artisans that showcase New Zealand's rich cultural tapestry.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;