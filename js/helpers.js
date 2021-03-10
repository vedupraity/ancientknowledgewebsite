const availableSiteLanguages = ["hindi", "english"];
const defaultSiteLanguage = availableSiteLanguages[0];

function getQueryParams() {
    return new window.URLSearchParams(window.location.search);
}

function setSiteLanguage(language) {
    localStorage.siteLanguage = language;
    location.reload();
}

function getSiteLanguage() {
    const siteLanguage = localStorage.siteLanguage || defaultSiteLanguage;
    return availableSiteLanguages.includes(siteLanguage) ? siteLanguage : defaultSiteLanguage;
}
