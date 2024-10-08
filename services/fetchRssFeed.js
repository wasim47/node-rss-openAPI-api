const RSSParser = require('rss-parser')
const parser = new RSSParser()
const { handleFetchError } = require('../utils/errorHandler');

const fetchRssFeeds = async (rssUrls) => {
    let newsData = []
    for (let url of rssUrls) {
        try {
            const feed = await parser.parseURL(url)
            feed.items.forEach((item) => {
                newsData.push({
                    title:item.title,
                    description:item.contentSnippet,
                    sourceUrl:item.link,
                    publication_date:item.pubDate,
                    sourceName: feed.title
                })
            })  
        } 
        catch (error) {
            handleFetchError(url, error);
        }         
    }

    return newsData;
};

module.exports = fetchRssFeeds;