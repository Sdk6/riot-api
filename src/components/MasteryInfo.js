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
                        <Th>Masteries:</Th>
                    </Tr>  
                </Thead>
                <Tbody>{/*TODO: use https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/{ChampionName}.png 
                                    to display champion icons for mastery component. note: champion name is case senstive*/}
                    <Tr>    
                        {masteries.map((champion, index) => {
                            const [championName, championValue] = Object.entries(champion)[0];
                            const championIcon = `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${championName}.png`
                            return (
                                <Td key={index}>
                                    <Box><Image src={championIcon} align="center"></Image></Box>
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