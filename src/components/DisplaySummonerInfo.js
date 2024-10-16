import{
    Flex,
    Spacer
} from '@chakra-ui/react'
import SoloqueueInfo from './SoloqueueInfo';
import FlexqueueInfo from './FlexqueueInfo';
import MasteryInfo from './MasteryInfo';
import MatchesInfo from './MatchesInfo';
const DisplaySummonerInfo = ({summonerInfo, isLoading, isSuccessful}) => {
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
                <Flex direction="column" bg="gray.400" minW="34.5%" alignSelf="flex-start">
                    <SoloqueueInfo rank={summonerInfo.soloqueue}/>
                    <Spacer bg="#648bee" pt={5}/>
                    <FlexqueueInfo rank={summonerInfo.flexqueue}/>
                    <Spacer bg="#648bee" pt={5}/>
                    <MasteryInfo masteries={summonerInfo.masteries}/>
                    
                </Flex>
                <Spacer w="1%" pl={2} />
                <Flex direction="column" bg="gray.400" minW="64.5%">
                    <MatchesInfo matches={summonerInfo.matches}/>
                </Flex>
            </Flex>
        )}
        </>
      );
}

export default DisplaySummonerInfo;