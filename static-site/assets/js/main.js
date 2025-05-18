
// Simple JavaScript for the static site
document.addEventListener('DOMContentLoaded', function() {
  // Make all card images clickable
  document.querySelectorAll('.card-image img').forEach(function(img) {
    img.addEventListener('click', function() {
      const link = this.closest('.card').querySelector('a.read-more');
      if (link) {
        window.location.href = link.href;
      }
    });
  });
  
  // Add form submission handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message. I will get back to you soon.');
      this.reset();
    });
  }
});

// Format dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}