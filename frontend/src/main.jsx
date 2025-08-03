import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import router from './routing/router.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider>
  //  {/* <App/> */}
  // {/* </StrictMode>, */}
)
