import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Avatar,
    Heading,
} from '@chakra-ui/react';
import PropType from "prop-types";
import { Link } from 'react-router-dom';

const FeaturedTable = ({ data }) => {

    return (
        <TableContainer>
            <Table variant='simple'>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th>SL No.</Th>
                        <Th>Title</Th>
                        <Th>Author</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((blog, idx) => <Tr key={blog?._id}>
                        <Td>{idx + 1}</Td>
                        <Td><Link to={`/blogDetails/${blog?._id}`}>{blog?.title}</Link></Td>
                        <Td>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name='blog' src={blog?.author?.photo} />
                                <Heading size='sm'>{blog?.author?.name}</Heading>
                            </Flex>
                        </Td>
                    </Tr>)}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

FeaturedTable.propTypes = {
    data: PropType.array
}

export default FeaturedTable;