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
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th colSpan={matches.length}>Recent Matches:</Th>
                    </Tr>  
                </Thead>
                <Tbody>
                    {matches.map((match, index) => {
                        const user = match.User
                        const userChampion =`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${match.UserChampion}.png` 
                        // Define the background color based on win/loss
                        const bgColor = match.Won ? "green.100" : "red.100";
                        const txtColor = match.Won ? "green.600" : "red.600"

                        return (
                            <Tr key={index} bg={bgColor}>
                            <Td>
                                <Flex>
                                    <Flex direction="column" align="center" pt="10%">
                                        <strong>{match.GameType}</strong>
                                        <Box w="80%" h="1px" bg="gray.600" my="15" pr="150" />
                                        <Text color={txtColor}>{match.Won ? (<strong>VICTORY</strong>) : (<strong>DEFEAT</strong>)}</Text>
                                    </Flex>
                                    <Image pl="10" src={userChampion} />
                                    {/*TODO: send kda as a json and display kills and assists normally but make deaths text color red
                                    use team.map functions below as refrence*/}
                                    <Center><Text as="b" ml="5">{match.KDA}</Text></Center>
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
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default MatchesInfo;