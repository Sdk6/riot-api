import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    Image,
    Text
} from "@chakra-ui/react"

const SoloqueueInfo = ({rank}) => {
    let tier=rank.split(' ')[0].toUpperCase();
    if (tier === "UNRANKED")  tier="IRON";
    const rankIcon=`RankedEmblems/${tier}.png`;
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
                        <Td>
                            <Flex  direction="column" alignItems="center">
                                <Image src={rankIcon} boxSize="200px"></Image> 
                                <Text>{rank}</Text>
                            </Flex>          
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )               
}

export default SoloqueueInfo;