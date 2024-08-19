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
            <Box color="orange.50" mt="1.5%" fontFamily="nunito">
                <Text fontSize="4xl">
                    {region.toUpperCase()}
                </Text>
                <Text fontSize="3xl">
                    {summoner.toUpperCase()}
                </Text>
            </Box>
        </Flex>
    )
}

export default DisplaySummoner;