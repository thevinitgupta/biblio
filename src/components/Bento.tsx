import Image from "next/image";

const Bento = () => {
    return (
        <section className="w-full h-screen">
            <div className="mx-auto max-w-screen-xl h-4/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                    <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
                        <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                            <Image src={"/sleeping.svg"} alt="" className="absolute inset-0 h-max-full w-max-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out " objectFit="cover" layout="fill" />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                            <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Connect</h3>
                        </a>
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-2 h-full">
                        <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4 h-1/2">
                            <Image src={"/sleeping.svg"} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" objectFit="cover" layout="fill" />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                            <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Recommendations</h3>
                        </a>
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 h-[calc(50%-1rem)]">
                            <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                                <Image src={"/sleeping.svg"} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" objectFit="cover" layout="fill" />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Easy</h3>
                            </a>
                            <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                                <Image src={"/sleeping.svg"} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" objectFit="cover" layout="fill" />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Reviews</h3>
                            </a>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
                        <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                            <Image src={"/sleeping.svg"} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" objectFit="cover" layout="fill" />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                            <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Versatile</h3>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Bento;