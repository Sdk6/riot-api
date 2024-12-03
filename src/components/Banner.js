import { Search2Icon } from '@chakra-ui/icons';
import {
    Flex,
    Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const Banner = () =>{
    const navigate = useNavigate();
    const home = () => {navigate('/')}
    return(
        <>
            <Flex bg="black">
                <Search2Icon mt=".5%" mr="2" boxSize="8" color="white" onClick={home}/>           
                <Text as="b" fontSize="3xl" color="white" onClick={home}>Summoner Finder</Text>
            </Flex>
        </>
    )
}

export default Banner;