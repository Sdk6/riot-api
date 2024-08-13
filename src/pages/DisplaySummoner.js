import {
    Box,
    Text,
    Flex
  } from '@chakra-ui/react'
// import {useState, useEffect} from "react"
import SummonerIcon from './SummonerIcon'
const DisplaySummoner = ({summoner, summonerIcon}) => {

    return (
        <Flex bg="gray">
            <Box>
                <SummonerIcon summonerIcon={summonerIcon}/>
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