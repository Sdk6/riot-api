import {
    HStack,
    FormControl,
    FormLabel,
    Input,
    Center,
    AbsoluteCenter,
    Button
  } from '@chakra-ui/react'
const SearchSummoner = () => {
    return (
            <FormControl>
                <HStack>
                    <FormLabel><Input variant={'filled'} placeholder='Enter In Game Name'></Input></FormLabel>
                    <FormLabel><Input variant={'filled'} placeholder='Enter Tag'></Input></FormLabel>
                </HStack>
                <Button bg={'gray'}>
                    Submit
                </Button>
            </FormControl>
    )
};


export default SearchSummoner;