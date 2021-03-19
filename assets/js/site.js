const chapterJSONURL = `${dbUrlRoot}/index.json`


$(document).ready(function () {
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
    }).done(function (response) {
        
        $.each(response, (_index, bookData) => {
            bookCardContainer = $("#book-card-container");
            bookCardTemplate = $("#book-card-template").html();

            bookCardContainer.html(
                bookCardContainer.html()
                +
                Mustache.render(
                    bookCardTemplate,
                    bookData
                )
            )
        })

        hideLoader();
    });
})
