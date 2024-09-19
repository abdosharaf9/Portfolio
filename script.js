// Change the current tab
var tabLinks = document.querySelectorAll(".tab-links");
var tabContents = document.querySelectorAll(".tab-contents");

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
