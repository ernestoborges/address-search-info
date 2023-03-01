import { createContext, useState } from "react";

interface Props {
    children: React.ReactNode
}

interface WeatherApiResponse {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: string;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        }
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    }
}

interface ValuesProps {
    weatherData: WeatherApiResponse | null
    setWeatherData: React.Dispatch<React.SetStateAction<WeatherApiResponse>> | React.Dispatch<React.SetStateAction<null>>
}

const WeatherDataContext = createContext<ValuesProps | null>(null);

export function WeatherDataProvider({ children }: Props) {

    const [weatherData, setWeatherData] = useState(null);

    return (
        <WeatherDataContext.Provider value={{weatherData, setWeatherData}}>
            {children}
        </WeatherDataContext.Provider>
    )
}

export default WeatherDataContext;