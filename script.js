// Slideshow functionality
class Slideshow {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.totalSlides = this.slides.length;
    
    this.init();
  }
  
  init() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Auto-advance slides
    this.startAutoAdvance();
    
    // Pause auto-advance on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => this.pauseAutoAdvance());
    slideshowContainer.addEventListener('mouseleave', () => this.startAutoAdvance());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
  goToSlide(index) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');
    
    // Update current slide
    this.currentSlide = index;
    
    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }
  
  startAutoAdvance() {
    // Clear any existing interval first
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
    
    this.autoAdvanceInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Change slide every 4 seconds
  }
  
  pauseAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
  }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Slideshow();
  
  // Burger menu functionality
  const burgerMenu = document.getElementById('burger-menu');
  const navPanel = document.getElementById('nav-panel');
  const closeNav = document.getElementById('close-nav');
  
  burgerMenu.addEventListener('click', () => {
    navPanel.classList.add('open');
    burgerMenu.classList.add('hidden');
  });
  
  closeNav.addEventListener('click', () => {
    navPanel.classList.remove('open');
    burgerMenu.classList.remove('hidden');
  });
  
  // Close menu when clicking outside
  navPanel.addEventListener('click', (e) => {
    if (e.target === navPanel) {
      navPanel.classList.remove('open');
      burgerMenu.classList.remove('hidden');
    }
  });
}); 