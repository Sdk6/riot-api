import {
    HStack,
    FormControl,
    Select,
    Input,
    Flex,
    Center,
    Button
  } from '@chakra-ui/react'
import {useState} from "react"
import DisplaySummoner from './DisplaySummoner';


const SearchSummoner = ({handleSearchResult, isLoading, isSuccessful, loadingTrue, loadingFalse, successfulTrue, successfulFalse, summonerNotFound, summonerSoloqueue, summonerFlexqueue, summonerMasteries, summonerMatches }) => {
    const [region, setRegion] = useState("americas");
    const [region2, setRegion2] = useState("")
    const [inGameName, setInGameName] = useState("");
    const [tag, setTag] = useState("");
    const [inputRegion, setInputRegion] = useState("na1")
    const [inputInGameName, setInputInGameName] = useState("");
    const [inputTag, setInputTag] = useState("");
    const [summonerIcon, setSummonerIcon] = useState("");
    const [summonerLevel, setSummonerLevel] = useState("");

    const fetchAccount = async () =>{
        console.log(`bla: ${region} ${inGameName} ${tag}`);
        loadingTrue();
        successfulFalse();
        summonerNotFound();
        let sID = "";
        let pID = "";
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
            pID=result.ids.puuid;
            sID=result.ids.summonerId;
        } catch(e) {
            successfulFalse();
            throw new Error("Summoner Not Found", e);
        }    
        try {
            const response = await fetch(`/api/summonerinfo/${pID}/${sID}/${inputInGameName.toLowerCase()}/${inputTag.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Error reaching /api/summoner ", response.status);
            }
            const result = await response.json();
            console.log(result);
            summonerSoloqueue(result.ranks.soloqueue);
            summonerFlexqueue(result.ranks.flexqueue);
            summonerMasteries(result.masteries);
            summonerMatches(result.matches);
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
        <Flex alignItems="center" minH="6vh" bg="#4299e1" px="0.5%">
            <FormControl>
                <HStack spacing="2" minW="100%">
                    <Select 
                        w="10%" 
                        id="region" 
                        value={inputRegion}
                        bg="white"
                        onChange={(e) => {
                            const reg2 = e.target.value;
                            setInputRegion(reg2);
                            const regionMap = {
                                euw1: "europe",
                                eun1: "europe",
                                na1: "americas",
                                kr1: "asia",
                                jp1: "asia"
                            };
                            setRegion(regionMap[reg2]);
                        }}>
                        <option value="na1">NA</option>
                        <option value="eun1">EUNE</option>
                        <option value="euw1">EUW</option>
                        <option value="kr1">KOREA</option>
                        <option value="jp1">JAPAN</option>
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
                    <Button bg='gray' onClick={fetchAccount} w="10%">
                        Search
                    </Button>
                </HStack>
            </FormControl>
        </Flex>
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