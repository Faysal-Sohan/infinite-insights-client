import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { BiSolidBookAdd, BiSolidDetail } from "react-icons/bi";
import PropType from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Blog = ({ blog }) => {

    const { _id, title, image, short_desc, posted_on, author, category } = blog;
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const published_on = new Date(posted_on).toLocaleString();
    const navigate = useNavigate();

    const handleAddToWishList = () => {
        if (!user) {
            navigate('/login', { state: location?.pathname})
        }
        else {
            axios.post('https://infinte-insights-blog-server.vercel.app/wishList', blog, { withCredentials: true})
                .then(res => {
                    console.log(res.data);
                    if(res.data.insertedId) {
                        toast("Successfully Added to Wishlist")
                    }
                })
        }
    }

    return (
        <Card width='full'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='blog' src={author?.photo} />
                        <Box>
                            <Heading size='sm'>{author?.name}</Heading>
                            <Text>Author</Text>
                        </Box>
                    </Flex>
                    <Box>
                        <Text align='end' fontWeight='bold'>Published On</Text>
                        <Text>{published_on}</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <Image
                objectFit='cover'
                height={400}
                src={image}
                alt='Chakra UI'
            />
            <CardBody>
                <Heading size='md'>{title}</Heading>
                <Text
                    bgColor="purple.600"
                    paddingX={2}
                    textColor="white"
                    fontWeight="semibold"
                    rounded="lg"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    width="max-content"
                    marginY={2}
                >
                    {category}
                </Text>
                <Text>
                    {short_desc}
                </Text>
            </CardBody>
            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Link to={`/blogDetails/${_id}`}><Button flex='1' variant='ghost' leftIcon={<BiSolidDetail />}>
                    Details
                </Button></Link>
                <Button onClick={handleAddToWishList} flex='1' variant='ghost' leftIcon={<BiSolidBookAdd />}>
                    Add to wishlist
                </Button>
            </CardFooter>
        </Card>
    );
};

Blog.propTypes = {
    blog: PropType.object
}

export default Blog;