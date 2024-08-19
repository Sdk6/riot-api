import{
    Flex,
    Spacer,
    Box,
    Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
const DisplaySummonerInfo = ({puuid, summonerId,  isLoading, isSuccessful, loadingStart, loadingEnd, successfulTrue, successfulFalse}) => {
    const [soloRank, setSoloRank] = useState("");
    const [flexRank, setFlexRank] = useState("");


    useEffect(() =>{
        const fetchSummonerData = async () => {
            const response = await fetch(`/api/summonerinfo/${puuid}/${summonerId}`);
            if (!response.ok) throw new Error("Error reaching /api/summoner ", response.status);
            const result = await response.json();
            setSoloRank(result.ranks.soloqueue);
            setFlexRank(result.ranks.flexqueue);
            loadingEnd();
            successfulTrue();
        };
        fetchSummonerData();
    }, [puuid]);
    return (
        <>
        {isLoading && <p></p>}
        {!isLoading && isSuccessful && (
            <Flex mt=".5%" ml=".5%" mr=".5%">
                <Box bg="gray" w="34.5%">
                    <Text>Ranked Solo 5x5: {soloRank}</Text>
                    <Text>Ranked Flex 5x5: {flexRank}</Text>
                </Box>
                <Spacer w="1%" />
                <Box bg="red" w="64.5%">
                    {summonerId}
                </Box>
            </Flex>
        )}
        </>
      );
}

export default DisplaySummonerInfo;