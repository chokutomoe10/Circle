import { RightBar } from '../features/thread/components/RightBar'
import { Grid, Box, Button, Card, CardHeader, Flex, Avatar, HStack, Text, Image, Input } from '@chakra-ui/react'
import { LeftBar } from '../features/thread/components/LeftBar'
import { useParams } from 'react-router-dom'
import { IThreadCard } from '../interfaces/ThreadCard'
import { IReply } from '../interfaces/Reply'
import { API } from '../lib/api'
import { useEffect, useState } from 'react'

export default function Detail () {
  const {id} = useParams()
  const [thread, setThread] = useState<IThreadCard>()
  const [replies, setReplies] = useState<IReply[]>()
  
  async function getThreadDetail() {
    try {
      const response = await API.get(`/thread/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      })
      setThread(response.data)
    } catch (error) {
      console.error('get threadDetail data failed', error);
    }
  }

  async function getRepliesDetail() {
    try {
      const response = await API.get(`/replies?threadId=${id}`)
      setReplies(response.data)
    } catch (error) {
      console.error('get repliesDetail data failed', error);
    }
  }
  
  const [form, setForm] = useState<IReply>(
    {
      description: "",
      thread: thread,
    }
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    })
  }

  async function createReplyDetail() {
    try {
      await API.post(`/reply/${id}`, form)
    } catch (error) {
      console.error('create reply failed', error);
    }
  }

  useEffect(() => {
    getThreadDetail();
    getRepliesDetail();
  }, [replies])


  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <LeftBar/>
          <Card maxW='lg'>
            <CardHeader>
              <Flex gap='5' flexWrap='wrap'>
                <Box display='flex' gap='3'>
                  <Box>
                    <Avatar name='Segun Adebayo' src={thread?.user?.profile_picture} />
                  </Box>
                  <Box>
                    <Box w='auto'>
                      <HStack spacing='10px'>
                        <Text>{thread?.user?.full_name}</Text>
                        <Text>@{thread?.user?.username}</Text>
                        <Text>{thread?.created_at}</Text>
                      </HStack>
                    </Box>
                    <Box display='flex' flexDirection='column' gap='3'>
                      <Text>{thread?.content}</Text>
                      <Image src={thread?.image} />
                    </Box>
                  </Box>
                </Box>
              </Flex>
              <Box>
                <Box mt={'3'}>
                  <Flex gap={3}>
                    <Input name="description" onChange={handleChange}/>
                    <Button type='submit' onClick={createReplyDetail}>Post</Button>
                  </Flex>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={'3'} mt={'3'}>
                  {replies?.map((item, index) => {
                    return (
                      <>
                        <Box key={index} display='flex' gap='3'>
                          <Box>
                            <Avatar name='Segun Adebayo' src={thread?.user?.profile_picture} />
                          </Box>
                          <Box>
                            <Box>
                              <HStack spacing='10px'>
                                <Text>{item.user?.full_name}</Text>
                                <Text>@{item.user?.username}</Text>
                                <Text>{thread?.created_at}</Text>
                              </HStack>
                            </Box>
                            <Box display='flex' flexDirection='column' gap='3'>
                              <Text>{item.description}</Text>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    )
                  })}
                </Box>
              </Box>
            </CardHeader>
          </Card>
        <RightBar/>
      </Grid>
    </>
  )
}

