document.getElementById('advanced-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const allWords = document.getElementById('all-words').value;
    const exactPhrase = document.getElementById('exact-phrase').value;
    const anyWords = document.getElementById('any-words').value;
    const noneWords = document.getElementById('none-words').value;
    const numbersRangeLow = document.getElementById('numbers-range-low').value;
    const numbersRangeHigh = document.getElementById('numbers-range-high').value;
    const language = document.getElementById('language').value;
    const region = document.getElementById('region').value;
    const lastUpdate = document.getElementById('last-update').value;
    const siteDomain = document.getElementById('site-domain').value;
    const termsAppearing = document.getElementById('terms-appearing').value;
    const safeSearch = document.getElementById('safe-search').value;
    const fileType = document.getElementById('file-type').value;
    const usageRights = document.getElementById('usage-rights').value;

    let query = '';
    let params = [];

    if (allWords) {
        query += allWords.split(' ').map(word => `+${word}`).join(' ');
    }
    if (exactPhrase) {
        query += ` "${exactPhrase}"`;
    }
    if (anyWords) {
        query += ` (${anyWords.split(' ').join(' OR ')})`;
    }
    if (noneWords) {
        query += ` -${noneWords.split(' ').join(' -')}`;
    }
    if (numbersRangeLow && numbersRangeHigh) {
        query += ` ${numbersRangeLow}..${numbersRangeHigh}`;
    }

    if (language) {
        params.push(`lr=${language}`);
    }
    if (region) {
        params.push(`cr=${region}`);
    }
    if (lastUpdate) {
        params.push(`as_qdr=${lastUpdate}`);
    }
    if (siteDomain) {
        params.push(`as_sitesearch=${siteDomain}`);
    }
    if (termsAppearing) {
        params.push(`as_occt=${termsAppearing}`);
    }
    if (safeSearch) {
        params.push(`safe=${safeSearch}`);
    }
    if (fileType) {
        params.push(`as_filetype=${fileType}`);
    }
    if (usageRights) {
        params.push(`as_rights=${usageRights}`);
    }

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&${params.join('&')}`;
    window.location.href = url;
});