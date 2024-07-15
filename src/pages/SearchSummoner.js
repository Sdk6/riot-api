import {
    HStack,
    FormControl,
    FormLabel,
    Input,
    Center,
    AbsoluteCenter,
    Box,
    Button
  } from '@chakra-ui/react'
import {useState} from "react"
const SearchSummoner = () => {
    const [inGameName, setInGameName] = useState("");
    const [tag, setTag] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const apiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/sunn/na1?api_key=RGAPI-44ab4592-79f4-4cfd-9fa7-fb753f4840eb`;

        const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "api_key": "RGAPI-3b04f93a-3e25-4227-9203-c7af0df1d818"
        }
        });
        const text = await response.text();
        console.log('Raw response:', text);
        console.log('Response status:', response.status);
    }
    return (
            <Center h="100vh">
                <Box p="5" maxW="50vw"  borderRadius={"md"} borderWidth="1px" bg="black" >
                <FormControl>
                    <HStack>
                        <FormLabel>
                            <Input 
                                id="inGameName"
                                value={inGameName}
                                bg={"white"}
                                placeholder="Enter In Game Name"
                                w="10vw"
                                onChange={(e) => setInGameName(e.target.value)}
                            />
                        </FormLabel>
                        <FormLabel>
                            <Input 
                                id="tag"
                                value={tag}
                                bg={"white"} 
                                placeholder='Enter Tag' 
                                w='6vw'
                                onChange={(e) => setTag(e.target.value)}
                            />
                            
                        </FormLabel>
                    </HStack>
                    <Button bg={'gray'} onClick={handleSubmit}>
                        Search Summoner
                    </Button>
                </FormControl>
                </Box>
            </Center>
    )
};


export default SearchSummoner;