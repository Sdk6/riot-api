import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem, 
    HStack,
    FormControl,
    Text,
    Input,
    Flex,
    Button,
    Image
  } from '@chakra-ui/react'
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { useState } from "react"

  const SearchForm = ({onSearch}) => {
    const [region, setRegion] = useState("americas");
    const [inputRegion, setInputRegion] = useState("na1");
    const [inputInGameName, setInputInGameName] = useState("");
    const [inputTag, setInputTag]= useState("");

    const regionOptions = [
        { value: "na1", label: "NA", image: "Regions/NA.jpg" },
        { value: "eun1", label: "EUNE", image: "Regions/EUROPENORDIC.jpg" },
        { value: "euw1", label: "EUW", image: "Regions/EUROPE.jpg" },
        { value: "kr1", label: "KOREA", image: "Regions/KOREA.jpg" },
        { value: "jp1", label: "JAPAN", image: "Regions/JAPAN.jpg" },
      ];

    const handleSubmit= () => {
        onSearch({
            region,
            inputRegion,
            inputInGameName: inputInGameName.toLowerCase(),
            inputTag: inputTag.toLowerCase()
        });
    };

    return(
        <Flex alignItems="center" minH="6vh" bg="#4299e1" px="0.5">
            <FormControl>
                <HStack spacing="2" minW="100%">
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="10%" bg="white" variant="filled">
                            {inputRegion ? regionOptions.find(opt => opt.value === inputRegion)?.label : "Select Region"}
                        </MenuButton>
                        <MenuList>
                            {regionOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    onClick={() => {
                                        setInputRegion(option.value);
                                        const regionMap = {
                                            na1: "americas",
                                            euw1: "europe",
                                            eun1: "europe",
                                            kr1: "asia",
                                            jp1: "asia"
                                        };
                                        setRegion(regionMap[option.value]);
                                    }}
                                >
                                    <Flex alignItems="center">
                                        <Image src={option.image} boxSize="20px" mr={2} />
                                        <Text>{option.label}</Text>
                                    </Flex>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Input
                        id="inGameName"
                        value={inputInGameName}
                        bg="white"
                        placeholder="Enter in game name"
                        w="50%"
                        onChange={(e) => setInputInGameName(e.target.value)}
                    />
                    <Input
                        id="inGameTag"
                        value={inputTag}
                        bg="white"
                        placeholder="Enter in game tag"
                        w="30%"
                        onChange={(e) => setInputTag(e.target.value)}
                    />
                    <Button bg='gray' onClick={handleSubmit} w="10%">
                        Search
                    </Button>
                </HStack>
            </FormControl>
        </Flex> 
    );
};

export default SearchForm;