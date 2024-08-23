import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from "@chakra-ui/react"

const SoloqueueInfo = ({rank}) => {
    return(
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Solo Queue:</Th>
                    </Tr>  
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{rank}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default SoloqueueInfo;