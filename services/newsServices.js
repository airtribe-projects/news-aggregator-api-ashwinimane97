const axios = require('axios');

const fetchNews = async function(category = ['general'], language = 'en') {
    let singleCat = category[0];

    try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                category: singleCat,
                language,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        // Check if the response is valid and contains data
        if (response.status !== 200 || !response.data) {
            throw new Error(`Unexpected API response: ${response.statusText || 'No data received'}`);
        }

        return response.data;
    } catch (error) {
        // Handle specific error types
        if (error.response) {
            // API responded with a status code outside the 2xx range
            console.error('API Error:', error.response.status, error.response.data);
            throw new Error(`News API error: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.message);
            throw new Error('Failed to fetch news due to a network issue.');
        } else {
            // Other errors (e.g., invalid configuration)
            console.error('Error:', error.message);
            throw new Error('An unexpected error occurred while fetching news.');
        }
    }
};

module.exports = {
    fetchNews
};