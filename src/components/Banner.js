import { Search2Icon } from '@chakra-ui/icons';
import {
    Flex,
    Text
} from '@chakra-ui/react'
const Banner = () =>{
    return(
        <>
            <Flex bg="black">
                <Search2Icon mt=".5%" mr="2" boxSize="8" color="white"/>           
                <Text as="b" fontSize="3xl" color="white" >Summoner Finder</Text>
            </Flex>
        </>
    )
}

export default Banner;