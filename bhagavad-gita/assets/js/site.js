const chapterJSONURL = `${dbUrlRoot}/bhagavad-gita/chapters.json`


let init = () => {
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
    }).done(function (response) {
        renderIntroduction(response.introduction);
        renderChapterCards(response.chapters);
    });
}

let renderIntroduction = (introductionContent) => {
    introductionContainer = $("#introduction-container");
    introductionTemplate = $("#introduction-template").html();

    introductionContainer.html(
        Mustache.render(
            introductionTemplate,
            {"introduction": introductionContent}
        )
    )
}

let renderChapterCards = (chapterContent) => {
    $.each(chapterContent, (_index, chapter) => {
        chapterCardContainer = $("#chapter-card-container");
        chapterCardTemplate = $("#chapter-card-template").html();

        chapterCardContainer.html(
            chapterCardContainer.html()
            +
            Mustache.render(
                chapterCardTemplate,
                chapter
            )
        )
    })

    postContentRender();
}

let postContentRender = () => {
    hideLoader();
}

$(document).ready(function () {
    init();
})
