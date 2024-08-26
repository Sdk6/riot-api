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
                                            align="center"
                                            src={championIcon} 
                                            borderRadius="25%" 
                                            boxSize="80px" 
                                            alt={championName}
                                            mt={1}
                                        />
                                        <Box 
                                            bg='gray.700' 
                                            p={.5}
                                            bottom="1.2vh"
                                            boxShadow="outline"
                                            borderRadius="md"
                                            width="25%"
                                            position="relative"
                                            textAlign={"center"}
                                        >
                                            <Text as="b" color="white" fontSize="sm">
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

{/* <Image 
                                            align="center"
                                            src={championIcon} 
                                            borderRadius="25%" 
                                            boxSize="80px" 
                                            alt={championName}
                                            mt={1}
                                        />
                                        <Box 
                                            bg='gray.700' 
                                            py={1}
                                            boxShadow="outline"
                                            borderRadius="md"
                                            width="31%"
                                            position="relative"
                                            textAlign={"center"}
                                        > */}
export default MasteryInfo;