import { Helmet } from "react-helmet";
import ContactSection from "@/components/contact/ContactSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Blaire Delanné | Hospitality & Wedding Specialist</title>
        <meta name="description" content="Get in touch with Blaire Delanné for hospitality consulting, wedding design collaborations, travel advice, or fashion styling inquiries." />
        <meta property="og:title" content="Contact Blaire Delanné | Hospitality & Wedding Specialist" />
        <meta property="og:description" content="Get in touch with Blaire Delanné for hospitality consulting, wedding design collaborations, travel advice, or fashion styling inquiries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairedeanne.com/contact" />
      </Helmet>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">Get in Touch</h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Have a question, suggestion, or collaboration idea? I'd love to hear from you.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
        </div>
      </section>
      
      <ContactSection />
    </>
  );
};

export default Contact;
