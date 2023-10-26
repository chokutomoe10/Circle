import { Heading, Container, Box, Flex, Input, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/authHooks'

export function Login() {

const {handleChange, handleLogin} = useLogin()

    return (
        <>
            <Container>
                <Box p="30px" mt="117px">
                    <Heading as="h3" size="2xl" color="green" pb="20px">circle</Heading>
                    <Text fontWeight="medium" fontSize="3xl" color="white" pb="20px">Login to Circle</Text>
                    <Flex flexDirection={'column'} gap={3}>
                        <Input name="email" placeholder='Email' isRequired type='email' onChange={handleChange} />
                        <Input name="password" placeholder='Password' isRequired type='password' onChange={handleChange} />
                        <Text ml="auto">Forgot password?</Text>
                        <Button onClick={handleLogin} bg={'green'} borderRadius="20px"><Text fontSize={'xl'}>Login</Text></Button>
                    </Flex>
                    <Flex gap={1}>
                        <Text mt="17px">Don't have an account yet?</Text>
                        <Link to={'/'}>
                            <Text fontWeight={'bold'} color={'green'} mt="17px">Create account</Text>
                        </Link>
                    </Flex>
                </Box>
            </Container>
        </>
    )
}