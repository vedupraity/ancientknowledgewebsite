let showLoader = () => {
    $(".loading-overlay").css("display", "flex");
    $("body").addClass("disable-scroll")
}

let hideLoader = () => {
    $(".loading-overlay").css("display", "none");
    $("body").removeClass("disable-scroll")
}

let fetchQueryParam = (key) => {
    let queryParams = new window.URLSearchParams(window.location.search);
    return queryParams.get(key)
}

let convertToHindiNumberal = (num) => {
    let mapper = {
        "0": "०",
        "1": "१",
        "2": "२",
        "3": "३",
        "4": "४",
        "5": "५",
        "6": "६",
        "7": "७",
        "8": "८",
        "9": "९"
    }

    let strNum = String(num);
    let hindiNum = ""

    for (i = 0; i < strNum.length; i++) {
        hindiNum += (mapper[strNum[i]] ? mapper[strNum[i]] : strNum[i]);
    }

    return hindiNum
}