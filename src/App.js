import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import SearchSummoner from './components/SearchSummoner.js';
import Banner from './components/Banner.js';
import DisplaySummonerInfo from './components/DisplaySummonerInfo.js';
import '@fontsource/nunito'
import { useState } from 'react';
function App() {
  const [summonerFound, setSummonerFound] = useState(null);
  const [summonerPuuid, setSummonerPuuid] = useState("");
  const [summonerId, setSummonerId] = useState("");

  const handleSearchResult = (pId,sId) => {
    setSummonerFound(true);
    setSummonerPuuid(pId);
    setSummonerId(sId);
  };
  return (
    <ChakraProvider bg="#ECC94B">
      <Banner />
      <SearchSummoner handleSearchResult={handleSearchResult}/>
      {summonerFound && summonerPuuid && summonerId &&
      <DisplaySummonerInfo puuid={summonerPuuid} summonerId={summonerId}/>}
    </ChakraProvider>
  );
}

export default App;
