import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import SearchSummoner from './components/SearchSummoner.js';
import Banner from './components/Banner.js';
import DisplaySummonerInfo from './components/DisplaySummonerInfo.js';
import '@fontsource/nunito'
import { useState } from 'react';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [summonerFound, setSummonerFound] = useState(null);
  const [summonerPuuid, setSummonerPuuid] = useState("");
  const [summonerId, setSummonerId] = useState("");

  const loadingStart = () => {
    setIsLoading(true);
  };
  const loadingEnd = () => {
    setIsLoading(false);
  };

  const successfulTrue = () => {
    setIsSuccessful(true);
  };
  const successfulFalse = () => {
    setIsSuccessful(false);
  };

  const handleSearchResult = (pId,sId) => {
    setSummonerFound(true);
    setSummonerPuuid(pId);
    setSummonerId(sId);
  };
  return (
    <ChakraProvider bg="#ECC94B">
      <Banner />
      <SearchSummoner 
        handleSearchResult={handleSearchResult}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
        loadingStart={loadingStart}
        loadingEnd={loadingEnd}
        successfulFalse={successfulFalse}
        successfulTrue={successfulTrue}
        />
      {summonerFound && summonerPuuid && summonerId &&
      <DisplaySummonerInfo 
        puuid={summonerPuuid} 
        summonerId={summonerId}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
        loadingStart={loadingStart}
        loadingEnd={loadingEnd}
        successfulFalse={successfulFalse}
        successfulTrue={successfulTrue}
        />}
    </ChakraProvider>
  );
}

export default App;
