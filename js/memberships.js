document.addEventListener("DOMContentLoaded", function() {

    function toggleParagraphs() {
        const mediaQuery = window.matchMedia("(max-width: 480px)");

        function handleClick(event) {
            if (mediaQuery.matches) {
                const featuresList = event.currentTarget.parentNode.querySelectorAll("p");

                featuresList.forEach(function(feature) {
                    feature.style.display = (feature.style.display === "none" || feature.style.display === "") ? "block" : "none";
                });
            }
        }

        const headings = document.querySelectorAll(".membership-features h2, .membership-features h3");
        headings.forEach(function(heading) {
            heading.addEventListener("click", handleClick);
        });

        const firstMembershipFeatures = document.querySelector(".membership-features.show-by-default");
        if (firstMembershipFeatures) {
            const defaultParagraphs = firstMembershipFeatures.querySelectorAll("p");
            defaultParagraphs.forEach(function(paragraph) {
                paragraph.style.display = "block";
            });
        }
    }

    toggleParagraphs();

    window.addEventListener("resize", function() {
        toggleParagraphs();
    });
});
