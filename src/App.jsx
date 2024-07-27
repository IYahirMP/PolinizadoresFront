import {ThemeProvider } from '@mui/material';
import './App.css'
import Header from './header/Header.jsx'
import Gallery from './gallery/Gallery.jsx';
import { theme } from './AppStyles.jsx';

import { useState } from 'react';

function App() {

  const [page, setPage] = useState('gallery');

  return (
    <ThemeProvider theme={theme}>
        <Header></Header>
        <Gallery/>
    </ThemeProvider>
  )
}

export default App
