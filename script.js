function openContact() {
    document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
    document.getElementById("contactModal").style.display = "none";
}

window.onclick = function(event) {

    const modal = document.getElementById("contactModal");

    if(event.target === modal){
        closeContact();
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const subject = "MainzIQ Website Contact";

        window.location.href =
            `mailto:support@mainziq.com?subject=${encodeURIComponent(subject)}`;

    });
});
