import { Avatar, Box, Card, CardBody, CardHeader, CloseButton, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider";
import PropTypes from "prop-types";


const Comments = ({ newCommentId, blog_id }) => {

    console.log('comment for blog', blog_id)
    const [deletedCommentId, setDeletedCommentId] = useState('');
    const toast = useToast();
    const { user } = useContext(AuthContext);

    const { isLoading, data } = useQuery({
        queryKey: ['comments', newCommentId, deletedCommentId],
        queryFn: async () => {
            const res = await axios.get(`https://infinte-insights-blog-server.vercel.app/comments/${blog_id}`, {withCredentials: true});
            return res.data;
        }
    })

    const handleCommentDelete = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`https://infinte-insights-blog-server.vercel.app/comment/${id}`, { withCredentials: true})
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            setDeletedCommentId(id);
                            toast({
                                title: `Your comment is deleted!`,
                                status: "success",
                                isClosable: true,
                            })
                        }
                    })
            }
        })

    }

    console.log(data)

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={"full"}
            gap={6}
        >
            {
                !isLoading ?
                    data?.map(comment => <Card key={comment._id}>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='Segun Adebayo' src={comment?.photo} />
                                    <Box>
                                        <Heading size='sm'>{comment?.userName}</Heading>
                                        <Text>{comment?.email}</Text>
                                    </Box>
                                </Flex>
                                {
                                    user.email === comment.email ?
                                        <Box>
                                            <CloseButton onClick={() => handleCommentDelete(comment._id)} size='sm' />
                                        </Box>
                                        :
                                        undefined
                                }
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>
                                {comment?.comment}
                            </Text>
                        </CardBody>
                    </Card>)
                    :
                    undefined
            }
        </Box>
    );
};

Comments.propTypes = {
    newCommentId: PropTypes.string,
    blog_id: PropTypes.string
}

export default Comments;