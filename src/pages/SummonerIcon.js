import {
    VStack, 
    Box,
    Text
} from '@chakra-ui/react'
const SummonerIcon = ({summonerLevel="500", summonerIcon}) => {
    let summonerIconSrc = `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/profileicon/${summonerIcon}.png`
    return(
        <VStack position='relative'>
            <img alt="summonerIcon" style={{borderRadius: "25%"}} src={summonerIconSrc}/>
            <Box bg='gray.700' p="1" boxShadow="outline" bottom="2vh" mb="2vh" rounded='md' position='relative'>
                <Text as="b" color="white">
                    {summonerLevel}
                </Text>
            </Box>
        </VStack>
    )
}

export default SummonerIcon;