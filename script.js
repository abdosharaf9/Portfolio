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
const projects = document.querySelectorAll(".work")
const seeMoreBtn = document.querySelector(".see-more")

const breakpoints = {
    mobile: { width: 470, items: 1 },
    tablet: { width: 768, items: 2 },
    medium: { width: 1200, items: 3 }
};

let itemsToShow = getItemsToShow();
let visibleCount = itemsToShow;

window.addEventListener('resize', () => {
    itemsToShow = getItemsToShow();
    closeMenu();
})

projects.forEach((project, index) => {
    if (index >= itemsToShow) {
        project.classList.add('hidden');
    }
});

updateSeeMoreButtonVisibility();

seeMoreBtn.addEventListener('click', () => {
    const hiddenCards = document.querySelectorAll(".work.hidden");
    const newAddedNumber = itemsToShow - (visibleCount % itemsToShow);
    
    for (let i = 0; i < newAddedNumber && i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
    }
    
    visibleCount += newAddedNumber;
    updateSeeMoreButtonVisibility();
})

function getItemsToShow() {
    return Object.values(breakpoints).find(b => window.innerWidth <= b.width)?.items || 4;
}

function updateSeeMoreButtonVisibility() {
    seeMoreBtn.classList.toggle("hidden", visibleCount >= projects.length);
}


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
