import { Helmet } from "react-helmet";

const Specialties = () => {
  return (
    <>
      <Helmet>
        <title>My Specialties | Blaire Delanne</title>
        <meta name="description" content="Discover Blaire Delanne's expertise in hospitality, wedding design, travel experiences, and fashion styling." />
        <meta property="og:title" content="My Specialties | Blaire Delanne" />
        <meta property="og:description" content="Discover Blaire Delanne's expertise in hospitality, wedding design, travel experiences, and fashion styling." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedelanne.com/specialties" />
      </Helmet>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">My Areas of Expertise</h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              With experience spanning multiple industries and continents, I bring a unique perspective to every project.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h2 className="font-playfair text-2xl font-semibold ml-3">Hospitality Consulting</h2>
              </div>
              <p className="mb-4">
                Drawing from my experience at premier establishments across three continents, I offer strategic guidance to hospitality businesses seeking to elevate their guest experience, operational efficiency, and brand positioning.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
                <li>Guest experience optimization</li>
                <li>Staff training & development programs</li>
                <li>Menu design & cocktail program development</li>
                <li>Atmosphere & ambiance creation</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="font-playfair text-2xl font-semibold ml-3">Wedding Design</h2>
              </div>
              <p className="mb-4">
                I specialize in creating bespoke wedding experiences that reflect each couple's unique journey, values, and aesthetic preferences. From intimate gatherings to grand celebrations, my approach combines meticulous planning with creative vision.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
                <li>Concept development & aesthetic direction</li>
                <li>Vendor selection & coordination</li>
                <li>Destination wedding planning</li>
                <li>Day-of coordination & execution</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h2 className="font-playfair text-2xl font-semibold ml-3">Travel Curation</h2>
              </div>
              <p className="mb-4">
                Having explored diverse destinations across the globe, I help clients design meaningful travel experiences that balance iconic highlights with authentic local encounters. My expertise spans luxury accommodations, cultural immersion, and off-the-beaten-path adventures.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
                <li>Personalized itinerary development</li>
                <li>Luxury accommodation recommendations</li>
                <li>Hidden gem discoveries</li>
                <li>Cultural experience facilitation</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="font-playfair text-2xl font-semibold ml-3">Fashion Styling</h2>
              </div>
              <p className="mb-4">
                I believe in the power of personal style as a form of self-expression. My approach to fashion styling emphasizes investment dressing, versatility, and creating wardrobes that align with clients' lifestyles while elevating their visual presence.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
                <li>Personal style development</li>
                <li>Capsule wardrobe creation</li>
                <li>Special event styling</li>
                <li>Sustainable fashion consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Specialties;