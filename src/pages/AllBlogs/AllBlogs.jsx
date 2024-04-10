import { Box, Button, CloseButton, Flex, FormControl, FormLabel, Grid, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CategoryContext } from "../../Providers/CategoryProvider";
import { BiFilter } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Blog from "../Home/shared/Blog/Blog";
import SkeletonBlog from "../Home/shared/Blog/SkeletonBlog";

const AllBlogs = () => {

    const [filterCategory, setFilterCategory] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const categories = useContext(CategoryContext);

    const { isLoading, data } = useQuery({
        queryKey: ['allBlogs', searchInput, filterCategory],
        queryFn: async () => {
            const encodedCategory = encodeURIComponent(filterCategory);
            const res = await axios.get(`https://infinte-insights-blog-server.vercel.app/blogs?title=${searchInput}&category=${encodedCategory}`);
            return res.data;
        }
    });

    console.log(data);

    return (
        <Box
            marginY={12}
        >
            <Flex
                align={{ base: "start", md: "center" }}
                direction={{ base: 'column-reverse', md: 'row' }}
                justify="space-between"
                marginBottom={8}
            >
                <Box>
                    <FormControl>
                        <FormLabel>Search your blog</FormLabel>
                        <Input
                            placeholder="Search here"
                            name="search"
                            type="text"
                            width={{ md: "200px", sm: "100px" }}
                            rounded="xl"
                            onKeyUp={(e) => setSearchInput(e.currentTarget.value)}
                        >
                        </Input>
                    </FormControl>
                </Box>
                <Box
                    display="flex"
                    flex={{ base: "row-reverse", md: "row" }}
                    alignItems="center"
                    gap={4}
                >
                    {
                        filterCategory ?
                            <Text
                                bgColor="green.500"
                                padding={1}
                                textColor="white"
                                fontWeight="semibold"
                                rounded="lg"
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                {filterCategory}
                                <CloseButton size='sm' onClick={() => setFilterCategory('')} />
                            </Text>
                            : undefined
                    }

                    <Menu closeOnSelect={true}>
                        <MenuButton as={Button} colorScheme='orange'>
                            <Text
                                display="flex"
                                justifyItems='center'
                                alignItems="center"
                                gap="8px"
                                fontSize={18}
                            ><BiFilter></BiFilter> Filter</Text>
                        </MenuButton>
                        <MenuList minWidth='240px'>
                            <MenuOptionGroup title='Category' defaultValue={filterCategory} type='radio'>
                                {
                                    categories.map(item => <MenuItemOption key={item._id} value={item.category} onClick={() => setFilterCategory(item.category)}>{item.category}</MenuItemOption>)
                                }
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
            <Text
                bgGradient='linear(to-l, orange.300, orange.400)'
                bgClip='text'
                fontSize='3xl'
                fontWeight='extrabold'
                marginBottom={6}
            >
                {
                    searchInput || filterCategory ? "Search results" : "All Blogs"
                }
            </Text>
            <Grid
                templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
                gap={6}
            >
                {
                    isLoading ? <SkeletonBlog count={6}></SkeletonBlog> :
                        data?.map(blog => <Blog key={blog._id} blog={blog}></Blog>)
                }
            </Grid>
        </Box>
    );
};

export default AllBlogs;