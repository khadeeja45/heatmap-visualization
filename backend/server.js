const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    const earthquakeData = response.data.features.map(feature => {
      return [
        feature.geometry.coordinates[1], // latitude
        feature.geometry.coordinates[0], // longitude
        feature.properties.mag // magnitude
      ];
    });
    res.json(earthquakeData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
