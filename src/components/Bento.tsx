import Image from "next/image";
import StreakCard from "./bento-cards/StreakCard";
import AchievementsCard from "./bento-cards/AchievementsCard";
import DiscussionsCard from "./bento-cards/DiscussionsCard";
import PerspectiveCard from "./bento-cards/PerspectiveCard";

const Bento = () => {
    return (
        <section className="w-full h-[75vh]">
  <div className="mx-auto max-w-screen-xl h-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
      {/* Box 1 */}
      <div className="col-span-2 sm:col-span-1 md:col-span-3 card-wrapper">
        <DiscussionsCard/>
      </div>

      {/* Box 2 */}
      <div className="col-span-2 sm:col-span-1 md:col-span-2 card-wrapper">
        <StreakCard/>
      </div>

      {/* Box 3 */}
      <div className="col-span-2 sm:col-span-1 md:col-span-2 h-full card-wrapper">
        <div
          
          className="group relative flex flex-col overflow-hidden rounded-lg card-content"
        >
          {/* <Image
            src={"/achieve.jpg"}
            alt=""
            className="absolute inset-0 h-[90%] w-[90%] object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
            objectFit="cover"
            layout="fill"
          /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div> */}
          <AchievementsCard/>
        </div>
      </div>
      {/* Box 4 */}
      <div className="relative col-span-2 sm:col-span-2 md:col-span-3 h-full card-wrapper">
      <PerspectiveCard/>
      </div>

      
      
    </div>
  </div>
</section>


    );
}

export default Bento;