const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".header__form form", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".about__card", {
  ...scrollRevealOption,
  interval: 500,
});

const tabs = document.querySelector(".deals__tabs");

tabs.addEventListener("click", (e) => {
  const tabContents = document.querySelectorAll(
    ".deals__container .tab__content"
  );
  Array.from(tabs.children).forEach((item) => {
    if (item.dataset.id === e.target.dataset.id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  tabContents.forEach((item) => {
    if (item.id === e.target.dataset.id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});

ScrollReveal().reveal(".choose__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".choose__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".choose__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".choose__card", {
  duration: 1000,
  delay: 1500,
  interval: 500,
});

ScrollReveal().reveal(".subscribe__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".subscribe__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".subscribe__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".subscribe__content form", {
  ...scrollRevealOption,
  delay: 1500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
});


// Firebase configuration
// Form navigation elements
const form = document.getElementById('registrationForm');
const sections = document.querySelectorAll('.section');
const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

let currentStep = 1;
const totalSteps = sections.length;

// Navigation functions
function showSection(stepNumber) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });

    // Show current section
    const currentSection = document.querySelector(`.section[data-step="${stepNumber}"]`);
    currentSection.classList.add('active');

    // Update steps
    steps.forEach((step, index) => {
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });

    // Update buttons
    prevBtn.style.display = stepNumber === 1 ? 'none' : 'block';
    nextBtn.style.display = stepNumber === totalSteps ? 'none' : 'block';
    submitBtn.style.display = stepNumber === totalSteps ? 'block' : 'none';
}

// Validate current section
function validateSection(stepNumber) {
    const currentSection = document.querySelector(`.section[data-step="${stepNumber}"]`);
    const inputs = currentSection.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (validateSection(currentStep)) {
        currentStep++;
        showSection(currentStep);
    } else {
        alert('Please fill in all required fields before proceeding.');
    }
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    showSection(currentStep);
});

// Initialize form
showSection(1);

// Add some basic styles for invalid fields
const style = document.createElement('style');
style.textContent = `
    input.invalid {
        border-color: #dc3545 !important;
    }
`;
document.head.appendChild(style);

// Firebase initialization and form submission (keep this part from the previous code)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize Firebase (uncomment and add your config when ready)
        /*
        const firebaseConfig = {
            // your config here
        };
        firebase.initializeApp(firebaseConfig);
        */

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (validateSection(currentStep)) {
                // Add your form submission logic here
                console.log('Form submitted');
            }
        });
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
});