

        

    if('geolocation' in navigator) {
        console.log("geolocation available");

        navigator.geolocation.getCurrentPosition( async position => {
            try {
                console.log(position)
                lat = position.coords.latitude
                document.getElementById('latitude').textContent = lat;
                lon = position.coords.longitude;
                document.getElementById("longitude").textContent = lon; 
                const api_url =  `weather/${lat},${lon}`;
                const response = await fetch(api_url);
                const json = await response.json();

                const weather = json.current;

                const temp = document.getElementById('temp');
                temp.textContent = weather.temp_c;

                const summary = document.getElementById('summary');
                summary.textContent = weather.condition.text.toLowerCase();

                const aqi = document.getElementById('co');
                aqi.textContent = weather['air_quality'].co;
                

                const data = { lat, lon, weather };
                const options = {
                    method: 'Post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                const db_response = await fetch('/api', options)
                const db_json = await db_response.json();
                console.log(db_json);

        

            } catch (error) {
                
            }
            


        });

    } else {
        console.log("geolocation not available")
    }