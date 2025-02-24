import Image from "next/image";
import StreakCard from "./bento-cards/StreakCard";
import AchievementsCard from "./bento-cards/AchievementsCard";
import DiscussionsCard from "./bento-cards/DiscussionsCard";
import PerspectiveCard from "./bento-cards/PerspectiveCard";

const Bento = () => {
  return (
    <section className="w-full min-h-[75vh] md:min-h-min md:h-[75vh]">
      <div className="mx-auto max-w-screen-xl h-full">
        <div className="grid grid-cols-1 gap-4 h-full sm:grid-cols-2 md:grid-cols-5">
          {/* Box 1 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 min-h-[40vh] md:min-h-min card-wrapper">
            <DiscussionsCard />
          </div>

          {/* Box 2 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 min-h-[40vh] md:min-h-min card-wrapper">
            <StreakCard />
          </div>

          {/* Box 3 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 h-full min-h-[40vh] md:min-h-min card-wrapper">
            <div className="group relative flex flex-col overflow-hidden rounded-lg card-content">
              <AchievementsCard />
            </div>
          </div>

          {/* Box 4 */}
          <div className="relative col-span-1 sm:col-span-2 md:col-span-3 h-full  min-h-[40vh] md:min-h-min card-wrapper">
            <PerspectiveCard />
          </div>
        </div>
      </div>
    </section>


  );
}

export default Bento;