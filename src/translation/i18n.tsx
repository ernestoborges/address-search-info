import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            autocomplete: {
                placeholder: "Search location here..."
            },
            sun_moon_clock: {
                moon_phase: {
                    new_moon: "New Moon",
                    waxing_crescent: "Waxing Crescent",
                    first_quarter: "First Quarter",
                    waxing_gibbous: "Waxing Gibbous",
                    full_moon: "Full Moon",
                    waning_gibbous: "Waning Gibbous",
                    third_quarter: "Third Quarter",
                    waning_crescent: "Wanning Crescent"
                }
            },
            summarized_info: {
                condition: {
                    clear: "Clear",
                    sunny: "Sunny",
                    partly_cloudy: "Partly cloudy",
                    cloudy: "Cloudy",
                    overcast: "Overcast",
                    mist: "Mist",
                    patchy_rain_possible: "Patchy rain possible",
                    patchy_sleet_possible: "Patchy sleet possible",
                    patchy_freezing_drizzle_possible: "Patchy freezing drizzle possible",
                    thundery_outbreaks_possible: "Thundery outbreaks possible",
                    blowing_snow: "Blowing snow",
                    blizzard: "Blizzard",
                    fog: "Fog",
                    freezing_fog: "Freezing fog",
                    patchy_light_drizzle: "Patchy light drizzle",
                    light_drizzle: "Light drizzle",
                    freezing_drizzle: "Freezing drizzle",
                    heavy_freezing_drizzle: "Heavy freezing drizzle",
                    patchy_light_rain: "Patchy light rain",
                    light_rain: "Light rain",
                    moderate_rain_at_times: "Moderate rain at times",
                    moderate_rain: "Moderate rain",
                    heavy_rain_at_times: "Heavy rain at times",
                    heavy_rain: "Heavy rain",
                    light_freezing_rain: "Light freezing rain",
                    moderate_or_heavy_freezing_rain: "Moderate or heavy freezing rain",
                    light_sleet: "Light sleet",
                    moderate_or_heavy_sleet: "Moderate or heavy sleet",
                    patchy_light_snow: "Patchy light snow",
                    light_snow: "Light snow",
                    patchy_moderate_snow: "Patchy moderate snow",
                    moderate_snow: "Moderate snow",
                    patchy_heavy_snow: "Patchy heavy snow",
                    heavy_snow: "Heavy snow",
                    ice_pellets: "Ice pellets",
                    light_rain_shower: "Light rain shower",
                    moderate_or_heavy_rain_shower: "Moderate or heavy rain shower",
                    torrential_rain_shower: "Torrential rain shower",
                    light_sleet_showers: "Light sleet showers",
                    moderate_or_heavy_sleet_showers: "Moderate or heavy sleet showers",
                    light_snow_showers: "Light snow showers",
                    moderate_or_heavy_snow_showers: "Moderate or heavy snow showers",
                    light_showers_of_ice_pellets: "Light showers of ice pellets",
                    moderate_or_heavy_showers_of_ice_pellets: "Moderate or heavy showers of ice pellets",
                    patchy_light_rain_with_thunder: "Patchy light rain with thunder",
                    moderate_or_heavy_rain_with_thunder: "Moderate or heavy rain with thunder",
                    patchy_light_snow_with_thunder: "Patchy light snow with thunder",
                    moderate_or_heavy_snow_with_thunder: "Moderate or heavy snow with thunder"
                }
            },
            wind_info: {
                title: "Wind",
                speed: "Speed",
                direction: "Direction",
                degree: "Degree",
                direction_subtitle: {
                    n: "N",
                    nne: "NNE",
                    ne: "NE",
                    ene: "ENE",
                    e: "E",
                    ese: "ESE",
                    se: "SE",
                    sse: "SSE",
                    s: "S",
                    ssw: "SSW",
                    sw: "SW",
                    wsw: "WSW",
                    w: "W",
                    wnw: "WNW",
                    nw: "NW",
                    nnw: "NNW"
                }
            },
            week_forecast: {
                title: "3 Day Forecast",
                high: "High",
                low: "Low",
                weekday: {
                    mon: "Mon",
                    tue: "Tue",
                    wed: "Wed",
                    thu: "Thu",
                    fri: "Fri",
                    sat: "Sat",
                    sun: "Sun"
                }
            },
            day_forecast: {
                title: "24 hours forecast"
            }
        }
    },
    pt: {
        translation: {
            autocomplete: {
                placeholder: "Busque um local aqui..."
            },
            sun_moon_clock: {
                moon_phase: {
                    new_moon: "Lua Nova",
                    waxing_crescent: "Crescente",
                    first_quarter: "Quarto Crescente",
                    waxing_gibbous: "Gibosa Crescente",
                    full_moon: "Lua Cheia",
                    waning_gibbous: "Gibosa Minguate",
                    third_quarter: "Quarto Minguante",
                    waning_crescent: "Minguante"
                }
            },
            summarized_info: {
                condition: {
                    clear: "Limpo",
                    sunny: "Ensolarado",
                    partly_cloudy: "Parcialmente Nublado",
                    cloudy: "Nublado",
                    overcast: "Nublado",
                    mist: "Neblina",
                    patchy_rain_possible: "Chuva leve",
                    patchy_sleet_possible: "Chuva congelante",
                    patchy_freezing_drizzle_possible: "Chuva congelante",
                    thundery_outbreaks_possible: "Tempestades com chuva leve",
                    blowing_snow: "Neve e chuva",
                    blizzard: "Neve e chuva congelante",
                    fog: "Neblina",
                    freezing_fog: "Neblina",
                    patchy_light_drizzle: "Chuva leve",
                    light_drizzle: "Chuva leve",
                    freezing_drizzle: "Chuva congelante",
                    heavy_freezing_drizzle: "Chuva congelante",
                    patchy_light_rain: "Chuvisco",
                    light_rain: "Chuvisco",
                    moderate_rain_at_times: "Chuva",
                    moderate_rain: "Chuva",
                    heavy_rain_at_times: "Chuva",
                    heavy_rain: "Chuva pesada",
                    light_freezing_rain: "Chuva congelante",
                    moderate_or_heavy_freezing_rain: "Chuva congelante",
                    light_sleet: "Neve",
                    moderate_or_heavy_sleet: "Neve",
                    patchy_light_snow: "Neve",
                    light_snow: "Neve",
                    patchy_moderate_snow: "Neve",
                    moderate_snow: "Neve",
                    patchy_heavy_snow: "Neve",
                    heavy_snow: "Neve",
                    ice_pellets: "Granizo",
                    light_rain_shower: "Chuva leve",
                    moderate_or_heavy_rain_shower: "Chuva",
                    torrential_rain_shower: "Chuva pesada",
                    light_sleet_showers: "Chuva congelante",
                    moderate_or_heavy_sleet_showers: "Chuva congelante",
                    light_snow_showers: "Neve",
                    moderate_or_heavy_snow_showers: "Neve",
                    light_showers_of_ice_pellets: "Chuva com granizo",
                    moderate_or_heavy_showers_of_ice_pellets: "Chuva com granizo",
                    patchy_light_rain_with_thunder: "Tempestades com chuva",
                    moderate_or_heavy_rain_with_thunder: "Tempestades",
                    patchy_light_snow_with_thunder: "Tempestades",
                    moderate_or_heavy_snow_with_thunder: "Neve"
                }
            },
            wind_info: {
                title: "Vento",
                speed: "Velocidade",
                direction: "Direção",
                degree: "Grau",
                direction_subtitle: {
                    n: "N",
                    nne: "NNE",
                    ne: "NE",
                    ene: "ENE",
                    e: "L",
                    ese: "ESE",
                    se: "SE",
                    sse: "SSE",
                    s: "S",
                    ssw: "SSO",
                    sw: "SO",
                    wsw: "OSO",
                    w: "O",
                    wnw: "ONO",
                    nw: "NO",
                    nnw: "NNO"
                }
            },
            week_forecast: {
                title: "Previsão para 3 dias",
                high: "Max",
                low: "Min",
                weekday: {
                    mon: "Seg",
                    tue: "Ter",
                    wed: "Qua",
                    thu: "Qui",
                    fri: "Sex",
                    sat: "Sab",
                    sun: "Dom"
                }
            },
            day_forecast: {
                title: "Previsão para 24 horas"
            }
        }
    }
};

function getSavedLanguage(){
    const savedLanguage = localStorage.getItem("language");
    if(savedLanguage){
        return savedLanguage
    } else {
        return null
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        supportedLngs: ["en", "pt"],
        lng: getSavedLanguage() || ( navigator.language === "pt" ? navigator.language : "en" )
    });

export default i18n;