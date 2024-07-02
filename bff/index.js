const express = require('express');
const cors = require('cors');
const API_KEY = 'AIzaSyAcJcuoBCPEwopHfavTku2sA7LwwhPxl4o';
const favorites = [];

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next();
});

app.get('/search', async (req, res) => {
    const query = req.query.query;
    console.log(`Searching for: ${query}`);
    try {
        const response = await import('node-fetch');
        const fetch = response.default;
        const apiResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`);
        const data = await apiResponse.json();
        console.log('API response:', data);
        if (data.items) {
            res.json(data.items.map(item => ({
                videoId: item.id.videoId,
                title: item.snippet.title
            })));
        } else {
            console.error('Invalid response from YouTube API', data);
            res.status(500).json({ error: data.error ? data.error.message : 'Invalid response from YouTube API' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post('/favorites', (req, res) => {
    const { videoId, title } = req.body;
    const index = favorites.findIndex(fav => fav.videoId === videoId);
    if (index === -1) {
        favorites.push({ videoId, title });
    } else {
        favorites.splice(index, 1);
    }
    res.sendStatus(200);
});

app.get('/favoritos', (req, res) => {
    res.json(favorites);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`BFF running on port ${PORT}`);
});
