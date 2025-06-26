const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_KEY = 'AIzaSyAcAoCT9_ec4pkV2nu6QtwyO8XBrN0vedM';

app.get('/api/places', async (req, res) => {
  const location = '29.976480,31.131302';
  const radius = 1500;
  const type = 'lodging|store';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch from Google Places' });
  }
});

module.exports = app;
