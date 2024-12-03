import { Center, Button } from '@chakra-ui/react'
import { useState, useEffect} from "react"
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import DisplaySummoner from './DisplaySummoner';
import SearchForm from './SearchForm';
import Footer from './Footer';


const SearchSummoner = ({
  handleSearchResult,
  isLoading,
  isSuccessful,
  loadingTrue,
  loadingFalse,
  successfulTrue,
  successfulFalse,
  summonerNotFound,
  summonerSoloqueue,
  summonerFlexqueue,
  summonerMasteries,
  summonerMatches }) => {
    const [summonerData, setSummonerData] = useState({
      icon: "",
      level: "",
      name: "",
      tag: "",
      region: ""
    });
    const {qName, qTag, qRegion, qRegion2} = useParams();
    const navigate = useNavigate();

    const fetchSummonerData = async (region, inputRegion, name, tag) =>{
      // console.log(`butts:${qName} ${qTag} ${qRegion}\n`)
      // console.log(`region/region2: ${region}/${inputRegion}\t name+tag: ${inputInGameName} ${inputTag}`);
      loadingTrue();
      successfulFalse();
      summonerNotFound();

      try {
        //Fetch account data
        const accountResponse = await fetch(`/api/account/${region}/${inputRegion}/${name.toLowerCase()}/${tag.toLowerCase()}`);
        if (!accountResponse.ok) throw new Error("Error reaching account data ", accountResponse.status);
        
        const accountData = await accountResponse.json();
        console.log(accountData);

        // Update Summoner Data upon successful data retrieval
        setSummonerData({
          icon: accountData.ids.profileIconId,
          level: accountData.summonerLevel,
          name: name,
          tag: tag,
          region: inputRegion
        });

        // Handle IDs
        handleSearchResult(accountData.ids.puuid, accountData.ids.summonerId);
        
        // Fetch Summoner Info
        const infoResponse = await fetch(`/api/summonerinfo/${accountData.ids.puuid}/${accountData.ids.summonerId}/${name.toLowerCase()}/${tag.toLowerCase()}/${region}/${inputRegion}`);
        if (!infoResponse.ok) {
          throw new Error("Error retrieving summoner information");
        }
        
        const summonerData = await infoResponse.json();
        console.log(summonerData);

        // Update Summoner Data  
        if (summonerData.ranks) {
          summonerSoloqueue(summonerData.ranks.soloqueue);
          summonerFlexqueue(summonerData.ranks.flexqueue);
        }
        if (summonerData.masteries) {
          summonerMasteries(summonerData.masteries);
        }
        if (summonerData.matches) {
          summonerMatches(summonerData.matches);
        }
        
        successfulTrue();
        
        // Only navigate if not already on the correct URL
        const currentPath = `/summoner/${region}/${inputRegion}/${name}/${tag}`;
        if (window.location.pathname !== currentPath) {
          navigate(currentPath);
        }
      } 
      catch (error) {
        console.error("Error in fetchSummonerData:", error);
        successfulFalse();
      } finally {
        loadingFalse();
      }
    };

    useEffect(() => {
      if (qName && qRegion && qTag && qRegion2) {
        // Only fetch if we don't already have the data for this summoner
        if (!summonerData.name || 
            summonerData.name.toLowerCase() !== qName.toLowerCase() || 
            summonerData.tag.toLowerCase() !== qTag.toLowerCase() ||
            summonerData.region !== qRegion2) {
          fetchSummonerData(qRegion, qRegion2, qName, qTag);
        }
      }
    }, [qName, qTag, qRegion, qRegion2]);
    
    const handleSearch = (searchData) => {
      const {region, inputRegion, inputInGameName, inputTag} = searchData;
      fetchSummonerData(region, inputRegion, inputInGameName, inputTag);
    };

    return (
        <>
        <SearchForm 
          onSearch={handleSearch}
          size="100%"
          color="#4299e1"
          initialValues={{
            region: qRegion,
            inputRegion: qRegion2,
            name: qName,
            tag: qTag
          }}
        />

        {isLoading && 
          <Center>
            <Button
              isLoading
              loadingText='Loading'
              colorScheme='#ECC94B'
              color="black"
            />
          </Center>
        }
        {!isLoading && isSuccessful && (
          <DisplaySummoner 
            summoner={`${summonerData.name} #${summonerData.tag}`} 
            summonerIcon={summonerData.icon}
            summonerLevel={summonerData.level}
            region={summonerData.region}
          />
        )}
        <Footer />
    </>
    )
};


export default SearchSummoner;

// const SearchSummoner = ({
//   handleSearchResult, isLoading, isSuccessful, loadingTrue, loadingFalse, successfulTrue, successfulFalse, summonerNotFound, summonerSoloqueue, summonerFlexqueue, summonerMasteries, summonerMatches }) => {
//     const [region, setRegion] = useState("americas");
//     const [region2, setRegion2] = useState("")
//     const [inGameName, setInGameName] = useState("");
//     const [tag, setTag] = useState("");
//     const [inputRegion, setInputRegion] = useState("na1")
//     const [inputInGameName, setInputInGameName] = useState("");
//     const [inputTag, setInputTag] = useState("");
//     const [summonerIcon, setSummonerIcon] = useState("");
//     const [summonerLevel, setSummonerLevel] = useState("");
//     const regionOptions = [
//         { value: "na1", label: "NA", image: "Regions/NA.jpg" },
//         { value: "eun1", label: "EUNE", image: "Regions/EUROPENORDIC.jpg" },
//         { value: "euw1", label: "EUW", image: "Regions/EUROPE.jpg" },
//         { value: "kr1", label: "KOREA", image: "Regions/KOREA.jpg" },
//         { value: "jp1", label: "JAPAN", image: "Regions/JAPAN.jpg" },
//       ];
//     const fetchAccount = async () =>{
//         console.log(`region/region2: ${region}/${inputRegion}\t name+tag: ${inputInGameName} ${inputTag}`);
//         loadingTrue();
//         successfulFalse();
//         summonerNotFound();
//         let sID = "";
//         let pID = "";
//         try {
//             const response = await fetch(`/api/account/${region}/${inputRegion}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}`);
//             if (!response.ok) throw new Error("Error reaching /api/account ", response.status);
//             const result = await response.json();
//             console.log(result);
//             setSummonerIcon(result.ids.profileIconId);
//             setSummonerLevel(result.summonerLevel);
//             setInGameName(inputInGameName);
//             setTag(inputTag);
//             setRegion2(inputRegion)
//             handleSearchResult(result.ids.puuid,result.ids.summonerId);
//             pID=result.ids.puuid;
//             sID=result.ids.summonerId;
//         } catch(e) {
//             successfulFalse();
//             throw new Error(`Summoner Not Found${e}`, e);
//         }    
//         try {
//             const response = await fetch(`/api/summonerinfo/${pID}/${sID}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}/${region}/${inputRegion}`);
//             if (!response.ok) {
//                 throw new Error("Error reaching /api/summoner ", response.status);
//             }
//             const result = await response.json();
//             console.log(result);
//             summonerSoloqueue(result.ranks.soloqueue);
//             summonerFlexqueue(result.ranks.flexqueue);
//             summonerMasteries(result.masteries);
//             summonerMatches(result.matches);
//         } catch (e) {
//             successfulFalse();
//             console.error(e);
//         } finally {
//             loadingFalse();
//             successfulTrue();
//         };
//     }

//     return (
//         <>
//         <Flex alignItems="center" minH="6vh" bg="#4299e1" px="0.5%">
//             <FormControl>
//                 <HStack spacing="2" minW="100%">
//                 <Menu>
//                   <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="10%" bg="white" variant="filled">
//                     {inputRegion ? regionOptions.find(opt => opt.value === inputRegion)?.label : "Select Region"}
//                   </MenuButton>
//                   <MenuList>
//                     {regionOptions.map((option) => (
//                       <MenuItem 
//                         key={option.value} 
//                         onClick={() => {
//                           setInputRegion(option.value);
//                           const regionMap = {
//                             euw1: "europe",
//                             eun1: "europe",
//                             na1: "americas",
//                             kr1: "asia",
//                             jp1: "asia"
//                           };
//                           setRegion(regionMap[option.value]);
//                         }}
//                       >
//                         <Flex alignItems="center">
//                           <Image src={option.image} boxSize="20px" mr={2} />
//                           <Text>{option.label}</Text>
//                         </Flex>
//                       </MenuItem>
//                     ))}
//                   </MenuList>
//                 </Menu>
//                     <Input
//                         id="inGameName"
//                         value={inputInGameName}
//                         bg="white"
//                         placeholder="Enter In Game Name"
//                         w="50%"
//                         onChange={(e) => setInputInGameName(e.target.value)}
//                     />
//                     <Input
//                         id="tag"
//                         value={inputTag}
//                         bg="white"
//                         placeholder='Enter Tag'
//                         w='30%'
//                         onChange={(e) => setInputTag(e.target.value)}
//                     />
//                     <Button bg='gray' onClick={fetchAccount} w="10%">
//                         Search
//                     </Button>
//                 </HStack>
//             </FormControl>
//         </Flex>
//     {isLoading && 
//     <Center>
//       <Button
//         isLoading
//         loadingText='Loading'
//         colorScheme='#ECC94B'
//         color="black"
//         />
//     </Center>
//     }
//     {!isLoading && isSuccessful && (
//         <DisplaySummoner 
//             summoner={`${inGameName} #${tag}`} 
//             summonerIcon={summonerIcon}
//             summonerLevel={summonerLevel}
//             region={region2}
//             />
//     )}
//     </>
//     )
// };
/*
import { Center, Button } from '@chakra-ui/react'
import { useState, useEffect} from "react"
import { useParams } from 'react-router-dom';
import DisplaySummoner from './DisplaySummoner';
import SearchForm from './SearchForm';


const SearchSummoner = ({
  handleSearchResult,
  isLoading,
  isSuccessful,
  loadingTrue,
  loadingFalse,
  successfulTrue,
  successfulFalse,
  summonerNotFound,
  summonerSoloqueue,
  summonerFlexqueue,
  summonerMasteries,
  summonerMatches }) => {
    const [region2, setRegion2] = useState("")
    const [inGameName, setInGameName] = useState("");
    const [tag, setTag] = useState("");
    const [summonerIcon, setSummonerIcon] = useState("");
    const [summonerLevel, setSummonerLevel] = useState("");
    const {qName, qTag, qRegion, qRegion2} = useParams();
    const fetchUrl = async (region, inputRegion, inputInGameName, inputTag) => {
      try {
        const response = await fetch(`/api/account/${region}/${inputRegion}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}`);
        if (!response.ok) throw new Error("Error reaching /api/account ", response.status);
        const result = await response.json();
        console.log(result);
        setSummonerIcon(result.ids.profileIconId);
        setSummonerLevel(result.summonerLevel);
        setInGameName(inputInGameName);
        setTag(inputTag);
        setRegion2(inputRegion)
        handleSearchResult(result.ids.puuid,result.ids.summonerId);
        // pID=result.ids.puuid;
        // sID=result.ids.summonerId;
    // } catch(e) {
    //     successfulFalse();
    //     throw new Error(`Summoner Not Found${e}`, e);
    // }    
    // try {
        const info_response = await fetch(`/api/summonerinfo/${result.ids.puuid}/${result.ids.summonerId}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}/${region}/${inputRegion}`);
        if (!info_response.ok) {
            throw new Error("Error reaching /api/summoner ", response.status);
        }
        const info_result = await info_response.json();
        console.log(info_result);
        summonerSoloqueue(info_result.ranks.soloqueue);
        summonerFlexqueue(info_result.ranks.flexqueue);
        summonerMasteries(info_result.masteries);
        summonerMatches(info_result.matches);
        successfulTrue();
    } 
      catch (e) {
        successfulFalse();
        console.error(e);
    } finally {
        loadingFalse();
    };
    }

    useEffect(() => {
      if (qName && qTag && qRegion && qRegion2) {
        loadingTrue();
        successfulFalse();
        summonerNotFound();
        fetchUrl(qRegion, qRegion2, qName, qTag);
      }
    }, [qName, qTag, qRegion, qRegion2]); 
      const fetchAccount = async (searchData) =>{
      const {region, inputRegion, inputInGameName, inputTag} = searchData;
      console.log(`butts:${qName} ${qTag} ${qRegion}\n`)
      console.log(`region/region2: ${region}/${inputRegion}\t name+tag: ${inputInGameName} ${inputTag}`);
      loadingTrue();
      successfulFalse();
      summonerNotFound();
      // let sID = "";
      // let pID = "";
      try {
          const response = await fetch(`/api/account/${region}/${inputRegion}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}`);
          if (!response.ok) throw new Error("Error reaching /api/account ", response.status);
          const result = await response.json();
          console.log(result);
          setSummonerIcon(result.ids.profileIconId);
          setSummonerLevel(result.summonerLevel);
          setInGameName(inputInGameName);
          setTag(inputTag);
          setRegion2(inputRegion)
          handleSearchResult(result.ids.puuid,result.ids.summonerId);
          // pID=result.ids.puuid;
          // sID=result.ids.summonerId;
      // } catch(e) {
      //     successfulFalse();
      //     throw new Error(`Summoner Not Found${e}`, e);
      // }    
      // try {
          const info_response = await fetch(`/api/summonerinfo/${result.ids.puuid}/${result.ids.summonerId}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}/${region}/${inputRegion}`);
          if (!info_response.ok) {
              throw new Error("Error reaching /api/summoner ", response.status);
          }
          const info_result = await info_response.json();
          console.log(info_result);
          summonerSoloqueue(info_result.ranks.soloqueue);
          summonerFlexqueue(info_result.ranks.flexqueue);
          summonerMasteries(info_result.masteries);
          summonerMatches(info_result.matches);
          successfulTrue();
      } 
        catch (e) {
          successfulFalse();
          console.error(e);
      } finally {
          loadingFalse();
      };
    }

    return (
        <>
        <SearchForm onSearch={fetchAccount} size="100%" color="#4299e1" />

        {isLoading && 
          <Center>
            <Button
              isLoading
              loadingText='Loading'
              colorScheme='#ECC94B'
              color="black"
            />
          </Center>
        }
        {!isLoading && isSuccessful && (
          <DisplaySummoner 
            summoner={`${inGameName} #${tag}`} 
            summonerIcon={summonerIcon}
            summonerLevel={summonerLevel}
            region={region2}
          />
        )}
    </>
    )
};


export default SearchSummoner;

*/