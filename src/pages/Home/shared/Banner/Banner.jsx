

const Banner = () => {
    return (
        <div className="relative w-full min-h-[600px]">
            <div>
                <img src="https://i.ibb.co/5R8Hx9M/banner.jpg" alt="" className="w-full h-full aspect-video absolute rounded-lg"/>
                <div className="bg-gradient-to-r from-transparent to-black w-full absolute h-full opacity-80 rounded-lg"></div>
                <div className="absolute bottom-1/2 right-0 pr-12 space-y-3 text-end">
                    <h3 className="text-3xl font-bold text-orange-300">Infinite Insights</h3>
                    <p className="text-xl font-medium text-white">Where Ideas Unite and Knowledge Takes Flight</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;