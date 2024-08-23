import {
    HStack,
    FormControl,
    Select,
    Input,
    Box,
    Center,
    Button
  } from '@chakra-ui/react'
import {useState} from "react"
import DisplaySummoner from './DisplaySummoner';


const SearchSummoner = ({handleSearchResult, isLoading, isSuccessful, loadingTrue, loadingFalse, successfulTrue, successfulFalse, summonerNotFound, summonerInfo, summonerSoloqueue, summonerFlexqueue }) => {
    const [region, setRegion] = useState("americas");
    const [region2, setRegion2] = useState("na1")
    const [inGameName, setInGameName] = useState("");
    const [tag, setTag] = useState("");
    const [inputInGameName, setInputInGameName] = useState("");
    const [inputTag, setInputTag] = useState("");
    const [summonerIcon, setSummonerIcon] = useState("");
    const [summonerLevel, setSummonerLevel] = useState("");

    const fetchHello = async () =>{
        console.log(`${region} ${inGameName} ${tag}`);
        loadingTrue();
        successfulFalse();
        summonerNotFound();
        let sID = "";
        let pID = "";
        try {
            const response = await fetch(`/api/account/${region}/${region2}/${inputInGameName}/${inputTag}`);
            if (!response.ok) throw new Error("Error reaching /api/account ", response.status);
            const result = await response.json();
            console.log(result);
            setSummonerIcon(result.ids.profileIconId);
            setSummonerLevel(result.summonerLevel);
            setInGameName(inputInGameName);
            setTag(inputTag);
            handleSearchResult(result.ids.puuid,result.ids.summonerId);
            pID=result.ids.puuid;
            sID=result.ids.summonerId;
        } catch(e) {
            successfulFalse();
            throw new Error("Something went wrong", e);
        }    
        try {
            const response = await fetch(`/api/summonerinfo/${pID}/${sID}`);
            if (!response.ok) {
                throw new Error("Error reaching /api/summoner ", response.status);
            }
            const result = await response.json();
            summonerSoloqueue(result.ranks.soloqueue);
            summonerFlexqueue(result.ranks.flexqueue);
        } catch (e) {
            successfulFalse();
            console.error(e);
        } finally {
            loadingFalse();
            successfulTrue();
        };
    }

    return (
        <>
        <Box alignContent="center" minW="100vw" minH="6vh" bg="#4299e1">
            <FormControl>
                <HStack spacing="2" w="100%">
                    <Select 
                        w="10%" 
                        id="region" 
                        value={region}
                        bg="white"
                        onChange={(e) => setRegion(e.target.value)}>
                        <option value="americas">NA</option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="esports">Esports</option>
                    </Select>
                    <Input
                        id="inGameName"
                        value={inputInGameName}
                        bg="white"
                        placeholder="Enter In Game Name"
                        w="50%"
                        onChange={(e) => setInputInGameName(e.target.value)}
                    />
                    <Input
                        id="tag"
                        value={inputTag}
                        bg="white"
                        placeholder='Enter Tag'
                        w='30%'
                        onChange={(e) => setInputTag(e.target.value)}
                    />
                    <Button bg='gray' onClick={fetchHello} w="10%">
                        Search
                    </Button>
                </HStack>
            </FormControl>
        </Box>
    {isLoading && <Center><Button
                    isLoading
                    loadingText='Loading'
                    colorScheme='#ECC94B'
                    color="black"
                    /></Center>
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