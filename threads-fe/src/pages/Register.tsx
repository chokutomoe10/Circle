import { Heading, Container, Box, Flex, Input, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/authHooks'

export function Register() {

const {handleChange, handleRegister} = useRegister()
    return (
        <>
            <Container>
                <Box p="30px" mt="117px">
                    <Heading as="h3" size="2xl" color="green" pb="20px">circle</Heading>
                    <Text fontWeight="medium" fontSize="3xl" color="white" pb="20px">Create account Circle</Text>
                    <Flex flexDirection={'column'} gap={3}>
                        <Input name="full_name" placeholder='Fullname' onChange={handleChange} />
                        <Input name="username" placeholder='Username' onChange={handleChange} />
                        <Input name="email" placeholder='Email' type='email' onChange={handleChange} />
                        <Input name="password" placeholder='Password' type='password' onChange={handleChange} />
                        <Button onClick={handleRegister} bg={'green'} borderRadius="20px"><Text fontSize={'xl'}>Create</Text></Button>
                    </Flex>
                    <Flex gap={1}>
                        <Text mt="17px">Already have account?</Text>
                        <Link to={'/login'}>
                            <Text fontWeight={'bold'} color={'green'} mt="17px">Login</Text>
                        </Link>
                    </Flex>
                </Box>
            </Container>
        </>
    )
}