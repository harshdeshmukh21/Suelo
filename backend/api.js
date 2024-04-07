const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csvParser = require('csv-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = process.env.PORT || 5003;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Load CSV file
const data = [];
fs.createReadStream('survey-data.csv')
    .pipe(csvParser())
    .on('data', (row) => {
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file loaded');
    });

// Function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
}

// API endpoint to get class type based on latitude and longitude
app.post('/get_class', (req, res) => {
    const { latitude, longitude } = req.body;

    let closestRow = null;
    let minDistance = Infinity;

    // Find the exact matching coordinate
    for (const row of data) {
        if (parseFloat(row.Latitude) === parseFloat(latitude) && parseFloat(row.Longitude) === parseFloat(longitude)) {
            closestRow = row;
            break;
        }
    }

    // If no exact match, find the closest point
    if (!closestRow) {
        for (const row of data) {
            const dist = calculateDistance(parseFloat(latitude), parseFloat(longitude), parseFloat(row.Latitude), parseFloat(row.Longitude));
            if (dist < minDistance) {
                minDistance = dist;
                closestRow = row;
            }
        }
    }

    if (closestRow) {
        res.json({
            survey_number: closestRow['Survey Number'],
            state_or_ut: closestRow['Name of State / UT'],
            class: closestRow['Class'],
            Owner: closestRow['Owner']
        });
    } else {
        res.status(404).json({ error: 'No data found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});