import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { CategoryContext } from "../../Providers/CategoryProvider";

const AddBlog = () => {

    const { user } = useContext(AuthContext);
    const categories = useContext(CategoryContext);

    const getCurrentDateTime = () => {
        const now = new Date();
        const day = String(now.getUTCDate()).padStart(2, '0');
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const year = now.getUTCFullYear();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        return dateTimeString;
    }

    const handleAddBlog = e => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.value;
        const title = form.title.value;
        const category = form.category.value;
        const short_desc = form.short_desc.value;
        const long_desc = form.long_desc.value;
        const posted_on = getCurrentDateTime();
        const blog = {
            title, image, category, short_desc, long_desc, posted_on,
            author: {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
            }
        };
        axios.post('https://infinte-insights-blog-server.vercel.app/addBlog', blog, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                form.reset();
                toast('Blog is posted successfully!')
            })
        console.log(blog);
    }

    return (
        <div>
            <h3 className="text-3xl font-bold my-12 text-center text-orange-400">Add Blog</h3>
            <div className="w-2/3 mx-auto shadow-xl rounded-lg mb-12">
                <form onSubmit={handleAddBlog} className="card-body">
                    {/* Blog Cover */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Blog Cover</span>
                        </label>
                        <input type="text" name="image" placeholder="image_url" className="input input-bordered" required />
                    </div>
                    {/* Blog Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Blog Title</span>
                        </label>
                        <input type="text" name="title" placeholder="title" className="input input-bordered" required />
                    </div>
                    {/* Category Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Category</span>
                        </label>
                        <select name="category" className="label-text select select-bordered w-full">
                            <option disabled selected>Select a category</option>
                            {
                                categories?.map(category => <option key={category._id}>{category.category}</option>)
                            }
                        </select>
                    </div>

                    {/* Short description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Short description</span>
                        </label>
                        <input type="text" name="short_desc" placeholder="short_description" className="input input-bordered" required />
                    </div>
                    {/* Long Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Long Description</span>
                        </label>
                        {/* <input type="text" name="description" placeholder="description" className="input input-bordered" required /> */}
                        <textarea name="long_desc" placeholder="long_description" className="textarea textarea-bordered textarea-md w-full" ></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value={'Submit'} className="btn bg-orange-400 text-white normal-case hover:text-black" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;