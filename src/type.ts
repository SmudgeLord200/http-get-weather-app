export interface WeatherCondition {
    text: string;
    icon: string;
}

export interface CurrentWeather {
    temp_c: number;
    condition: WeatherCondition;
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    last_updated: string;
}

export interface Location {
    name: string;
    country: string;
    localtime: string;
}

export interface WeatherData {
    current: CurrentWeather;
    location: Location;
}