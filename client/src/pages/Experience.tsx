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

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">My Professional Journey</h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              From New York to Sydney to Auckland, explore my experience across different cultures and industries.
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
                    Beginning my professional career in Manhattan's competitive hospitality and fashion scene, where I developed a foundation in luxury service and style.
                  </p>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-semibold">NY</span>
                </div>
                
                <div className="md:w-1/2 md:pl-12 mt-0 md:mt-0">
                  <div className="md:hidden">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">New York, USA</h3>
                    <span className="text-charcoal/60 font-medium">2018 - 2019</span>
                  </div>
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0">
                    <h4 className="font-semibold text-lg mb-2">The Peninsula New York</h4>
                    <p className="text-charcoal/80 mb-3">
                      Worked in guest relations at this five-star hotel, developing skills in luxury hospitality and event coordination for high-profile clients.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5">Kleinfeld Bridal</h4>
                    <p className="text-charcoal/80">
                      Assisted with wedding styling and coordination, learning the intricacies of luxury wedding planning and client management.
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
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0">
                    <h4 className="font-semibold text-lg mb-2">Four Seasons Hotel Sydney</h4>
                    <p className="text-charcoal/80 mb-3">
                      Managed VIP relations and coordinated luxury experiences for hotel guests, specializing in creating bespoke itineraries.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5">Luxe Society Events</h4>
                    <p className="text-charcoal/80">
                      Planned and executed high-end events and weddings across Australia, focusing on destination celebrations and cultural integration.
                    </p>
                  </div>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-semibold">SY</span>
                </div>
                
                <div className="hidden md:block w-1/2 pl-12">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">Sydney, Australia</h3>
                  <span className="text-charcoal/60 font-medium">2020 - 2021</span>
                  <p className="mt-2 text-charcoal/80">
                    Expanding my expertise in the Asia-Pacific region, embracing Australian approaches to hospitality and developing skills in destination event management.
                  </p>
                </div>
              </div>
              
              {/* New Zealand - 2022-2023 */}
              <div className="relative md:flex items-center">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">Auckland, New Zealand</h3>
                  <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  <p className="mt-2 text-charcoal/80">
                    Establishing my independent consultancy while continuing to grow my expertise in sustainable hospitality and authentic travel experiences.
                  </p>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-semibold">NZ</span>
                </div>
                
                <div className="md:w-1/2 md:pl-12 mt-0 md:mt-0">
                  <div className="md:hidden">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">Auckland, New Zealand</h3>
                    <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  </div>
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0">
                    <h4 className="font-semibold text-lg mb-2">Blaire Delanne Consulting</h4>
                    <p className="text-charcoal/80 mb-3">
                      Founded my independent consultancy focusing on hospitality excellence, wedding design, and curated travel experiences across New Zealand and beyond.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5">Hotel DeBrett</h4>
                    <p className="text-charcoal/80">
                      Collaborate with this boutique luxury hotel on special projects, bringing innovative approaches to guest experiences and sustainability practices.
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