import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Pages/Layout.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx'
import { theme } from './AppStyles.jsx'
import './main.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import{
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import Gallery from './Pages/Gallery/Gallery.jsx';
import { ThemeProvider } from '@emotion/react';
import SpeciesDetail from './Pages/SpeciesDetail/SpeciesDetail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children:[
    {
      path:"/",
      element:<Gallery/>
    },
    {
      path:"galeria",
      element:<Gallery/>
    },
    {
      path:"galeria/:id",
      element:<SpeciesDetail/>
    },
    {
      path: "login",
      element: <SignIn/>
    },
    {
      path: "signup",
      element: <SignUp/>
    }]
  },
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
)
