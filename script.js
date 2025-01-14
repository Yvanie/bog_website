const infoNavbar = document.querySelector('.info-navbar');
const navbar = document.querySelector('.navbar');


let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const isMobile = window.innerWidth <= 768; // Check if on mobile

    if (isMobile) {
        infoNavbar.classList.add('hidden'); // Always hide info navbar on mobile
        navbar.style.top = '0'; // Ensure navbar is at the top
    } else {
        // Show or hide the info navbar based on scroll position
        if (scrollPosition > lastScrollTop) {
            // Scrolling down
            infoNavbar.classList.add('hidden'); // Hide info navbar
        } else {
            // Scrolling up
            infoNavbar.classList.remove('hidden'); // Show info navbar
        }

        // Fix the info navbar to the top when scrolling
        if (scrollPosition > 0) {
            infoNavbar.classList.add('fixed');
            navbar.style.top = '0'; // Keep navbar at the top
        } else {
            infoNavbar.classList.remove('fixed');
            navbar.style.top = '40px'; // Reset navbar position
        }
    }

    lastScrollTop = scrollPosition; // Update last scroll position
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(index) {
  // Reset all slides to hidden
  slides.forEach(slide => slide.style.display = "none");

  // Display the current slide
  slides[index].style.display = "block";
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Show the first slide initially
showSlide(currentSlide);

// Change slide every 5 seconds
setInterval(nextSlide, 5000);


// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('is-active'); // Toggle the active state for hamburger
    const icon = hamburger.querySelector('i');

    // Change the icon based on the active state
    if (hamburger.classList.contains('is-active')) {
        icon.classList.remove('fa-bars'); // Remove hamburger icon
        icon.classList.add('fa-times'); // Add X icon
    } else {
        icon.classList.remove('fa-times'); // Remove X icon
        icon.classList.add('fa-bars'); // Add hamburger icon
    }
});

let currentIndex = 0;
const logosPerSlide = 6; // Number of logos to display per slide
const totalLogos = document.querySelectorAll('.partner-logo').length; // Total logos

// Clone the first few logos for a seamless effect
const partnerWrapper = document.querySelector('.partner-wrapper');
const clonedLogos = document.querySelectorAll('.partner-logo').forEach((logo, index) => {
    if (index < logosPerSlide) {
        const clone = logo.cloneNode(true);
        partnerWrapper.appendChild(clone);
    }
});

function slideLogos() {
    const offset = currentIndex * -(100 / logosPerSlide); // Calculate offset
    partnerWrapper.style.transition = 'transform 0.5s ease'; // Smooth transition
    partnerWrapper.style.transform = `translateX(${offset}%)`; // Move logos

    currentIndex++;
    
    // Reset to the beginning without a transition for seamless looping
    if (currentIndex >= totalLogos) {
        currentIndex = 0; // Reset index for seamless looping
        setTimeout(() => {
            partnerWrapper.style.transition = 'none'; // Disable transition for instant jump
            partnerWrapper.style.transform = `translateX(0%)`; // Reset position
        }, 500); // Short delay for visual effect
    }
}

// Slide logos every 3 seconds
setInterval(slideLogos, 3000);


/// Toggle the visibility of the full description
function toggleDescription(serviceId) {
    const desc = document.getElementById(`desc-${serviceId}`);
    const readMoreButton = document.querySelector(`#desc-${serviceId} + .read-more`);

    // Close all descriptions that are expanded
    const allDescriptions = document.querySelectorAll('.description');
    const allButtons = document.querySelectorAll('.read-more');
    
    allDescriptions.forEach((descElement, index) => {
        if (descElement !== desc && descElement.style.webkitLineClamp !== "4") {
            // Collapse the other descriptions
            descElement.style.webkitLineClamp = "4";
            allButtons[index].innerText = "Read More"; // Reset button text
        }
    });

    // Toggle the clicked description
    if (desc.style.webkitLineClamp === "4") {
        // Expand the description
        desc.style.webkitLineClamp = "unset"; // Remove truncation
        readMoreButton.innerText = "Read Less"; // Change button text to 'Read Less'
    } else {
        // Collapse the description
        desc.style.webkitLineClamp = "4"; // Limit to 4 lines
        readMoreButton.innerText = "Read More"; // Change button text back to 'Read More'
    }
}

// Initialize all descriptions to be truncated when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const allDescriptions = document.querySelectorAll(".description");
    allDescriptions.forEach(desc => {
        desc.style.webkitLineClamp = "4"; // Initially truncate to 4 lines
    });
});




let currentPage = 1;
const postsPerPage = 6;

const blogPosts = document.querySelectorAll('.single-post');

const renderPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    blogPosts.forEach((post, index) => {
        if (index >= startIndex && index < endIndex) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
};

const renderPagination = () => {
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    const pageNumbersContainer = document.getElementById('page-numbers');
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('pagination-btn');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            renderPosts();
            renderPagination();
        };
        if (i === currentPage) {
            pageButton.style.backgroundColor = '#2980b9';
        }
        pageNumbersContainer.appendChild(pageButton);
    }

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
};

document.getElementById('prev-page').onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
        renderPagination();
    }
};

document.getElementById('next-page').onclick = () => {
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        renderPagination();
    }
};

// Initial render
renderPosts();
renderPagination();


