import Image from "next/image";


export default function PerspectiveCard() {
    return (
        <div

            className="relative rounded-2xl shadow-xl overflow-hidden card-content"
        >
            {/* Background Gradient */}
            {/* <div className="absolute bg-gradient from-orange-400 to-transparent w-[120%] h-[40%] z-10"></div> */}

            <div className="absolute z-10 w-56 h-56 bg-gradient-to-t from-slate-100 via-slate-400 to-slate-600 blur-3xl opacity-60 rounded-full -top-10 -left-10 hidden md:block"></div>
            <div className="absolute z-10 w-56 h-56 bg-gradient-to-t from-white via-slate-200 to-slate-400 blur-3xl opacity-60 rounded-full -top-16 -right-10 hidden md:block"></div>



            <div className="absolute z-20 w-48 h-28 bg-gradient-to-t from-yellow-700/80 to-transparent blur-xl opacity-60 rounded-full -bottom-10 -right-10"></div>
            <div className="absolute z-[25] w-4/6 h-4/5 bg-gradient-to-br from-black/80 via-black/60 to-transparent blur-xl opacity-60 rounded-full bottom-20 right-16 "></div>

            {/* Noise Overlay */}
            {/* <div className="absolute z-10 inset-0 bg-squares"></div> */}

            {/* Central Text */}
            <div className="relative flex flex-col items-center justify-center text-center w-full h-full perspective-1000">
                
            <div className="absolute z-20 w-48 h-56 bg-gradient-to-t from-yellow-700/80 to-amber-600/70 blur-2xl opacity-60 rounded-full top-10 left-10  hidden md:block"></div>
            <div className="absolute z-10 w-48 h-56 bg-gradient-to-t from-red-400/80 to-red-600/80 blur-2xl opacity-60 rounded-full top-10 right-10 hidden md:block"></div>
            <div className="absolute z-20 w-72 h-72 bg-gradient-to-t from-cyan-700/80 to-blue-600/80 blur-2xl opacity-60 rounded-full top-4 left-[30%]"></div>

                
                <div className="w-[90%] h-[75%] flex justify-center items-center z-50">
                    {/* Image 1 */}
                    <div className="h-full max-h-[200px] hidden md:flex justify-center items-center relative z-30 rounded-2xl overflow-hidden rotate-y-20 ">
                        <img
                            src={"/book_yellow.png"}
                            alt=""
                            className="h-full relative object-cover"
                        />
                        
                    </div>
                    {/* Image 2 */}
                    <div className="h-full max-h-[200px] flex justify-center items-center relative z-50 shadow-xl rounded-2xl overflow-hidden">
                        <img
                            src={"/book_blue.jpg"}
                            alt=""
                            className="h-full relative object-cover"
                        />
                        
                    </div>

                    {/* Image 3  */}
                    <div className="h-full max-h-[200px] hidden md:flex justify-center items-center relative rounded-2xl overflow-hidden z-30  -rotate-y-20">
                        <img
                            src={"/book_red.png"}
                            alt=""
                            className="h-full relative object-cover"
                        />
                        
                    </div>
                </div>
                <div className="relative w-full flex flex-col items-center justify-center space-y-2 z-50">
                    <p className="w-full text-sm  md:text-xl text-left text-[#fffcff]/80 font-poppins p-4 ml-4">
                        <span className="font-bold">Find Your Tribe.</span> Join book lovers who share your taste and explore curated book clubs tailored to you.
                    </p>

                </div>
            </div>
        </div>
    );
}
