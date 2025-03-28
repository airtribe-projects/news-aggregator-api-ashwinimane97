const { fetchNews } = require("../services/newsServices");
const userSchema = require('../model/userModel');

const getNews = async function(req, res) {
    const { email } = req.user;

    try {
        // Fetch user preferences
        const userPreferences = await userSchema.findOne({ email }).select("preferences");

        // Handle case where userPreferences or preferences are null/undefined
        if (!userPreferences || !userPreferences.preferences) {
            return res.status(400).json({ message: "User preferences not found" });
        }

        // Fetch news data
        const news = await fetchNews(userPreferences.preferences, "en");
        return res.status(200).json({
            message: `Successfully fetched news for category ${userPreferences.preferences}`,
            news
        });

    } catch (err) {
        // Handle server errors
        return res.status(500).json({ message: "Server experiencing issues. Try again later" });
    }
};

module.exports = {
    getNews
}