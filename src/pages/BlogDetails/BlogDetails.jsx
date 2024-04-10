import { Avatar, Box, Button, Divider, Flex, Heading, Image, Text, Textarea, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Comments from "./shared/Comments/Comments";


const BlogDetails = () => {

    const { id } = useParams();
    const [comment, setComment] = useState('');
    const { user } = useContext(AuthContext);
    const toast = useToast();
    const [newCommentId, setNewCommentId] = useState('');

    const { data } = useQuery({
        queryKey: ['blogDetails'],
        queryFn: async () => {
            const res = await axios.get(`https://infinte-insights-blog-server.vercel.app/blog/${id}`, {withCredentials: true})
            return res.data;
        }
    })

    const handleCommentPost = () => {
        const userComment = { userName: user.displayName, email: user.email, photo: user.photoURL, blog_id: data?._id,comment };
        axios.post('https://infinte-insights-blog-server.vercel.app/addComment', userComment, { withCredentials: true })
            .then(res => {
                setNewCommentId(res.data.insertedId);
                if(res.data.insertedId) {
                    toast({
                        title: `Your comment is posted!`,
                        status: "success",
                        isClosable: true,
                      })
                }
                console.log(res.data)})
    }

    const published_on = new Date(data?.posted_on).toLocaleString();
    console.log(data)

    return (
        <Box
            marginY={8}
        >
            <Box position={"relative"}
                height={{ lg: "800px" }}
            >
                <Image
                    src={data?.image}
                    rounded={"lg"}
                    marginBottom={4}
                    width={"full"}
                    height={"full"}
                    objectFit={"cover"}
                ></Image>
                <Box position={"absolute"}
                    bottom={0}
                    width={"full"}
                    height={"100px"}
                    bgColor={"blackAlpha.700"}
                    textColor={"white"}
                    padding={6}
                    alignContent={"center"}
                    roundedBottom={"lg"}
                >
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='blog' src={data?.author?.photo} />
                            <Box>
                                <Heading size='sm'>{data?.author?.name}</Heading>
                                <Text>Author</Text>
                            </Box>
                        </Flex>
                        <Box>
                            <Text align='end' fontWeight='bold'>Published On</Text>
                            <Text>{published_on}</Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Heading marginY={4}>{data?.title}</Heading>
            <Text
                marginBottom={4}
                bgColor={'green.400'}
                width={"max-content"}
                padding={2}
                rounded={"xl"}
                textColor={"white"}
                fontWeight={"bold"}
            >{data?.category}</Text>
            <Text align="justify">{data?.long_desc}</Text>

            {
                user.email === data?.author?.email ? 
                <Link to={`/updateBlog/${data._id}`}><Button marginTop={4} bgColor={"orange.400"} textColor={"white"}>Update</Button> </Link>
                : undefined
            }

            <Text fontWeight={"bold"}
                fontSize={"20px"}
                marginY={3}
            >Comments</Text>
            <Divider />
            {
                user.email !== data?.author?.email ?
                    <Box
                        marginY={6}
                    >
                        <Flex
                            gap={2}
                            alignItems={"center"}
                        >
                            <Box>
                                <Avatar name='blog' src={data?.author?.photo} />
                            </Box>
                            <Box flexGrow={1} height={"full"}>
                                <Textarea name="comment" onKeyUp={(e) => setComment(e.currentTarget.value)} placeholder='Write your comment' />
                            </Box>
                            <Box display={"flex"}
                                flexDirection={"column"}
                                gap={2}>
                                <Button onClick={handleCommentPost}>Post</Button>
                            </Box>
                        </Flex>
                    </Box>
                    : 
                    <Text marginY={6}>You can not comment in your own blog.</Text>
            }
            <Comments newCommentId={newCommentId} blog_id={id}></Comments>
        </Box>
    );
};

export default BlogDetails;