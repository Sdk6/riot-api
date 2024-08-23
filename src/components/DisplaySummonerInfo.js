import{
    Flex,
    Spacer,
    Box,
    Text
} from '@chakra-ui/react'
import { useEffect, useState, useCallback } from 'react';
import SoloqueueInfo from './SoloqueueInfo';
import FlexqueueInfo from './FlexqueueInfo';
const DisplaySummonerInfo = ({summonerInfo, isLoading, isSuccessful, successfulTrue, successfulFalse}) => {
    // const fetchSummonerData = async () => {
    //     const response = await fetch(`/api/summonerinfo/${puuid}/${summonerId}`);
    //     if (!response.ok) {
    //         successfulFalse();
    //         throw new Error("Error reaching /api/summoner ", response.status);
    //     }
    //     const result = await response.json();
    //     setSoloRank(result.ranks.soloqueue);
    //     setFlexRank(result.ranks.flexqueue);
    //     loadingEnd();
    //     successfulTrue();
    // };

    // useEffect(() => {
    //     if (summonerInfo.found && summonerInfo.puuid && summonerInfo.summonerId) {
    //       fetchSummonerData();
    //     }
    //   }, [summonerInfo]);

    //   const fetchSummonerData = async () => {
    //     loadingStart();
    //     try {
    //       const response = await fetch(`/api/summonerinfo/${summonerInfo.puuid}/${summonerInfo.summonerId}`);
    //       if (!response.ok) {
    //         throw new Error("Error reaching /api/summoner ", response.status);
    //       }
    //       const result = await response.json();
    //       setSoloRank(result.ranks.soloqueue);
    //       setFlexRank(result.ranks.flexqueue);
    //       successfulTrue();
    //     } catch (error) {
    //       successfulFalse();
    //       console.error(error);
    //     } finally {
    //       loadingEnd();
    //     }
    //   };
    return (
        <>
        {isLoading && <p></p>}
        {!isLoading && isSuccessful && (
            <Flex mt=".5%" ml=".5%" mr=".5%">
                <Box bg="gray" w="34.5%">
                    <SoloqueueInfo rank={summonerInfo.soloqueue}/>
                    <FlexqueueInfo rank={summonerInfo.flexqueue}/>
                    
                </Box>
                <Spacer w="1%" />
                <Box bg="red" w="64.5%">
                    {summonerInfo.summonerId}
                </Box>
            </Flex>
        )}
        </>
      );
}

export default DisplaySummonerInfo;