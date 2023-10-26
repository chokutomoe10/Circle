import ThreadCard from '../features/thread/components/ThreadCard'
import { RightBar } from '../features/thread/components/RightBar'
import { Grid, Input, Box, Button  } from '@chakra-ui/react'
import { LeftBar } from '../features/thread/components/LeftBar'
import { useHook } from '../hooks/useHooks'

function Home () {
  const {threads,handleChange,createFetchData} = useHook();

  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          <LeftBar/>
          <Box>
            <form onSubmit={createFetchData} encType="multipart/form-data">
              <Input name="content" onChange={handleChange}/>
              <Input type='file' name="image" onChange={handleChange}/>
              <Button type='submit'>Post</Button>
            </form>
            {threads?.map((item, index) => {
              return(
                <ThreadCard key={index} user={item.user} id={item.id} author_full_name={item.author_full_name} content={item.content} image={item.image} created_at={item.created_at} likes={item.likes} is_like={item.is_like} likes_count={item.likes_count} replies_count={item.replies_count} />
              )
            })}
          </Box>
          <RightBar/>
      </Grid>
    </>
  )
}

export default Home