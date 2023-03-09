import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import { PlaceProvider } from './contexts/PlaceProvider'
import { WeatherDataProvider } from './contexts/WeatherDataProvider'
import './index.css'
import i18n from './translation/i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <I18nextProvider i18n={i18n}>
        <PlaceProvider>
            <WeatherDataProvider >
                <App />
            </WeatherDataProvider>
        </PlaceProvider>
    </I18nextProvider>
)
