use reqwest::Error;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone,Serialize)]
pub struct Weather {
    pub temperature: f32,
    pub temperature_unit: String,
    pub windspeed: f32,
    pub windspeed_unit: String,
    pub winddirection: i32,
    pub is_day: bool,
    pub time: String,
    pub city: String,
    pub elevation: f32,
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
struct WeatherResponse {
    current_weather: CurrentWeather,
    current_weather_units: CurrentWeatherUnits,
    elevation: f32,
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
struct CurrentWeather {
    interval: i32,
    is_day: i8,
    temperature: f32,
    time: String,
    winddirection: i32,
    windspeed: f32,
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
struct CurrentWeatherUnits {
    interval: String,
    is_day: String,
    temperature: String,
    time: String,
    winddirection: String,
    windspeed: String,
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
struct Coordinates {
    results: Vec<Results>,
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
struct Results {
    latitude: f64,
    longitude: f64,
}

pub async fn get_weather(city: &str) -> Result<Weather, Error> {
    let geo_url = format!(
        "https://geocoding-api.open-meteo.com/v1/search?name={}&count=1",
        city
    );
    
    let coordinates: Coordinates = reqwest::get(&geo_url).await?.json().await?;
    let first_result = &coordinates.results[0];
    let lat = first_result.latitude;
    let lon = first_result.longitude;
    
    let url = format!(
        "https://api.open-meteo.com/v1/forecast?latitude={}&longitude={}&current_weather=true",
        lat, lon
    );
    
    let data: WeatherResponse = reqwest::get(&url).await?.json().await?;
    
    let weather = Weather {
        temperature: data.current_weather.temperature,
        temperature_unit: data.current_weather_units.temperature,
        windspeed: data.current_weather.windspeed,
        windspeed_unit: data.current_weather_units.windspeed,
        winddirection: data.current_weather.winddirection,
        is_day: data.current_weather.is_day == 1,
        time: data.current_weather.time,
        city: city.to_string(),
        elevation: data.elevation,
    };
    
    Ok(weather)
}
