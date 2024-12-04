import { Flex, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons';

const Logo = () => {
    return (
        <Flex align="center">
            <Search2Icon mt=".5%" mr="2" boxSize="8" color="white"/>          
            <Text as="b" fontSize="3xl" color="white">Summoner Finder</Text>
        </Flex>
    )
}

const Footer = () => {
    return (
        <Flex
            bg="black"
            w="100%"
            position="static"
            bottom="0"
            py={2}
            px={4}
            justify="space-between"
            align="center"
        >        
            <Logo />
            <Text textColor="white">Personal project by Sunfee Kim</Text>
        </Flex>
    )
}

export default Footer;