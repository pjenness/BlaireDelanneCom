
// Basic functionality for the static site
document.addEventListener('DOMContentLoaded', function() {
  // Make all article images clickable
  const makeImagesClickable = function() {
    const articleImages = document.querySelectorAll('article img');
    articleImages.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        const article = img.closest('article');
        if (article) {
          const links = article.querySelectorAll('a');
          for (let i = 0; i < links.length; i++) {
            const href = links[i].getAttribute('href');
            if (href && (href.includes('/blog/') || href.includes('/journal/'))) {
              window.location.href = href;
              break;
            }
          }
        }
      });
    });
  };
  
  makeImagesClickable();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
