import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import SearchSummoner from './pages/SearchSummoner.js';
import Banner from './pages/Banner.js';
import '@fontsource/nunito'
function App() {
  return (
    <ChakraProvider bg="#ECC94B">
      <Banner />
      <SearchSummoner />
    </ChakraProvider>
  );
}

export default App;
