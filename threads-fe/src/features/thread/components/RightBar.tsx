import { Heading, Box, Button, Text, Container, Image, Avatar } from '@chakra-ui/react'
import { RootState } from '../../../stores/types/rootState'
import { useSelector } from 'react-redux'

export function RightBar() {
    const auth = useSelector((state : RootState) => state.auth)

    return (
        <>
        <Box p="30px">
            <Container bgColor={'black'} p="20px" borderRadius={10}>
                <Heading as="h5" size='sm' color={'white'}>My Profile</Heading>
                <Box bgGradient='linear(to-l, #7928CA, #FF0080)' w="100%" h="80px" mt="20px" borderRadius="10px"></Box>
                <Image mt={-34} ml="14px" h="65px" borderRadius="50%" w="65px" objectFit={'cover'} src="https://kwikku.us/uploads/public/images/listicle/content/75187-listicle-20171212210259.jpg" />
                <Heading as="h5" size='md' color={'white'}>{auth.full_name}</Heading>
                <Text fontSize="12px" color={'grey'}>@{auth.username}</Text>
                <Text fontSize="14px" color={'white'}>{auth.profile_description}</Text>
                <Box fontSize="14px" color={'grey'} display="flex" justifyContent="space-between" w="43%">
                <Text w="47%" display="flex" justifyContent="space-between" color="grey"><p style={{color: "white", fontWeight: "bold"}}>32</p>Following</Text>
                <Text w="47%" display="flex" justifyContent="space-between" color="grey"><p style={{color: "white", fontWeight: "bold"}}>100</p>Follower</Text>
                </Box>
            </Container>
            <Container bgColor={'black'} p="20px" mt="10px" borderRadius={10}>
                <Heading as="h5" size='sm' color={'white'}>Suggested For You</Heading>
                <Box mt="3%" display="flex" justifyContent='space-between'>
                    <Avatar size="sm" name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <Box mr="53%">
                    <Text fontSize='xs' color={'white'}>Giyu Tomioka</Text>
                    <Text fontSize='xs' color={'grey'}>Nagi</Text>
                    </Box>
                    <Button size="xs">Following</Button>
                </Box>
                <Box mt="3%" display="flex" justifyContent='space-between'>
                    <Avatar size="sm" name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <Box mr="188px">
                    <Text fontSize='xs' color={'white'}>Sanemi Shinazugawa</Text>
                    <Text fontSize='xs' color={'grey'}>Kaze</Text>
                    </Box>
                    <Button size="xs">Follow</Button>
                </Box>
            </Container>
        </Box>
        </>
    )
}