import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem, 
    HStack,
    FormControl,
    Text,
    Input,
    Flex,
    Center,
    Button,
    Image
  } from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";
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
    const regionOptions = [
        { value: "na1", label: "NA", image: "Regions/NA.jpg" },
        { value: "eun1", label: "EUNE", image: "Regions/EUROPENORDIC.jpg" },
        { value: "euw1", label: "EUW", image: "Regions/EUROPE.jpg" },
        { value: "kr1", label: "KOREA", image: "Regions/KOREA.jpg" },
        { value: "jp1", label: "JAPAN", image: "Regions/JAPAN.jpg" },
      ];
    const fetchAccount = async () =>{
        console.log(`region/region2: ${region}/${inputRegion}\t name+tag: ${inputInGameName} ${inputTag}`);
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
            throw new Error(`Summoner Not Found${e}`, e);
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
                <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="10%" bg="white" variant="filled">
    {inputRegion ? regionOptions.find(opt => opt.value === inputRegion)?.label : "Select Region"}
  </MenuButton>
  <MenuList>
    {regionOptions.map((option) => (
      <MenuItem 
        key={option.value} 
        onClick={() => {
          setInputRegion(option.value);
          const regionMap = {
            euw1: "europe",
            eun1: "europe",
            na1: "americas",
            kr1: "asia",
            jp1: "asia"
          };
          setRegion(regionMap[option.value]);
        }}
      >
        <Flex alignItems="center">
          <Image src={option.image} boxSize="20px" mr={2} />
          <Text>{option.label}</Text>
        </Flex>
      </MenuItem>
    ))}
  </MenuList>
</Menu>
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