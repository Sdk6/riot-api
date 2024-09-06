import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
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
                <Tbody>{/*make a seperate component for each match for cleaner code*/}
                    {matches.map((match, index) => {
                        const isUserOnWinningTeam = match.Won;
                        const userTeam = isUserOnWinningTeam ? match.Winner : (match.Winner === "BlueTeam" ? "RedTeam" : "BlueTeam");
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
                                {match.BlueTeam.map((member, memberIndex) => (
                                <div key={memberIndex} className={userTeam === "BlueTeam" ? "text-blue-600" : ""}>
                                    {member === user ? <strong>{member}</strong> : member}
                                </div>
                                ))}
                            </Td>
                            <Td>
                                <strong>Red Team:</strong>
                                {match.RedTeam.map((member, memberIndex) => (
                                <div key={memberIndex} className={userTeam === "RedTeam" ? "text-red-600" : ""}>
                                    {member === user ? <strong>{member}</strong> : member}
                                </div>
                                ))}
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