import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CraftsContextProvider } from './context/CraftsContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<AuthContextProvider>
			<CraftsContextProvider>
				<App />
			</CraftsContextProvider>
		</AuthContextProvider>
  </React.StrictMode>,
);