// imports
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.post('/getWeather', async (req, res) => {
	try {
		const { cities } = req.body;
		const weatherData = {};
    
		for (const city of cities) {
			const response = await axios.get(
				`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${city}`
			);
			const temperature = response.data.current.temp_c;
			weatherData[city] = `${temperature}C`;
		}

		res.status(200).json({ weather: weatherData });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: 'An error occurred while fetching weather data' });
	}
});


//server starting
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
