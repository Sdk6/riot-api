import {
    Box,
    Text,
    Flex
  } from '@chakra-ui/react'
// import {useState, useEffect} from "react"
import SummonerIcon from './SummonerIcon'
const DisplaySummoner = ({puuid}) => {

    return (
        <Flex bg="gray">
            <Box>
                <SummonerIcon/>
            </Box>
            <Box>
                <Text>
                    puuid: {puuid}
                </Text>
            </Box>
        </Flex>
    )
}

export default DisplaySummoner;