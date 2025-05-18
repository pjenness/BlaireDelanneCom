import { Helmet } from "react-helmet";

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Professional Experience | Blaire Delanné</title>
        <meta name="description" content="Explore Blaire Delanné's professional journey across the USA, Australia, and New Zealand in hospitality, wedding design, travel, and fashion." />
        <meta property="og:title" content="Professional Experience | Blaire Delanné" />
        <meta property="og:description" content="Explore Blaire Delanné's professional journey across the USA, Australia, and New Zealand in hospitality, wedding design, travel, and fashion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedelanne.com/experience" />
      </Helmet>

      <section className="py-16 bg-secondary bg-opacity-50 bg-[url('/images/hero/experience-hero.jpg')] bg-fixed bg-blend-soft-light">
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
                    My professional journey began in the vibrant, fast-paced world of Manhattan, where I discovered my passion for luxury hospitality and event design. Working with demanding clients in one of the world's most competitive markets taught me the value of attention to detail and personalized service. New York's blend of sophistication and creativity continues to influence my aesthetic approach today.
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
                    <h4 className="font-semibold text-lg mb-2 font-playfair">The Luminous Grand Hotel</h4>
                    <p className="text-charcoal/80 mb-3">
                      At this iconic Manhattan destination, I managed guest experiences for an international clientele with exceptionally high standards. I coordinated everything from Broadway show access to private harbor cruises, developing a knack for anticipating needs and delivering personalized service. The fast-paced environment taught me invaluable lessons about luxury hospitality that still inform my work today.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Eternal Elegance Bridal</h4>
                    <p className="text-charcoal/80">
                      What began as a weekend position quickly evolved into a formative professional experience. Here I discovered my natural talent for guiding clients through emotionally significant moments with a calm, thoughtful approach. I developed an eye for matching design elements with individual preferences and personalities - a skill that's become central to my event consulting work.
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
                    <h4 className="font-semibold text-lg mb-2 font-playfair">Harbour View Luxury Hotel</h4>
                    <p className="text-charcoal/80 mb-3">
                      At this premier waterfront property, I curated local experiences for international guests seeking authentic Sydney moments. I developed a network of off-the-beaten-path destinations and cultural connections that elevated guest stays beyond typical tourist experiences. This role honed my ability to translate between different cultural expectations and create tailored hospitality moments.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Celestial Celebrations</h4>
                    <p className="text-charcoal/80">
                      Here I designed distinctive celebrations that moved beyond conventional approaches to wedding design. I particularly enjoyed incorporating Australia's unique natural elements and landscapes - from coastal settings to vineyard environments. Working with native flora helped me develop a stronger connection between event design and local terroir, an approach that continues to define my work today.
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
                    My time in Sydney began unexpectedly when the pandemic restricted international travel, but quickly evolved into a valuable professional chapter. I embraced Australia's distinctive approach to luxury hospitality and fell in love with their native flora and design sensibilities. Working with beachside venues and local wine producers expanded my creative repertoire and gave me a fresh perspective on event design that balances sophistication with natural elements.
                  </p>
                </div>
              </div>
              
              {/* New Zealand - 2022-2023 */}
              <div className="relative md:flex items-center">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">New Zealand</h3>
                  <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  <p className="mt-2 text-charcoal/80">
                    My New Zealand journey began in Auckland, where I established my independent consultancy business. After building a solid foundation in the city over three years, I made a thoughtful transition to Martinborough's wine country in early 2025. This move represents a strategic shift to focus on boutique hospitality and event design in a region renowned for its exceptional wines and artisanal producers. Working closely with local winemakers and food artisans has allowed me to create more intimate, terroir-driven experiences that highlight the distinctive character of this special region.
                  </p>
                </div>
                
                <div className="absolute top-0 -left-4 md:left-1/2 md:-ml-2.5 h-8 w-8 rounded-full bg-accent flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold">NZ</span>
                </div>
                
                <div className="md:w-1/2 md:pl-12 mt-0 md:mt-0">
                  <div className="md:hidden">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">New Zealand</h3>
                    <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  </div>
                  <div className="bg-white p-6 shadow-sm mt-3 md:mt-0 border-t-2 border-accent/30">
                    <h4 className="font-semibold text-lg mb-2 font-playfair">Martinborough Consultancy (2025 - Present)</h4>
                    <p className="text-charcoal/80 mb-3">
                      Since relocating to Martinborough in early 2025, I've partnered with distinctive vineyards and venues throughout the Wairarapa region. My work focuses on creating authentic hospitality experiences that showcase the unique terroir and artisanal culture of this remarkable wine region. Working with passionate small producers allows for a collaborative approach that highlights the distinctive character of each venue.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">The Drift Agentic – Aesthetic Producer (2025 - Present)</h4>
                    <p className="text-charcoal/80 mb-3">
                      As a part-time consultant with this innovative AI startup, I help design visual aesthetics and personality frameworks for AI agents used in commercial applications. This fascinating side project allows me to apply my design principles to emerging technology while maintaining my primary focus on hospitality consulting in wine country. The role represents an interesting intersection of my creative sensibilities and technological innovation.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Auckland Experience (2022-2025)</h4>
                    <p className="text-charcoal/80">
                      In Auckland, I established my consultancy specializing in boutique hospitality and custom event design. My work with The Fern Boutique Hotel was particularly formative, allowing me to develop distinctive approaches to wine tastings, seasonal dining experiences, and local artisan partnerships. This metropolitan experience provided an excellent foundation for my current focus on creating intimate, personalized experiences in Martinborough's wine country.
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