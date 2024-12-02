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
  import { useState, useEffect } from "react"

  const SearchForm = ({onSearch, size, color, initialValues ={}, border, reg, nam, tg}) => {
    // const [region, setRegion] = useState("americas");
    // const [inputRegion, setInputRegion] = useState("na1");
    // const [inputInGameName, setInputInGameName] = useState("");
    // const [inputTag, setInputTag]= useState("");
    const [formState, setFormState] = useState({
        region: "americas",
        inputRegion: "na1",
        inputInGameName: "",
        inputTag: ""
    });

    const regionOptions = [
        { value: "na1", label: "NA", image: "/Regions/NA.jpg" },
        { value: "eun1", label: "EUNE", image: "/Regions/EUROPENORDIC.jpg" },
        { value: "euw1", label: "EUW", image: "/Regions/EUROPE.jpg" },
        { value: "kr1", label: "KOREA", image: "/Regions/KOREA.jpg" },
        { value: "jp1", label: "JAPAN", image: "/Regions/JAPAN.jpg" },
      ];
    
    const regionMap = {
        na1: "americas",
        euw1: "europe",
        eun1: "europe",
        kr1: "asia",
        jp1: "asia"
    };

    useEffect(() => {
        if (Object.keys(initialValues).length) {
            setFormState(prev => ({
                ...prev,
                region: initialValues.region || prev.region,
                inputRegion: initialValues.inputRegion || prev.inputRegion,
                inputInGameName: initialValues.inputInGameName || prev.inputInGameName,
                inputTag: initialValues.inputTag || prev.inputTag
            }));
        }
    }, [initialValues]);

    const handleRegionChange = (selectedRegion) => {
        setFormState(prev => ({
            ...prev,
            inputRegion: selectedRegion,
            region: regionMap[selectedRegion]
        }));
    };
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [id]: value
        }));
    };
    const handleSubmit= () => {
        onSearch({
            ...formState,
            inputInGameName: formState.inputInGameName.toLowerCase(),
            inputTag: formState.inputTag.toLowerCase()
        });
    };

    return(
        <Flex alignItems="center" minH="6vh" bg={color} px="0.5" borderRadius="md">
            <FormControl>
                <HStack spacing="2" minW={size}>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="10%" bg="white" variant="filled">
                            {formState.inputRegion ? regionOptions.find(opt => opt.value === formState.inputRegion)?.label : "Select Region"}
                        </MenuButton>
                        <MenuList>
                            {regionOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    onClick={() => handleRegionChange(option.value)}
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
                        id="inputInGameName"
                        value={formState.inputInGameName}
                        bg="white"
                        placeholder="Enter in game name"
                        w="50%"
                        onChange={handleInputChange}
                    />
                    <Input
                        id="inputTag"
                        value={formState.inputTag}
                        bg="white"
                        placeholder="Enter in game tag"
                        w="30%"
                        onChange={handleInputChange}
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