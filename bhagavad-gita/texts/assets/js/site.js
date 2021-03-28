const chapterJSONURL = `${dbUrlRoot}/bhagavad-gita/chapters.json`
const textJSONURLTemplate = `${dbUrlRoot}/bhagavad-gita/chapters/{chapter-id}/page-{page-number}.json`


let init = () => {
    $.ajax({
        url: chapterJSONURL,
        method: "GET",
    }).done(function (response) {
        let chapterId = fetchQueryParam('chapter') || 1;
        let chapterData = response.chapters[chapterId - 1];

        renderChapter(chapterData);
        renderTexts(chapterData);
    })
}

let renderChapter = (chapterData) => {
    let chapterTitleContainer = $("#chapter-title-container");
    let chapterTitleTemplate = $("#chapter-title-template").html();

    chapterTitleContainer.html(
        chapterTitleContainer.html()
        +
        Mustache.render(
            chapterTitleTemplate,
            chapterData
        )
    )

    // let chapterSummaryContainer = $("#chapter-summary-container");
    // let chapterSummaryTemplate = $("#chapter-summary-template").html();

    // chapterSummaryContainer.html(
    //     chapterSummaryContainer.html()
    //     +
    //     Mustache.render(
    //         chapterSummaryTemplate,
    //         chapterData
    //     )
    // )
}

let renderTexts = (chapterData) => {
    let totalPage = chapterData.pagingMeta.total_page;
    let pageNumberQueryParam = Math.floor(fetchQueryParam('page')) || 1
    let pageNumber = pageNumberQueryParam <= totalPage ? pageNumberQueryParam : 1;

    $.ajax({
        url: textJSONURLTemplate.replace("{chapter-id}", chapterData.id).replace("{page-number}", pageNumber),
        method: "GET",
    }).done(function (response) {
        $.each(response, (_index, text) => {
            let textCardContainer = $("#text-card-container");
            let textCardTemplate = $("#text-card-template").html();
            
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

        renderPagination(pageNumber, totalPage);
    });
}

let _generatePageUrl = (page) => {
    return location.pathname + "?" + $.param({chapter: fetchQueryParam("chapter") || 1, page: page});
}

let renderPagination = (pageNumber, totalPage) => {
    let paginationContainer = $(".pagination-container");
    let paginationTemplate = $("#pagination-template").html();

    let pagingData = {
        firstPage: 1,
        lastPage: totalPage,
        currentPage: pageNumber,

        renderPreviousPageButton: pageNumber > 1,
        renderNextPageButton: pageNumber < totalPage,
        renderPreviousPageLink: pageNumber - 1 >= 2,
        renderNextPageLink: totalPage - pageNumber >= 2,
        renderPreviousPageEllipsis: pageNumber - 1 > 2,
        renderNextPageEllipsis: totalPage - pageNumber > 2,

        previousPage: pageNumber > 1 ? pageNumber - 1 : null,
        nextPage: pageNumber < totalPage ? pageNumber + 1 : null
    }

    pagingData.firstPageUrl = _generatePageUrl(pagingData.firstPage);
    pagingData.lastPageUrl = _generatePageUrl(pagingData.lastPage);
    pagingData.previousPageUrl = _generatePageUrl(pagingData.previousPage);
    pagingData.nextPageUrl = _generatePageUrl(pagingData.nextPage);

    paginationContainer.html(
        Mustache.render(
            paginationTemplate,
            data = pagingData
        )
    )

    postContentRender();
}

let postContentRender = () => {
    hideLoader();

    if (window.location.hash && window.location.hash.includes("T")) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(window.location.hash).offset().top
        }, 1000, "swing");
    }
}

$(document).ready(function () {
    init();
})
