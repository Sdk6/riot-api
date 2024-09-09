import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    Flex
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
                        const isUserOnWinningTeam = match.Won;
                        const user = match.User
                        // Define the background color based on win/loss
                        const bgColor = isUserOnWinningTeam ? "green.100" : "red.100";

                        return (
                            <Tr key={index} bg={bgColor}>
                            <Td>
                                <strong>{match.GameType}</strong>
                            </Td>
                            <Td>
                                <strong>Blue Team:</strong>
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
                                <strong>Red Team:</strong>
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
                            <Td>Winner: {match.Winner}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default MatchesInfo;