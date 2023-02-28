import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {PlaceProvider} from './contexts/PlaceProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <PlaceProvider>
        <App />
    </PlaceProvider>
)
