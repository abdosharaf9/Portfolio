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

    if(document.querySelectorAll(".work.hidden").length === 0) {
        seeMoreBtn.classList.add("hidden")
    }
})


// Form to sheets code
const scriptURL = 'https://script.google.com/macros/s/AKfycbzZz3rH5vkKRRkVD8pMLx0tCRxapcnbgILoNxwNHtUiNRzbaJDaOg0fBGIWbFswwWseKA/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Success!"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})
