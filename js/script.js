// JavaScript for Disease Prediction Website Home Page

document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
  });

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Prediction Modal Functionality
  const predictBtn = document.getElementById('predictBtn');
  const predictionModal = new bootstrap.Modal(document.getElementById('predictionModal'));
  
  if (predictBtn) {
    predictBtn.addEventListener('click', function() {
      // Simulate prediction (replace with actual API call later)
      setTimeout(() => {
        const result = getRandomPrediction();
        document.getElementById('predictionText').textContent = result;
        predictionModal.show();
      }, 1500);
    });
  }

  // Close modal and reset
  document.getElementById('closeModal').addEventListener('click', function() {
    predictionModal.hide();
  });

  // Random prediction demo (replace with real logic)
  function getRandomPrediction() {
    const predictions = [
      '✅ You might have a common cold. Rest and hydrate!',
      '⚠️ Possible flu symptoms detected. Consider seeing a doctor.',
      '✅ Symptoms suggest allergies. Try antihistamines.',
      '🚨 High risk of COVID-19. Please get tested immediately.',
      '✅ Likely seasonal allergies. Monitor symptoms.'
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  }

  // Navbar mobile toggle enhancement
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      document.body.style.overflow = this.classList.contains('collapsed') ? '' : 'hidden';
    });
  }

  // Counter animation for stats (if added later)
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current) + counter.getAttribute('data-suffix');
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target + counter.getAttribute('data-suffix');
        }
      };
      
      if (isElementInViewport(counter)) {
        updateCounter();
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Initialize
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // Form validation for symptom input (if added)
  const symptomForm = document.getElementById('symptomForm');
  if (symptomForm) {
    symptomForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Process form data
      alert('Symptoms submitted! Processing prediction...');
    });
  }
});
