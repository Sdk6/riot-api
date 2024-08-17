import {
    Box,
    Text,
    Flex,
    Spacer
  } from '@chakra-ui/react'
// import {useState, useEffect} from "react"
import SummonerIcon from './SummonerIcon'
const DisplaySummoner = ({summoner, summonerIcon, summonerLevel, region}) => {

    return (
        <Flex bg="blackAlpha.900">
            <Box align="center">
                <SummonerIcon summonerIcon={summonerIcon} summonerLevel={summonerLevel}/>
            </Box>
            <Spacer maxW="2.5%"/>
            <Box color="orange.50" mt="1.5%">
                <Text fontSize="3xl">
                    {region.toUpperCase()}
                </Text>
                <Text>
                    {summoner}
                </Text>
            </Box>
        </Flex>
    )
}

export default DisplaySummoner;