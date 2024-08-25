import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Image
} from "@chakra-ui/react"

const MasteryInfo = ({masteries}) => {
    return(
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th colSpan={masteries.length}>Masteries:</Th>
                    </Tr>  
                </Thead>
                <Tbody>
                    <Tr>    
                        {masteries.map((champion) => {
                            const [championName, championValue] = Object.entries(champion)[0];
                            const championIcon = `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${championName}.png`
                            return (
                                <Td>
                                    <Box><Image src={championIcon} align="center"   ></Image></Box>
                                    <Box>{championName}: {championValue}</Box>
                                </Td>
                            );
                        })}
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default MasteryInfo;