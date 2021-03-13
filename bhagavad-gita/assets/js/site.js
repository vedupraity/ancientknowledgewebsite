const chapterJSONURL = "https://vedupraity.github.io/ancientknowledgedatabase/bhagavad-gita/chapters.json"


$(document).ready(function () {
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
    }).done(function (response) {
        console.log(response);
        
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
