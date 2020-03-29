export type Weather = "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Atmosphere" | "Clear" | "Clouds";

export type SearchResponseData = {
    city: string,
    country: string,
    weather: {
        main: Weather,
        description: string,
        temp: number
    }
}
