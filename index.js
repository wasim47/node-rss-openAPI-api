const fetchFeed = require('./services/fetchRssFeed');
const saveToJson = require('./services/saveToJsonFile');
const saveToDB = require('./services/saveToDB');
const extractTopics = require('./services/topicExtraction');
const schedule = require('./utils/scheduleFetch');
const { loadConfig } = require('./config/config');
const filterData = require('./utils//filterData');
const displayNews = require('./utils/display');

const resultFunc = async () => {
    try {
        const config = loadConfig();
        const newsFeed = await fetchFeed(config.rssFeeds);    

        // Extract topics for each news using open AI api
        for (let news of newsFeed) {
            news.topics = await extractTopics(news.description);
        }

         // Filter news according to kewywords and publication date
         const filteredNews = filterData(newsFeed, ['Google', ' Human Life'], '2024-10-01', '2024-10-30');
        
         // Display filtered data
         displayNews(filteredNews);
        
        await saveToJson(newsFeed) // Fetched Data save to json file
        await saveToDB(newsFeed)  // Fetched Data save to mysql db 
        
    } catch (err) {
        console.error('Error in fetchAndProcessNews:', err);
    }
}

// resultFunc().catch(err => console.error('Error in main:', err));

const app = async () => {
    await resultFunc(); // Fetch immediately   
   schedule(resultFunc); // Scheduled for news fetching
};

// Run the main function when the file is executed directly
if (require.main === module) {
    app().catch(err => console.error('Error in main execution:', err));
}

module.exports = resultFunc;