import { Box, Heading, Image, Text } from "@chakra-ui/react";


const Banner2 = () => {
    return (
        <Box
            position="relative"
            width="full"
            minH="600px"
        >
            <Image
                position="absolute"
                width="full"
                height="full"
                rounded="lg"
                src="https://i.ibb.co/5R8Hx9M/banner.jpg"
            />
            <Box
                width="full"
                height="full"
                bgGradient="linear(to-r, blackAlpha.100, blackAlpha.700)"
                position="absolute"
                rounded="lg"
            />
            <Box
                position="absolute"
                textColor="white"
                bottom="50%"
                right="12"
                textAlign="end"
            >
                <Heading
                 textColor="orange.300"
                >Infinite Insights</Heading>
                <Text
                    fontSize="3xl"
                    maxW={{lg: "full", md: "lg", sm: "lg"}}
                >Where Ideas Unite and Knowledge Takes Flight</Text>
            </Box>
        </Box>
    );
};

export default Banner2;