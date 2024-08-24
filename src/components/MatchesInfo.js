import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
} from "@chakra-ui/react"

const MatchesInfo = ({matches}) => {
    return(
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Recent Matches:</Th>
                    </Tr>  
                </Thead>
                <Tbody>
                    {matches.map((matchId, index) => {
                        return (
                            <Tr key={index}>
                                <Td>{matchId}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default MatchesInfo;