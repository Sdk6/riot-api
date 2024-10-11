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
    Center
} from "@chakra-ui/react"

const MatchesInfo = ({matches=[]}) => {
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
                        const user = match.User;
                        const userChampion =`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${match.UserChampion}.png`;
                        // Define the background color based on win/loss
                        const bgColor = match.Won ? "green.100" : "red.100";
                        const txtColor = match.Won ? "green.600" : "red.600";
                        const summoner1= `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${match.UserSummonerSpells[0]}.png`;
                        const summoner2= `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${match.UserSummonerSpells[1]}.png`;

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
                                                <Image key="SummonerSpell1" src={summoner1} fallbackSrc="graybox.jpg" boxSize="10" borderRadius="25%" mt="13%"/>
                                                <Image key="SummonerSpell2" src={summoner2} boxSize="10" borderRadius="25%" mt="2%"/>
                                            </Flex>
                                        </Flex>
                                        <Flex mt="2">
                                            <Center>
                                                {match.UserItems.map((itemNo) => {
                                                    const itemSrc=`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/item/${itemNo}.png`
                                                    const fallback=`graybox.jpg`
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
                                const champIcon= championName==="FiddleSticks" ? `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/Fiddlesticks.png`: `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${championName}.png`
                                return (
                                    <Flex key={memberIndex} pt="1">
                                    <Image src={champIcon} boxSize="6" mr="2"/>
                                        {memberName === user ? (
                                            <strong>{memberName}</strong>
                                        ) : (
                                            memberName
                                        )}
                                    </Flex>
                                );
                            })}
                            </Td>
                            <Td>
                                {match.Winner === "RedTeam" ? (<><strong>Red Team:</strong> <i>(Won)</i></>) : (<><strong>Red Team:</strong> <i>(Defeat)</i></>)}
                                {match.RedTeam.map((memberObj, memberIndex) => {
                                const [memberName, championName] = Object.entries(memberObj)[0];
                                //endpoint for fiddlesticks not working properly wtf
                                const champIcon= championName==="FiddleSticks" ? `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/Fiddlesticks.png`: `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${championName}.png`
                                return (
                                    <Flex key={memberIndex} pt="1">
                                    <Image src={champIcon} boxSize="6" mr="2"/>
                                        {memberName === user ? (
                                            <strong>{memberName}</strong>
                                        ) : (
                                            memberName
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