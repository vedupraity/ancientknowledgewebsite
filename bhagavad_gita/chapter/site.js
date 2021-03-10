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

    let queryParamChapterId = Math.floor(Number(getQueryParams().get('chapter'))) || 1;
    let chapterId = queryParamChapterId < totalChapters ? queryParamChapterId : 1;

    $.ajax({
        url: chapterJSONURLTemplate.replace("{chapterId}", chapterId),
        method: "GET",
        async: false
    }).done(function (response) {
        // Render chapter title translation
        let chapterTitleContainer = $("#chapter-title-container");
        let chapterTitleTemplate = $("#chapter-title-template").html();
        response.translation = response.translation[getSiteLanguage()];

        chapterTitleContainer.html(
            Mustache.render(
                chapterTitleTemplate,
                response,
            )
        );
            
        // Render chapter summary
        let chapterSummaryContainer = $("#chapter-summary-container");
        let chapterSummaryTemplate = $("#chapter-summary-template").html();
        response.summary = response.summary[getSiteLanguage()];
        
        chapterSummaryContainer.html(
            Mustache.render(
                chapterSummaryTemplate,
                response,
            )
        );
    });
})
/* Site script end */
