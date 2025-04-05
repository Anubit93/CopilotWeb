function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('visible');
}

// Add an event listener to the hamburger icon
const hamburgerIcon = document.querySelector('.hamburger-icon');
hamburgerIcon.addEventListener('click', toggleMenu);

// Implement smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block'; // Show matching projects
        } else {
            project.style.display = 'none'; // Hide non-matching projects
        }
    });
}

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProjects(category);
    });
});

// Function to open the lightbox
function openLightbox(imageSrc, altText) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="${altText}">
            <span class="close-lightbox">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Close the lightbox when the close button is clicked
    const closeButton = lightbox.querySelector('.close-lightbox');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });

    // Close the lightbox when clicking outside the image
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// Add event listeners to project images
const projectImages = document.querySelectorAll('.project img');
projectImages.forEach(image => {
    image.addEventListener('click', () => {
        openLightbox(image.src, image.alt);
    });
});

document.querySelector('form').addEventListener('submit', function (event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name
    if (name === '') {
        alert('Please enter your name.');
        isValid = false;
    }

    // Validate Email
    if (email === '') {
        alert('Please enter your email.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    // Validate Message
    if (message === '') {
        alert('Please enter your message.');
        isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});