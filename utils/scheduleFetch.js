const schedule = require('node-schedule');

const scheduleFetch = (resultFunc) => {
    //* * * * * ///// For every minuits
    //0 * * * * /////// 
    schedule.scheduleJob('0 * * * *', () => {  // Fetch every minuits
        console.log('Fetching news articles...');
        resultFunc().catch(err => console.error('Error in scheduled fetch:', err));
    });
};

module.exports = scheduleFetch;
