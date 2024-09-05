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
  const [summonerInfo, setSummonerInfo] = useState({
    found: false,
    puuid: "",
    summonerId: "",
    soloqueue: "",
    flexqueue: "",
    masteries: []
  });

  const loadingTrue = () => setIsLoading(true);
  const loadingFalse = () => setIsLoading(false);
  const successfulTrue = () => setIsSuccessful(true);
  const successfulFalse = () => setIsSuccessful(false);
  const summonerSoloqueue = (rank) => {
    setSummonerInfo(prevState => ({
      ...prevState,
      soloqueue: rank
    }));
  };
  const summonerFlexqueue = (rank) => {
    setSummonerInfo(prevState => ({
      ...prevState,
      flexqueue: rank
    }));
  };
  const summonerNotFound = () => {
    setSummonerInfo(prevState => ({
    found: false,
    puuid: "",
    summonerId: "",
    soloqueue: "",
    flexqueue: "",
    masteries: []
    }));
  };
  const summonerMasteries = (masteriesArray) => {
    setSummonerInfo(prevState => ({
      ...prevState,
      masteries: masteriesArray
    }));
  };
  const summonerMatches = (matchesArray) => {
    setSummonerInfo(prevState => ({
      ...prevState,
      matches: matchesArray
    }));
  };
  const handleSearchResult = (pId, sId) => {
    setSummonerInfo({
      found: true,
      puuid: pId,
      summonerId: sId
    });
  };
  return (
    <ChakraProvider>
      <Banner />
      <SearchSummoner 
        handleSearchResult={handleSearchResult}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
        loadingTrue={loadingTrue}
        loadingFalse={loadingFalse}
        successfulTrue={successfulTrue}
        successfulFalse={successfulFalse}
        summonerNotFound={summonerNotFound}
        summonerSoloqueue={summonerSoloqueue}
        summonerFlexqueue={summonerFlexqueue}
        summonerMasteries={summonerMasteries}
        summonerMatches={summonerMatches}
        />
      {summonerInfo.found &&(
      <DisplaySummonerInfo
        summonerInfo={summonerInfo}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
      />
    )}
    </ChakraProvider>
  );
}

export default App;
