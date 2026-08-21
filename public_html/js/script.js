// Durban HomeFix Plumbing - Form Functionality
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Thank you! Your enquiry has been submitted. We will contact you shortly.");

        this.reset();
    });
}


const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Thank you! Your message has been sent. We will contact you shortly.");

        this.reset();
    });
}