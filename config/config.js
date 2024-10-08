const fs = require('fs');

const loadConfig = () => {
    const configData = fs.readFileSync('data/config.json', 'utf8');
    return JSON.parse(configData);
};

module.exports = { loadConfig };
