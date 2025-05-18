
// Main JavaScript for the static site
document.addEventListener('DOMContentLoaded', function() {
  // Make all card images clickable
  document.querySelectorAll('.card img').forEach(function(img) {
    img.addEventListener('click', function() {
      const link = this.closest('.card').querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    });
  });

  // Handle URL params for blog posts
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  if (postId && document.getElementById('blog-container')) {
    renderBlogPost(postId);
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const navMenu = document.getElementById('nav-menu');
      navMenu.classList.toggle('show');
    });
  }
});

// Function to render a blog post based on ID
function renderBlogPost(id) {
  const post = postsData.find(p => p.id.toString() === id.toString());
  
  if (!post) {
    document.getElementById('blog-container').innerHTML = '<div class="blog-post"><h1>Post not found</h1><p>Sorry, the requested blog post could not be found.</p></div>';
    return;
  }
  
  const blogHTML = `
    <article class="blog-post">
      <div class="blog-header">
        <h1>${post.title}</h1>
        <div class="blog-meta">
          <span>${formatDate(post.publishedAt)}</span>
          ${post.location ? `<span> · ${post.location}</span>` : ''}
          ${post.category ? `<span> · ${post.category}</span>` : ''}
        </div>
      </div>
      <div class="blog-content">
        <img src="${post.coverImage}" alt="${post.title}">
        ${post.content}
      </div>
    </article>
  `;
  
  document.getElementById('blog-container').innerHTML = blogHTML;
}

// Helper function to format dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}