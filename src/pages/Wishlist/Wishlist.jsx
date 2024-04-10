import { Box, Grid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WishListCard from "./WishListCard";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";


const Wishlist = () => {

    const [deletedBlog, setDeletedBlog] = useState('')

    const { data } = useQuery({
        queryKey: ['wishlist', deletedBlog],
        queryFn: async () => {
            const res = await axios.get('https://infinte-insights-blog-server.vercel.app/wishList', { withCredentials: true })
            return res.data;
        }
    })

    const handleDelete = (id) => {
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
                axios.delete(`https://infinte-insights-blog-server.vercel.app/wishList/${id}`, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            setDeletedBlog(id)
                            toast("Removed from wishlist!")
                        }
                    })
            }
        })
    }

    return (
        <Box marginY={12}
            minHeight={"100vh"}
            >
            <Text
                bgGradient='linear(to-l, orange.300, orange.400)'
                bgClip='text'
                fontSize='3xl'
                fontWeight='extrabold'
                marginBottom={6}
            >Your Wishlist</Text>
            <Grid
                templateColumns={"repeat(2, 1fr)"}
                gap={4}
            >
                {
                    data?.length === 0 ? <Text
                        fontSize={"xl"}
                        fontWeight={"medium"}
                    >Nothing at your wishlist.</Text>
                    :
                    data?.map(blog => <WishListCard key={blog._id} blog={blog} handleDelete={handleDelete}></WishListCard>)
                }
            </Grid>
        </Box>
    );
};

export default Wishlist;