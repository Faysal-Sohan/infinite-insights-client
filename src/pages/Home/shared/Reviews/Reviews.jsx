import { Avatar, Box, Card, CardBody, CardHeader, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Reviews = () => {

    const { data } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axios.get('https://infinte-insights-blog-server.vercel.app/reviews')
            return res.data
        }
    })

    return (
        <Box
            marginY={12}
        >
            <Text
                textColor={"orange.400"}
                fontSize={"3xl"}
                fontWeight={"bold"}
                textAlign={"center"}
                marginBottom={6}
            >Readers Reviews</Text>
            <Grid
                templateColumns={{base: 'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(4, 1fr)'}}
                gap={3}
            >
                {
                    data?.map(review => <Card key={review._id} maxW='md'>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='Segun Adebayo' src={review.image} />

                                    <Box>
                                        <Heading size='sm'>{review.name}</Heading>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>
                                {review.comment}
                            </Text>
                        </CardBody>
                    </Card>)
                }
            </Grid>
        </Box>
    );
};

export default Reviews;