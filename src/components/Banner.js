import { Search2Icon } from '@chakra-ui/icons';
import {
    Flex,
    Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const Banner = ({ cancelFetch }) =>{
    const navigate = useNavigate();
    const home = () => {navigate('/')}
    const butts = () =>{
        cancelFetch();
        home();
    }
    return(
        <>
            <Flex bg="black">
                <Search2Icon mt=".5%" mr="2" boxSize="8" color="white" onClick={butts} cursor="pointer"/>           
                <Text as="b" fontSize="3xl" color="white" onClick={home} cursor="pointer">Summoner Finder</Text>      
            </Flex>
        </>
    )
}

export default Banner;