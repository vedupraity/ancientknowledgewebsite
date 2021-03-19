const chapterJSONURL = `${dbUrlRoot}/bhagavad-gita/chapters.json`


$(document).ready(function () {
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
    }).done(function (response) {
        
        $.each(response, (_index, chapter) => {
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

        hideLoader();
    });
})
