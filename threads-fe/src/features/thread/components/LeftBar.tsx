import { Heading, Box, ListItem, UnorderedList, Button } from '@chakra-ui/react'
import { BiHome } from "react-icons/bi"
import { BsSearch } from "react-icons/bs"
import { FaUserFriends } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { useNavigate } from 'react-router-dom'

export function LeftBar() {
    const navigate = useNavigate()
    return (
        <Box pl="45px" mt="19px">
            <Heading as="h3" size="2xl" color="green" pb="20px">
            circle
            </Heading>
            <UnorderedList ml="0px" listStyleType="none" fontSize="15px">
            <ListItem onClick={() => navigate('/home')} pb="20px" display="flex" alignItems="center" gap={2}><BiHome fontSize="25px"/>Home</ListItem>
            <ListItem pb="20px" display="flex" alignItems="center" gap={2}><BsSearch fontSize="25px"/>Search</ListItem>
            <ListItem onClick={() => navigate('/follow')} pb="20px" display="flex" alignItems="center" gap={2}><FaUserFriends fontSize="25px"/>Follows</ListItem>
            <ListItem pb="20px" display="flex" alignItems="center" gap={2}><CgProfile fontSize="25px"/>Profile</ListItem>
            </UnorderedList>
            <Button bg='green' w="60%" borderRadius="20px">Create Post</Button>
        </Box>
    )
}