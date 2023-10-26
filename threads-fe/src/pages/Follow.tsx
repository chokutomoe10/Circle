import { RightBar } from '../features/thread/components/RightBar'
import { Grid, Box, Button, Flex, Avatar, Text, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import { LeftBar } from '../features/thread/components/LeftBar'
import { followHook } from '../hooks/followHooks'
import { API } from '../lib/api'

export default function Following () {
  const { follower, followed } = followHook()

  async function postFollow(id: number | undefined) {
    try {
      await API.post('/follow', { idUser: id })
    } catch (error) {
      console.error('Post Following failed');
    }
  }

  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <LeftBar/>
          <Tabs isFitted variant="enclosed" width="490px" marginTop={"20px"}>
            <TabList mb="1em">
              <Tab>
                Followers
              </Tab>
              <Tab>
                Followings
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex flexDirection={'column'} gap={'3'}>
                  {follower?.map((item, index) => {
                    return (
                      <>
                        <Box key={index} display={'flex'} justifyContent={'space-between'}>
                          <Flex gap={'3'}>
                            <Avatar size={'md'} name='Segun Adebayo' src={item.follower.profile_picture} />
                            <Flex flexDirection={'column'}>
                              <Text>{item.follower.full_name}</Text>
                              <Text>@{item.follower.username}</Text>
                            </Flex>
                          </Flex>
                          <Box>
                            <Button onClick={() => {postFollow(item.follower.id)}}>
                              <Text>{item.is_follow ? "Unfollow" : "Follow"}</Text>
                            </Button>
                          </Box>
                        </Box>
                      </>
                    )
                  })}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex flexDirection={'column'} gap={'3'}>
                  {followed?.map((item, index) => {
                    return (
                      <>
                        <Box key={index} display={'flex'} justifyContent={'space-between'}>
                          <Flex gap={'3'}>
                            <Avatar size={'md'} name='Segun Adebayo' src={item.followed.profile_picture} />
                            <Flex flexDirection={'column'}>
                              <Text>{item.followed.full_name}</Text>
                              <Text>@{item.followed.username}</Text>
                            </Flex>
                          </Flex>
                          <Box>
                            <Button onClick={() => {postFollow(item.followed.id)}}>
                              <Text>Unfollow</Text>
                            </Button>
                          </Box>
                        </Box>
                      </>
                    )
                  })}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        <RightBar/>
      </Grid>
    </>
  )
}

