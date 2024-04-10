import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const WishListCard = ({ blog, handleDelete }) => {

    const { _id, title, image, short_desc, category } = blog;

    

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={image}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{title}</Heading>

                    <Text py='2'>
                        {category}
                    </Text>
                    <Text py='2'>
                        {short_desc}
                    </Text>
                </CardBody>

                <CardFooter display={"flex"} gap={2}>
                    <Link to={`/blogDetails/${_id}`}><Button variant='solid' colorScheme='blue'>
                        Details
                    </Button></Link>
                    <Button onClick={() => handleDelete(_id)} variant='solid' colorScheme='red'>Remove</Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

WishListCard.propTypes = {
    blog: PropTypes.array,
    handleDelete: PropTypes.func
}


export default WishListCard;