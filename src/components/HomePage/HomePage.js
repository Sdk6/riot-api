import {
    Image,
    VStack,
    Flex,
    Center,
    Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner";
import SearchForm from "../SearchForm";
import Footer from "../Footer";

const HomePage = () => {
    const navigate = useNavigate();
    
    const handleSearch = (searchData) => {
        const { region, inputRegion, inputInGameName, inputTag} = searchData;
        navigate(`/summoner/${region}/${inputRegion}/${inputInGameName}/${inputTag}`);
    }
    
    return (
        <Flex 
            minH="100vh"
            flexDirection="column"
            position="relative"
            
        >
            <Banner minW="100%"/>
            <Flex 
                minW="100vw" 
                alignContent="center" 
                flex="1"
            >
                <Center minW="100%">
                    <VStack>
                        <Image src="controller.JPG" minW="450" minH="280" maxH="280"/>
                        <SearchForm size="60vw" color="#4299e1" onSearch={handleSearch}/>      
                    </VStack>
                </Center>
            </Flex>
            <Footer />
        </Flex>
    )
}

export default HomePage;