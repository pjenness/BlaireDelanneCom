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
                    <h4 className="font-semibold text-lg mb-2 font-playfair">The Luminous Grand Hotel</h4>
                    <p className="text-charcoal/80 mb-3">
                      I was enchanted by the world of luxury hospitality at this iconic Manhattan hotel, where I curated special experiences for guests and developed a keen eye for those little details that transform a stay into an unforgettable memory.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Eternal Elegance Bridal</h4>
                    <p className="text-charcoal/80">
                      At this magical bridal destination in the heart of Manhattan, I discovered my passion for helping couples bring their wedding dreams to life. Each dress, each veil, each teary-eyed smile when a bride found "the one" reinforced my love for creating moments of pure joy and celebration.
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
                      Scored a dream gig at this fancy harborside spot where I basically got paid to show off Sydney to rich tourists. Became an expert at finding the cool local spots that weren't in guidebooks. Got pretty good at translating between Aussie slang and American English too - turns out "thongs" means something very different down under!
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Celestial Celebrations</h4>
                    <p className="text-charcoal/80">
                      Spent weekends designing weddings that didn't look like Pinterest vomit. Found out Aussies actually let you have fun with wedding planning - beach ceremonies, vineyard parties, even did one on a boat (never again, seasickness + open bar = disaster). Got obsessed with using native Australian plants that look like they're from another planet.
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
                    Sydney was my covid refuge - ended up staying way longer than planned when travel shut down. Fell for Aussie's no-BS approach to luxury and their incredible native plants (those banksia flowers are wild!). Learned to work with local wines and beachside venues while soaking up that sunshine. Miss those Sydney sunsets but not the housing prices, yikes.
                  </p>
                </div>
              </div>
              
              {/* New Zealand - 2022-2023 */}
              <div className="relative md:flex items-center">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">New Zealand</h3>
                  <span className="text-charcoal/60 font-medium">2022 - Present</span>
                  <p className="mt-2 text-charcoal/80">
                    Started my NZ chapter in Auckland (big city training wheels after Sydney) where I built up my own consultancy from scratch. Three years of city hustle later, shocked everyone by ditching Auckland for tiny Martinborough in early 2025. Seriously, the place has ONE traffic light! But the wine is incredible, the people are real, and I can breathe again. Working with local winemakers and food producers who actually care about what they're creating. Turns out small town doesn't mean small thinking - just means I can walk to work and drink world-class pinot with the people who made it.
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
                      Since escaping to Martinborough in early 2025, I've been helping local vineyards and venues throughout Wairarapa create experiences that don't suck. Working with smaller, passionate operations means we can get creative with event design that actually shows off what makes this wine region special - the people, the land, and of course, the wine.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">The Drift Agentic – Aesthetic Producer (2025 - Present)</h4>
                    <p className="text-charcoal/80 mb-3">
                      Got roped into this weird side hustle with an AI startup where I basically make sure their robot personalities don't look and sound like total garbage. About 5 hours a week remote work that keeps my brain from turning completely to wine-soaked mush while living in Martinborough. Surprisingly fun applying my design instincts to tech.
                    </p>
                    <h4 className="font-semibold text-lg mb-2 mt-5 font-playfair">Auckland Experience (2022-2025)</h4>
                    <p className="text-charcoal/80">
                      Built my consulting biz in Auckland focusing on boutique hotels and custom events. My stint at The Fern Boutique Hotel taught me how to craft experiences worth the ridiculous price tag - from wine tastings that don't bore people to death to seasonal menus people actually remember. All that big city experience translates surprisingly well to small-town wine country, just with fewer traffic jams.
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