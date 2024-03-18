import './App.css';

import Box from '@mui/material/Box'
import Carousel from './components/Carousel';
import NavBar from './components/NavBar';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar></NavBar>
      <Carousel></Carousel>
    </Box>
  );
}

export default App;
