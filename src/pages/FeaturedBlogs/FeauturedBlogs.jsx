import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import FeaturedTable from "./FeaturedTable";
import axios from "axios";


const FeauturedBlogs = () => {

    const { isLoading, data } = useQuery({
        queryKey: ['featuredBlogs'],
        queryFn: async () => {
            const res = await axios.get('https://infinte-insights-blog-server.vercel.app/featuredBlogs');
            return res.data
        }
    })
    return (
        <Box
            marginY={12}
        >
            <Heading
                bgGradient='linear(to-l, orange.300, orange.400)'
                bgClip='text'
                fontSize='3xl'
                fontWeight='extrabold'
                marginBottom={6}
            >Featured Blogs</Heading>
            {
                isLoading ? undefined :
                <FeaturedTable data={data}></FeaturedTable>
            }
        </Box>
    );
};

export default FeauturedBlogs;