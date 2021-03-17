const chapterJSONURL = `${dbUrlRoot}/bhagavad-gita/chapters.json`
const textJSONURLTemplate = `${dbUrlRoot}/bhagavad-gita/chapters/{chapter-id}.json`


let getSiteLanguage = () => {
    if (!localStorage.siteLanguage) {
        localStorage.siteLanguage = "all";
    }
    return localStorage.siteLanguage;
}


let setSiteLanguage = (language) => {

    localStorage.siteLanguage = language;
    
    if (language === "hindi") {
        $(".english-content").addClass("is-hidden");
        $(".hindi-content").removeClass("is-hidden");
    } else if (language === "english") {
        $(".hindi-content").addClass("is-hidden");
        $(".english-content").removeClass("is-hidden");
    } else {
        $(".hindi-content").removeClass("is-hidden");
        $(".english-content").removeClass("is-hidden");
    }

    $(`.lang-switch-btn[data-language='${language}']`).addClass("is-link");
}


$(document).ready(function () {
    
    let chapterId = fetchQueryParam('chapter') || 1;

    $(".lang-switch-btn").on("click", (e) => {
        let targetElement = $(e.target);
        setSiteLanguage(targetElement.attr("data-language"));
        $(".lang-switch-btn").removeClass("is-link");
        targetElement.addClass("is-link");
    });


    // Render Chapter Title and Summary
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
        async: false,
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
        async: false,
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
    });

    setSiteLanguage(getSiteLanguage());

    hideLoader();
})
