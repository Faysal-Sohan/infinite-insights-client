import { Box, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
    return (
        <Box
            padding={12}
            shadow={"xl"}
            rounded={"lg"}
        >
            <Heading textAlign={"center"}
                textColor={"orange.400"}
                fontSize={"3xl"}
                fontWeight={"bold"}
                marginBottom={6}
            >About Us</Heading>
            <Text
                textAlign={"center"}
            >Welcome to Infinite Insights, your go-to destination for informative and inspiring content. We pride ourselves on delivering high-quality articles that cover a diverse range of topics, from technology and business to lifestyle and education. At Infinite Insights, we believe in the power of knowledge to transform lives. Our dedicated team of writers and experts work tirelessly to provide you with accurate and engaging content that enriches your understanding and keeps you informed. Join us on this journey of exploration and discovery. Thank you for choosing Infinite Insights as your source for insightful articles and valuable resources.</Text>
        </Box>
    );
};

export default AboutUs;