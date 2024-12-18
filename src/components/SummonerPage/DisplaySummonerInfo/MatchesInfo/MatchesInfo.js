import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    Flex,
    Spacer,
    Text,
    Box,
    Link,
    Center
} from "@chakra-ui/react"

const MatchesInfo = ({matches=[]}) => {
    const parseNameTag = (str) => {
        if (!str.includes('#')) {
          throw new Error('String must contain a hashtag');
        }
        
        const [name, tag] = str.split('#').map(part => part.trim());
        
        if (!name || !tag) {
          throw new Error('Both name and tag must be present');
        }
        
        return { name, tag };
    }
    return(
        <TableContainer>
            <Table variant="simple" bg="#648bee">
                <Thead bg="gray.400">
                    <Tr>
                        <Th colSpan={matches.length}>Recent Matches:</Th>
                    </Tr>  
                </Thead>
                <Tbody >
                    {matches.map((match, index) => {
                        const region = match.Region;
                        const region2 = match.Region2;
                        const user = match.User;
                        const version = match.Version;
                        const userChampion =`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.UserChampion}.png`;
                        // Define the background color based on win/loss
                        const bgColor = match.Won ? "green.100" : "red.100";
                        const txtColor = match.Won ? "green.600" : "red.600";
                        const summoner1= `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${match.UserSummonerSpells[0]}.png`;
                        const summoner2= `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${match.UserSummonerSpells[1]}.png`;

                        return (
                            <>
                            <Tr key={index} bg={bgColor}>
                            <Td>
                                <Flex>
                                    <Flex key="GameType/GameResult" direction="column" align="center" mt="9%">
                                        <strong>{match.GameType}</strong>
                                        <Box w="80%" h="1px" bg="gray.600" my="15" pr="150" />
                                        <Text color={txtColor}>{match.Won ? (<strong>VICTORY</strong>) : (<strong>DEFEAT</strong>)}</Text>
                                    </Flex>
                                    <Flex direction="column" ml="10" mt="2" minW="260">
                                        <Flex>
                                            <Image key="UserChampionIcon"  boxSize="110" ml="5" src={userChampion} borderRadius="full"/>
                                            <Flex key="SummonerSpells" direction="column" ml="2" w="24" >
                                                <Image key="SummonerSpell1" src={summoner1} fallbackSrc="/graybox.jpg" boxSize="10" borderRadius="25%" mt="13%"/>
                                                <Image key="SummonerSpell2" src={summoner2} fallbackSrc="/graybox.jpg" boxSize="10" borderRadius="25%" mt="2%"/>
                                            </Flex>
                                        </Flex>
                                        <Flex mt="2">
                                            <Center>
                                                {match.UserItems.map((itemNo) => {
                                                    const itemSrc=`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemNo}.png`
                                                    const fallback=`/graybox.jpg`
                                                    return(
                                                        <Image borderRadius="25%" h="7" w="8" ml="1%" src={itemSrc} fallbackSrc={fallback}></Image>
                                                    )
                                                })}
                                            </Center>
                                        </Flex>
                                    </Flex>
                                    {/*TODO: send kda as a json and display kills and assists normally but make deaths text color red
                                    use team.map functions below as refrence*/}
                                    <Center><Text key="KDA" as="b" mt="3">{match.KDA}</Text></Center>
                                </Flex>
                            </Td>
                            <Td>
                                {match.Winner === "BlueTeam"?(<><strong>Blue Team:</strong> <i>(Victory)</i></>) : (<><strong>Blue Team:</strong> <i>(Defeat)</i></>)}
                                {match.BlueTeam.map((memberObj, memberIndex) => {
                                const [memberName, championName] = Object.entries(memberObj)[0];
                                const { name, tag } = parseNameTag(memberName)
                                const lnk = `/summoner/${region}/${region2}/${name}/${tag}`
                                const champIcon= championName==="FiddleSticks" ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Fiddlesticks.png`: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`
                                return (
                                    <Flex key={memberIndex} pt="1">
                                    <Image src={champIcon} boxSize="6" mr="2"/>
                                        {name === user ? (
                                            <strong>{name}</strong>
                                        ) : (
                                            <Link href={lnk}>{name}</Link>
                                        )}
                                    </Flex>
                                );
                            })}
                            </Td>
                            <Td>
                                {match.Winner === "RedTeam" ? (<><strong>Red Team:</strong> <i>(Victory)</i></>) : (<><strong>Red Team:</strong> <i>(Defeat)</i></>)}
                                {match.RedTeam.map((memberObj, memberIndex) => {
                                const [memberName, championName] = Object.entries(memberObj)[0];
                                const { name, tag } = parseNameTag(memberName)
                                const lnk = `/summoner/${region}/${region2}/${name}/${tag}`
                                //endpoint for fiddlesticks not working properly wtf
                                const champIcon= championName==="FiddleSticks" ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Fiddlesticks.png`: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`
                                return (
                                    <Flex key={memberIndex} pt="1">
                                    <Image src={champIcon} boxSize="6" mr="2"/>
                                        {name === user ? (
                                            <strong>{name}</strong>
                                        ) : (
                                           <Link href={lnk}>{name}</Link> 
                                        )}
                                    </Flex>
                                );
                            })}
                            </Td>
                            {/* <Td>Winner: {match.Winner}</Td> */}
                            
                            </Tr>
                            <Spacer mb={2}/>
                            </>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default MatchesInfo;