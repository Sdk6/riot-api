import {VStack, Box} from '@chakra-ui/react'
const SummonerIcon = () => {
    return(
        <VStack>
            <img alt="summonerIcon" style={{borderRadius: "50%"}} src="https://ddragon.leagueoflegends.com/cdn/14.15.1/img/profileicon/2074.png"/>
            <Box bg='white' boxShadow="outline" mb="2vh" rounded='md' position='relative'>232</Box>
        </VStack>
    )
}

export default SummonerIcon;