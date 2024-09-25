// Change header background
window.addEventListener('scroll', function () {
    const header = document.querySelector(".header");
    if (window.scrollY >= 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
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
const projects = document.querySelectorAll(".work")

for (let i = 4; i < projects.length; i++) {
    projects[i].classList.add('hidden');
}

if (projects.length < 5) {
    seeMoreBtn.classList.add("hidden")
}

seeMoreBtn.addEventListener('click', () => {
    const hiddenCards = document.querySelectorAll(".work.hidden")

    for (let i = 0; i < 4 && i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
    }

    if (document.querySelectorAll(".work.hidden").length === 0) {
        seeMoreBtn.classList.add("hidden")
    }
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
