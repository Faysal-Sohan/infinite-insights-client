import { Box, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <Box display={"flex"}
            flexDirection={"column"}
            justifyItems={"center"}
            alignItems={"center"}
            >
            <Image src="https://i.ibb.co/VCkDrH1/20824298-6342464.jpg"
                height="90vh"
                width={"full"}
            >
            </Image>
            <Link to={-1}><Button>Go Back</Button></Link>
        </Box>
    );
};

export default ErrorPage;