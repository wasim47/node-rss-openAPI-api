const axios = require('axios');
require('dotenv').config();

const extractTopics = async (text) => {
    // Stirng validation before go to server
    if (typeof text !== 'string' || text.trim() === '') {
        console.error('Invalid string given: Valid string Expected.');
        return 'Invalid string given: Valid string Expected.';
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo-0125',
            messages: [{ role: 'user', content: `Extract the main topics from the following news article: "${text}".` }],
            max_tokens: 50
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content.trim();

    } catch (error) {

        if (axios.isAxiosError(error)) {
            if (error.response) {

                console.error('Error response data:', error.response.data);
                console.error('Error status code:', error.response.status);
                return error.response.data.error ? error.response.data.error.message : 'An error occurred while processing request.';
            } else if (error.request) {

                console.error('No response received:', error.request);
                return 'No response received from the server. Please check your network connection.';
            } else {

                console.error('Error message:', error.message);
                return 'An error occurred while setting up the request.';
            }
        } else {

            console.error('Unexpected error:', error);
            return 'An unexpected error occurred.';
        }
    }
};

module.exports = extractTopics;