import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Blog from "../Blog/Blog";

const RecentBlogs = () => {

    const { data } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: () => axios.get('https://infinte-insights-blog-server.vercel.app/recentBlogs', { withCredentials: true})
            .then(res => res.data)
    })
    console.log(data)
    return (
        <div className="my-12">
            <h3 className="text-3xl text-orange-400 font-bold my-8">Recent Blogs</h3>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 place-items-center">
                {
                    data?.map(blog => <Blog key={blog._id} blog={blog}></Blog>)
                }
            </div>
        </div>
    );
};

export default RecentBlogs;