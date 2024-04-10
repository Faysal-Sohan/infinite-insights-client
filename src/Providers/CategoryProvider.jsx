import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import PropTypes from 'prop-types';

export const CategoryContext = createContext();

const CategoryProvider = ({children}) => {

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: async() => {
            const resp = await fetch('https://infinte-insights-blog-server.vercel.app/categories');
            return resp.json();
        }
    })

    return (
        <CategoryContext.Provider value={data}>
            {children}
        </CategoryContext.Provider>
    );
};

CategoryProvider.propTypes = {
    children: PropTypes.node
}

export default CategoryProvider;