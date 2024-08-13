import {
    Box,
    Text,
    Flex
  } from '@chakra-ui/react'
// import {useState, useEffect} from "react"
import SummonerIcon from './SummonerIcon'
const DisplaySummoner = ({summoner, summonerIcon, summonerLevel}) => {

    return (
        <Flex bg="gray">
            <Box>
                <SummonerIcon summonerIcon={summonerIcon} summonerLevel={summonerLevel}/>
            </Box>
            <Box>
                <Text>
                    {summoner}
                </Text>
            </Box>
        </Flex>
    )
}

export default DisplaySummoner;