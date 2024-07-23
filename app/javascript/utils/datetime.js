const units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
};

export const getRelativeTime = (date, locale = 'en') => {
    const now = new Date();
    const elapsed = date - now;
  
    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units) 
        if (Math.abs(elapsed) > units[u] || u == 'second') { 
            const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
            return rtf.format(Math.round(elapsed/units[u]), u);
        }
}