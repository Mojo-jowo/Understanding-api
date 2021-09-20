import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import DataStore from 'nedb';
import fetch from 'node-fetch';



const app = express();

const port = process.env.PORT || 3000;

app.listen(port,  ()=> console.log(`Listening at port ${port}`));

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new DataStore('database.db');
database.loadDatabase();

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if(err) {
            res.end();
            return;
        }
        res.json(data);
})
    
});


app.post("/api", (req, res) => {
    console.log(req.body);
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data)
    res.json( data );
});

app.get('/weather/:latlon', async (req, res) => {
    console.log(req.params);
    const latlon = req.params.latlon.split(",");
    console.log(latlon)
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat)
    console.log(lon);
    const api_key = process.env.API_KEY;
    const api_url =  `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lon}&aqi=yes`;
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);
    
});
