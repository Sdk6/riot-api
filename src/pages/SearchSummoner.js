import {
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
  } from '@chakra-ui/react'
const SearchSummoner = () => {
    return (
        <>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
        </>
    )
};


export default SearchSummoner;