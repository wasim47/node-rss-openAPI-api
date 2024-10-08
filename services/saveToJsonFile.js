const fs = require('fs');
const jsonFile = './data/news.json';

const saveToFile = (newsArticles) => {
    // Check provide parameter is array before trigger file generate event
    if (!Array.isArray(newsArticles)) {
        console.error('Invalid input: Expected an array of news articles.');
        return 'Invalid input: Expected an array of news articles.';
    }

    // Convert news articles to JSON
    const jsonData = JSON.stringify(newsArticles, null, 2);

    fs.writeFile(jsonFile, jsonData, (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
            return 'Error saving data to file. Please try again later.';
        } else {
            console.log('News data saved to JSON file.');
            return 'News data saved successfully.';
        }
    });
};

module.exports = saveToFile;
