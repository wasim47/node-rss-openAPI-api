const db = require('../config/connection');

// Insert fetched news data into news_feed table
const saveToDB = (newsFeeds) => {
    const sql = `INSERT INTO news_rss (title, description, publication_date, sourceUrl, sourceName, topics, entry_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Check if newsFeeds is an array
    if (!Array.isArray(newsFeeds) || newsFeeds.length === 0) {
        console.error('Invalid data: Valid array expected');
        return 'Invalid data: Valid array expected';
    }

    const errors = [];

    newsFeeds.forEach((news) => {
        const topicVal = news.topics ? news.topics : '';
        const values = [
            news.title,
            news.description,
            new Date(news.publication_date),
            news.sourceUrl,
            news.sourceName,
            topicVal,
            new Date()
        ];

        db.query(sql, values, (err) => {
            if (err) {
                console.error('Error inserting data into MySQL:', err);
                errors.push(`Error inserting data for title: "${news.title}". Error: ${err.message}`);
            }
        });
    });

    if (errors.length > 0) {
        console.log('Some news data could not be saved to MySQL:', errors);
        return errors; // Return the array of error messages
    } else {
        console.log('All news data saved to MySQL successfully.');
        return 'All news data saved successfully.';
    }
};

module.exports = saveToDB;
