const express = require('express');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017';

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');
    const db = client.db('Wathare'); // Replace 'your_database_name' with your actual database name

    // Root route
    app.get('/', (req, res) => {
        res.send('Welcome to Data Filtering API!');
    });

    // Function to filter data by frequency
    const filterDataByFrequency = async (req, res, frequency) => {
        const { startTime } = req.query;
        const parsedStartTime = moment(startTime, 'YYYY-MM-DDTHH:mm:ssZ', true);

        if (!parsedStartTime.isValid()) {
            return res.status(400).json({ error: 'Invalid startTime format' });
        }

        try {
            let filterHours;
            if (frequency === '1-hour') {
                filterHours = 1;
            } else if (frequency === '8-hour') {
                filterHours = 8;
            } else if (frequency === '24-hour') {
                filterHours = 24;
            }

            // Query MongoDB for data based on frequency
            const filteredData = await db.collection('db') // Replace 'your_collection_name' with your actual collection name
                .find({ timestamp: { $gte: parsedStartTime.toDate() } })
                .toArray();

            // Placeholder logic for filtering data by frequency
            const filteredResult = filteredData.filter(item => {
                const itemTime = moment(item.timestamp);
                return itemTime.isAfter(parsedStartTime) && itemTime.diff(parsedStartTime, 'hours') < filterHours;
            });

            res.json({ filteredData: filteredResult });
        } catch (error) {
            console.error('Error filtering data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // Endpoint to filter data by 1-hour frequency
    app.get('/filter-data/1-hour', (req, res) => filterDataByFrequency(req, res, '1-hour'));

    // Endpoint to filter data by 8-hour frequency
    app.get('/filter-data/8-hour', (req, res) => filterDataByFrequency(req, res, '8-hour'));

    // Endpoint to filter data by 24-hour frequency
    app.get('/filter-data/24-hour', (req, res) => filterDataByFrequency(req, res, '24-hour'));

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
