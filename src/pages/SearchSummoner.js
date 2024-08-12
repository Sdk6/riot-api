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
    const [data, setData] = useState(null);

    const fetchHello = async () =>{
        console.log(`${region} ${inGameName} ${tag}`)
        try {
            const response = await fetch(`/api/account/${region}/${region2}/${inGameName}/${tag}`);
            if (!response.ok) throw new Error("Error reaching /api/hello ", response.status);
            const result = await response.json();
            // setMessage(result.message)
            console.log(result)
            setData(result.puuid)
            
        } catch(e) {
            throw new Error("Something went wrong", e);
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
                        value={inGameName}
                        bg="white"
                        placeholder="Enter In Game Name"
                        w="50%"
                        onChange={(e) => setInGameName(e.target.value)}
                    />
                    <Input
                        id="tag"
                        value={tag}
                        bg="white"
                        placeholder='Enter Tag'
                        w='30%'
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <Button bg='gray' onClick={fetchHello} w="10%">
                        Search
                    </Button>
                </HStack>
            </FormControl>
        </Box>
    </Center>
    <DisplaySummoner puuid={data} />
    </>
    )
};


export default SearchSummoner;