document.addEventListener("DOMContentLoaded", function () {

    // 1. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;
            const isOpen = question.getAttribute("aria-expanded") === "true";

            faqQuestions.forEach(function (item) {
                item.setAttribute("aria-expanded", "false");

                const itemAnswer = item.nextElementSibling;
                if (itemAnswer) {
                    itemAnswer.hidden = true;
                }

                const icon = item.querySelector("span");
                if (icon) {
                    icon.textContent = "+";
                }
            });

            if (!isOpen && answer) {
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;

                const icon = question.querySelector("span");
                if (icon) {
                    icon.textContent = "-";
                }
            }
        });
    });


    // 2. IMAGE GALLERY LIGHTBOX
    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.querySelector(".lightbox-close");

    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {

            if (lightbox && lightboxImage) {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.hidden = false;
                lightbox.style.display = "flex";
            }
        });
    });

    function closeGallery() {
        if (lightbox) {
            lightbox.hidden = true;
            lightbox.style.display = "none";
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener("click", closeGallery);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeGallery();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeGallery();
        }
    });


    // 3. SERVICE SEARCH, FILTER AND SORT
    const serviceSearch = document.getElementById("serviceSearch");
    const serviceFilter = document.getElementById("serviceFilter");
    const serviceSort = document.getElementById("serviceSort");
    const serviceGrid = document.querySelector(".service-grid");
    const serviceResults = document.getElementById("serviceResults");

    if (serviceGrid && serviceSearch && serviceFilter) {

        const serviceCards = Array.from(
            serviceGrid.querySelectorAll(".service-card")
        );

        function updateServices() {

            const searchText = serviceSearch.value.toLowerCase().trim();
            const selectedCategory = serviceFilter.value.toLowerCase();

            let visibleCount = 0;

            serviceCards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();
                const category = (card.dataset.category || "").toLowerCase();

                const matchesSearch = cardText.includes(searchText);
                const matchesCategory =
                    selectedCategory === "all" ||
                    selectedCategory === "" ||
                    category === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            if (serviceResults) {
                serviceResults.textContent =
                    visibleCount + " service(s) found.";
            }

            if (serviceSort) {
                const sortValue = serviceSort.value.toLowerCase();

                const sortedCards = serviceCards.slice().sort(function (a, b) {
                    const nameA = a.textContent.trim().toLowerCase();
                    const nameB = b.textContent.trim().toLowerCase();

                    if (sortValue.includes("desc") || sortValue.includes("za")) {
                        return nameB.localeCompare(nameA);
                    }

                    return nameA.localeCompare(nameB);
                });

                sortedCards.forEach(function (card) {
                    serviceGrid.appendChild(card);
                });
            }
        }

        serviceSearch.addEventListener("input", updateServices);
        serviceFilter.addEventListener("change", updateServices);

        if (serviceSort) {
            serviceSort.addEventListener("change", updateServices);
        }

        updateServices();
    }


    // 4. INTERACTIVE LEAFLET MAP
    const mapElement = document.getElementById("serviceMap");

    if (mapElement && typeof L !== "undefined") {

        const durbanCoordinates = [-29.8587, 31.0218];

        const map = L.map("serviceMap").setView(
            durbanCoordinates, 11
        );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: '&copy; OpenStreetMap contributors'
            }
        ).addTo(map);

        L.marker(durbanCoordinates)
            .addTo(map)
            .bindPopup("Durban HomeFix Plumbing – Durban Service Area");

        setTimeout(function () {
            map.invalidateSize();
        }, 300);
    }


    // 5. CONTACT AND ENQUIRY FORM VALIDATION
    function handleForm(formId, feedbackId, emailSubject) {

        const form = document.getElementById(formId);
        const feedback = document.getElementById(feedbackId);

        if (!form) {
            return;
        }

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const formData = new FormData(form);
            let message = "";

            formData.forEach(function (value, key) {
                message += key + ": " + value + "\n";
            });

            const emailAddress = "info@durbanhomefixing.co.za";

            const mailtoLink =
                "mailto:" + emailAddress +
                "?subject=" + encodeURIComponent(emailSubject) +
                "&body=" + encodeURIComponent(message);

            if (feedback) {
                feedback.textContent =
                    "Your details have been checked. Your email application will open so you can review and send your message.";
            }

            window.location.href = mailtoLink;
        });
    }

    handleForm(
        "enquiryForm",
        "enquiryFeedback",
        "New Plumbing Service Enquiry"
    );

    handleForm(
        "contactForm",
        "contactFeedback",
        "New Website Contact Message"
    );

});