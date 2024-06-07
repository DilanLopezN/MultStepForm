import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalProvider } from './context/GlobalContext.tsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalProvider>
          <App />
      </GlobalProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
