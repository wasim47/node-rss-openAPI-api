const filterData = (newsFeeds, keywords, startDate, endDate) => {
    return newsFeeds.filter(news => {
        const date = new Date(news.publication_date);

        const matchesKeywords = keywords.some(keyword => 
            news.title.includes(keyword) || news.description.includes(keyword)
        );
        const withinDateRange = (!startDate || date >= new Date(startDate)) && 
                                (!endDate || date <= new Date(endDate));
        return matchesKeywords || withinDateRange;

    });
};

module.exports = filterData;
