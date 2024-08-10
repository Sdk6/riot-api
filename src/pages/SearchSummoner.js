import {
    HStack,
    FormControl,
    FormLabel,
    Input,
    Center,
    AbsoluteCenter,
    Box,
    Button,
    Text
  } from '@chakra-ui/react'
import {useState, useEffect} from "react"



const SearchSummoner = () => {
    const [inGameName, setInGameName] = useState("");
    const [tag, setTag] = useState("");
    const [message, setMessage] = useState("butts");

    const fetchHello = async () =>{
        try {
            const response = await fetch('/api/hello');
            if (!response.ok) throw new Error("Error reaching /api/hello ", response.status);
            const result = await response.json();
            console.log(result.message)
            setMessage(result.message)
        } catch(e) {
            throw new Error("Something went wrong", e);
        }
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
                    <Button bg={'gray'} onClick={fetchHello}>
                        Search Summoner
                    </Button>
                </FormControl>
                {message}
                </Box>
            </Center>
    )
};


export default SearchSummoner;