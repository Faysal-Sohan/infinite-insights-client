
// import Banner from "../shared/Banner/Banner";
import AboutUs from "../shared/AboutUs/AboutUs";
import Banner2 from "../shared/Banner/Banner2";
import Newsletter from "../shared/Newsletter/Newsletter";
import RecentBlogs from "../shared/RecentBlogs/RecentBlogs";
import Reviews from "../shared/Reviews/Reviews";

const Home = () => {

    return (
        <div className="mb-24">
            {/* <Banner></Banner> */}
            <Banner2></Banner2>
            <RecentBlogs></RecentBlogs>
            <Newsletter></Newsletter>
            <Reviews></Reviews>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;