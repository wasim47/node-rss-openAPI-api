const handleFetchError = (url, error) => {
        
    if (error.response) {
        // Request was made and server also sent response with status code
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
    } else if (error.request) {
        // Here Reqeust is ok but no response send
        console.error('Error request:', error.request);
    } else {
        console.error(`Error fetching from ${url}: ${error.message}`);
    }

};

module.exports = { handleFetchError };
