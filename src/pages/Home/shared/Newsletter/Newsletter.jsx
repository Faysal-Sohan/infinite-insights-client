import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


const Newsletter = () => {

    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        const user = { email };
        axios.post('https://infinte-insights-blog-server.vercel.app/subscribe', user)
        .then(res => {
            if(res.data.insertedId) {
                toast("Successfully subscribed!")
            }
        })
    }

    return (
        <Box padding={12}
            shadow={"lg"}
            rounded={"lg"}
            display={"flex"}
            flexDirection={"column"}
            justifyItems={"center"}
            alignItems={"center"}
            width={"full"}
        >
            <Heading textAlign={"center"}
                textColor={"orange.400"}
                fontSize={"3xl"}
                fontWeight={"bold"}
                marginBottom={6}
            >Subscribe</Heading>
            <Text
                textAlign={"center"}
                marginBottom={4}
            >Sign up with your email address to receive our email and updates.</Text>
            <Box
                display={"flex"}
                justifyItems={"center"}
                alignItems={"center"}
                marginBottom={6}
                width={{base: "full", md: "80%", lg: "50%"}}
            >
                <Input 
                roundedRight={0}
                onKeyUp={(e) => setEmail(e.currentTarget.value)} 
                type="email"
                placeholder="Type your email"></Input>
                <Button 
                onClick={handleSubscribe}
                colorScheme="linkedin"
                roundedLeft={0}
                >Subscribe</Button>
            </Box>
        </Box>
    );
};

export default Newsletter;