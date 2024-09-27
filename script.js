// Change header background
window.addEventListener('scroll', function () {
    const header = document.querySelector(".header");
    if (window.scrollY >= 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// Side menu
function openMenu() {
    document.getElementById('side-menu').classList.add('open');
    document.getElementById('overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});


// Create animated stars
setInterval(createStar, 100);

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2 + 1;
    const leftPosition = Math.random() * 100;
    const fallDuration = Math.random() * 5 + 3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${leftPosition}vw`;
    star.style.animationDuration = `${fallDuration}s`;
    star.style.opacity = Math.random();

    document.querySelector('.stars').appendChild(star);

    setTimeout(() => { star.remove(); }, fallDuration * 1000);
}


// Change the current tab
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach(tabLink => {
    tabLink.addEventListener('click', () => {
        openTab(tabLink.innerHTML.toLowerCase());
    });
});

function openTab(tabName) {
    tabLinks.forEach(tabLink => {
        tabLink.classList.remove("active-link")
    });

    tabContents.forEach(tabContent => {
        tabContent.classList.remove("active-tab")
    });

    event.currentTarget.classList.add("active-link")
    document.getElementById(tabName).classList.add("active-tab")
}


// See more projects button
const seeMoreBtn = document.querySelector(".see-more")

let itemsToShow = 4;
const breakpoints = {
    mobile: 470,
    tablet: 768,
    medium: 1200,
};

changeProjectsCount()
window.addEventListener('resize', () => {
    changeProjectsCount()
    closeMenu()
})

function changeProjectsCount() {
    if (window.innerWidth <= breakpoints.mobile) {
        itemsToShow = 1;
    } else if (window.innerWidth <= breakpoints.tablet) {
        itemsToShow = 2;
    } else if (window.innerWidth <= breakpoints.medium) {
        itemsToShow = 3;
    } else {
        itemsToShow = 4;
    }

    updateProjectVisibility();
}

function updateProjectVisibility() {
    const projects = document.querySelectorAll(".work")

    projects.forEach((project, index) => {
        if (index < itemsToShow) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });

    updateSeeMoreButtonVisibility();
}

function updateSeeMoreButtonVisibility() {
    const hiddenCards = document.querySelectorAll(".work.hidden");
    seeMoreBtn.classList.toggle("hidden", hiddenCards.length === 0);
}

seeMoreBtn.addEventListener('click', () => {
    const hiddenCards = document.querySelectorAll(".work.hidden")

    for (let i = 0; i < itemsToShow && i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
    }

    updateSeeMoreButtonVisibility();
})


// Form to sheets code
const scriptURL = 'https://script.google.com/macros/s/AKfycbzZz3rH5vkKRRkVD8pMLx0tCRxapcnbgILoNxwNHtUiNRzbaJDaOg0fBGIWbFswwWseKA/exec'
const form = document.forms['submit-to-google-sheet']
const submitBtn = document.querySelector(".submit")

form.addEventListener('submit', e => {
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    e.preventDefault()

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            form.reset()
            submitBtn.disabled = false
            submitBtn.classList.remove("loading")

            alert("Your message is sent successfully!")
        })
        .catch(error => {
            submitBtn.disabled = false
            submitBtn.classList.remove("loading")

            alert("An error happened, please try again.")
            console.error('Error!', error.message)
        })
})
