import { Flex, Text } from '@chakra-ui/react'

const Footer = () => {
    return (
        <Flex 
            bg="black"
            w="100%"
            position="fixed"
            bottom="0"
            py={4}
            justifyContent="center"
        >        
            <Text as="b" fontSize="3xl" color="white">Footer place holder</Text>
        </Flex>
    )
}

export default Footer;