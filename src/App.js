import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import SearchSummoner from './pages/SearchSummoner.js';
function App() {
  return (
    <ChakraProvider bg="#ECC94B">
      <SearchSummoner />
    </ChakraProvider>
  );
}

export default App;
