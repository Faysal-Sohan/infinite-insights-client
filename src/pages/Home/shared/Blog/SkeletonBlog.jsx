import { Box, Card, CardBody, CardFooter, CardHeader, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const SkeletonBlog = ({ count }) => {

    return (
        Array(count).fill(1).map(idx => <Card key={idx} width='full'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <SkeletonCircle size='10' />
                        <Box>
                            <SkeletonText mt='4' noOfLines={1} width={20} />
                            <SkeletonText mt='4' noOfLines={1} width={10} />
                        </Box>
                    </Flex>
                    <Box>
                        <SkeletonText mt='4' noOfLines={1} width={30} />
                        <SkeletonText mt='4' noOfLines={1} width={40} />
                    </Box>
                </Flex>
            </CardHeader>
            <Skeleton
                width={"full"}
                height={400}
            ></Skeleton>
            <CardBody>
                <SkeletonText mt='4' noOfLines={1} width={40} />
                <SkeletonText mt='4' noOfLines={1} width={10} />
                <SkeletonText mt='4' noOfLines={2} spacing={2} />
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
                <SkeletonText mt='4' noOfLines={1} width={40} />
                <SkeletonText mt='4' noOfLines={1} width={40} />
            </CardFooter>
        </Card>)

    );
};

export default SkeletonBlog;