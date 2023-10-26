import { Card, CardHeader, CardFooter, Flex, Avatar, Box, Text, Button, HStack, Image } from '@chakra-ui/react'
import { IThreadCard } from "../../../interfaces/ThreadCard"
import { useNavigate } from 'react-router-dom'
import { API } from '../../../lib/api'
import { FaHeart } from 'react-icons/fa'

export default function ThreadCard(props: IThreadCard) {
    const navigate = useNavigate()

    const id = props.id
    
    async function handlePostLike() {
        try {
            await API.post('/like', { thread_id: id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
        } catch (error) {
            console.error('like thread failed', error);
        }
    }
    
    return (
      <>
        <Card maxW='lg'>
            <CardHeader>
                <Flex gap='5' flexWrap='wrap'>
                    <Box display='flex' gap='3'>
                        <Box>
                            <Avatar name='Segun Adebayo' src={props.user?.profile_picture} />
                        </Box>
                        <Box onClick={() => navigate(`/detail/${props.id}`)}>
                            <Box w='auto'>
                                <HStack spacing='10px'>
                                    <Text>{props.user?.full_name}</Text>
                                    <Text>@{props.user?.username}</Text>
                                    <Text>{props.created_at}</Text>
                                </HStack>
                            </Box>
                            <Box display='flex' flexDirection='column' gap='3'>
                                <Text>{props.content}</Text>
                                <Image src={props.image} />
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            </CardHeader>

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '136px',
                },
                }}
            >
                <Button flex='1' variant='ghost' onClick={() => {handlePostLike()}}>
                    <Flex alignItems={'center'} gap={'2'}>
                        <Box><FaHeart color={props.is_like ? "red" : "white"} /></Box>
                        <Box>{props.likes_count} Likes</Box>
                    </Flex>
                </Button>
                <Button flex='1' variant='ghost' onClick={() => navigate(`/detail/${props.id}`)} >
                    {props.replies_count} Replies
                </Button>
            </CardFooter>
        </Card>
      </>
    )
}