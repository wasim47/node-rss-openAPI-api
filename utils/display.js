const displayNews = (newsFeeds) => {
    if (newsFeeds.length === 0) {
        console.log('No articles found matching the criteria.');
        return;
    }

    newsFeeds.forEach(news => {
        console.log(`Title: ${news.title}`);
        console.log(`Description: ${news.description}`);
        console.log(`Link: ${news.sourceUrl}`);
        console.log('---');
    });
};

module.exports = displayNews;
