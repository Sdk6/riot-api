import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
} from "@chakra-ui/react"

const MasteryInfo = ({masteries}) => {
    return(
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Masteries:</Th>
                    </Tr>  
                </Thead>
                <Tbody>
                    {masteries.map((champion, index) => {
                        const [championName, championValue] = Object.entries(champion)[0];
                        return (
                            <Tr key={index}>
                                <Td>{championName}: {championValue}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default MasteryInfo;