const chapterJSONURL = "https://vedupraity.github.io/ancientknowledgedatabase/bhagavad-gita/chapters.json"
const textJSONURLTemplate = "https://vedupraity.github.io/ancientknowledgedatabase/bhagavad-gita/chapters/{chapter-id}.json"


$(document).ready(function () {
    let chapterId = fetchQueryParam('chapter') || 1;

    // Render Chapter Title and Summary
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
    }).done(function (response) {
        let chapter = response[chapterId - 1];

        chapterTitleContainer = $("#chapter-title-container");
        chapterTitleTemplate = $("#chapter-title-template").html();

        chapterTitleContainer.html(
            chapterTitleContainer.html()
            +
            Mustache.render(
                chapterTitleTemplate,
                chapter
            )
        )

        chapterSummaryContainer = $("#chapter-summary-container");
        chapterSummaryTemplate = $("#chapter-summary-template").html();

        chapterSummaryContainer.html(
            chapterSummaryContainer.html()
            +
            Mustache.render(
                chapterSummaryTemplate,
                chapter
            )
        )
    })

    // Render all Text Cards for Chapter
    $.ajax({
        url: textJSONURLTemplate.replace("{chapter-id}", chapterId),
        method: "GET",
    }).done(function (response) {
        $.each(response, (_index, text) => {
            textCardContainer = $("#text-card-container");
            textCardTemplate = $("#text-card-template").html();
            
            text.idHindi = convertToHindiNumberal(text.id);
            text.chapterIdHindi = convertToHindiNumberal(text.chapterId);
            text.renderTextTranslation = text.translation.hindi.length || text.translation.english.length;
            text.renderTextMeaning = text.meaning.hindi.length || text.meaning.english.length;

            textCardContainer.html(
                textCardContainer.html()
                +
                Mustache.render(
                    textCardTemplate,
                    text
                )
            )
        })

        hideLoader();
    });
})
