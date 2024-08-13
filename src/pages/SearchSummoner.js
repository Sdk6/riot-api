import {
    HStack,
    FormControl,
    Select,
    Input,
    Center,
    Box,
    Button
  } from '@chakra-ui/react'
import {useState} from "react"
import DisplaySummoner from './DisplaySummoner';


const SearchSummoner = () => {
    const [region, setRegion] = useState("americas");
    const [region2, setRegion2] = useState("na1")
    const [inGameName, setInGameName] = useState("");
    const [tag, setTag] = useState("");
    const [inputInGameName, setInputInGameName] = useState("");
    const [inputTag, setInputTag] = useState("");
    const [summonerIcon, setSummonerIcon] = useState("");
    const [summonerLevel, setSummonerLevel] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const fetchHello = async () =>{
        console.log(`${region} ${inGameName} ${tag}`);
        setIsLoading(true);
        setIsSuccessful(false);
        try {
            const response = await fetch(`/api/account/${region}/${region2}/${inputInGameName}/${inputTag}`);
            if (!response.ok) throw new Error("Error reaching /api/hello ", response.status);
            const result = await response.json();
            console.log(result);
            setSummonerIcon(result.profileIconId);
            setSummonerLevel(result.summonerLevel);
            setIsSuccessful(true);
            setInGameName(inputInGameName);
            setTag(inputTag);
        } catch(e) {
            setIsSuccessful(false);
            throw new Error("Something went wrong", e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <Center>
        <Box p="4" w="100vw" borderRadius="md" borderWidth="1px" bg="#4299e1">
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
    </Center>
    {isLoading && <p>Loading...</p>}
    {!isLoading && isSuccessful && (
        <DisplaySummoner 
            summoner={`${inGameName} #${tag}`} 
            summonerIcon={summonerIcon}
            summonerLevel={summonerLevel}
            />
    )}
    </>
    )
};


export default SearchSummoner;