/* site constants start */
const totalChapters = 18;
const chapterJSONURLTemplate = "https://vedupraity.github.io/ancientknowledgedatabase/bhagavad_gita/chapters/{chapterId}.json"
/* site constants end */


/* helpers start */
function translateSite() {
    const siteLanguage = getSiteLanguage();

    // Set chapters label
    $(".chapters-label").text(siteLanguage === "hindi" ? "अध्याय" : "Chapters");
}
/* helpers end */


/* Site script start */
$(document).ready(function () {
    translateSite();

    for (chapterId = 1; chapterId <= totalChapters; chapterId++) {
        $.ajax({
            url: chapterJSONURLTemplate.replace("{chapterId}", chapterId),
            method: "GET",
            async: false
        }).done(function (response) {
            let chapterCardsContainer = $("#chapter-cards-container");
            let chapterCardTemplate = $("#chapter-card-template").html();
            response.translation = response.translation[getSiteLanguage()];

            let rendered = Mustache.render(
                chapterCardTemplate,
                response,
            );
            chapterCardsContainer.html(chapterCardsContainer.html() + rendered);
        });
    }
})
/* Site script end */
