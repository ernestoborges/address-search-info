import { Handler } from '@netlify/functions'
import axios from "axios";

export const handler: Handler = async (event, context) => {

  const lat = event.queryStringParameters?.lat;
  const lng = event.queryStringParameters?.lng;

  const KEY = process.env.VITE_REACT_APP_WEATHERAPI_API_KEY
  const weatherHTTP = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${lat},${lng}&days=3&aqi=yes&alerts=no`

  try {
    const { data } = await axios.get(weatherHTTP);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { status, statusText, headers, data} = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}
