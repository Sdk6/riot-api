import {
    Image,
    VStack,
    Flex,
    Center,
    Box
} from "@chakra-ui/react";
import Banner from "../Banner";
import SearchForm from "../SearchForm";
import Footer from "../Footer";

const HomePage = () => {
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
                        <Image src="controller.jpg" boxSize="100"/>
                        <SearchForm size="60vw" color="#4299e1"/>      
                    </VStack>
                </Center>
            </Flex>
            <Footer />
        </Flex>
    )
}

export default HomePage;