import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Image,
    Text,
    Flex
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
                                <Td key={championName}>
                                    <Flex direction="column" alignItems="center">
                                        <Image 
                                            src={championIcon} 
                                            borderRadius="full" 
                                            boxSize="80px" 
                                            alt={championName}
                                            mb={1}
                                        />
                                        <Box 
                                            bg='gray.700' 
                                            py={1}
                                            px={1}
                                            boxShadow="outline"
                                            borderRadius="md"
                                            width="40%"
                                            textAlign="center"
                                        >
                                            <Text fontWeight="bold" color="white" fontSize="sm">
                                                {championValue}
                                            </Text>
                                        </Box>
                                    </Flex>
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