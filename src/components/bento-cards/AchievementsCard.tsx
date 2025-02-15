import Image from "next/image";


export default function AchievementsCard() {
    return (
        <div
          
          className="relative rounded-2xl shadow-xl overflow-hidden card-content"
        >
          {/* Background Gradient */}
          {/* <div className="absolute bg-gradient from-orange-400 to-transparent w-[120%] h-[40%] z-10"></div> */}
    
          <div className="absolute z-10 w-56 h-56 bg-gradient-to-t from-slate-100 via-slate-400 to-slate-600 blur-3xl opacity-60 rounded-full -top-10 -left-10"></div>
          <div className="absolute z-10 w-56 h-56 bg-gradient-to-t from-white via-slate-200 to-slate-400 blur-3xl opacity-60 rounded-full -top-16 -right-10"></div>
  
  
          
          <div className="absolute z-20 w-48 h-28 bg-gradient-to-t from-yellow-700/80 to-transparent blur-xl opacity-60 rounded-full -bottom-10 -right-10"></div>
          <div className="absolute z-[25] w-4/6 h-4/5 bg-gradient-to-br from-black/80 via-black/60 to-transparent blur-xl opacity-60 rounded-full bottom-20 right-16"></div>
  
          {/* Noise Overlay */}
          <div className="absolute z-10 inset-0 bg-squares"></div>
  
          {/* Central Text */}
          <div className="relative flex flex-col items-center justify-center text-center w-full h-full">
            
          <img
            src={"/achieve.png"}
            alt=""
            className="h-[60%] md:h-[75%] relative object-contain z-[30]"
          />

            <div className="relative w-full flex flex-col items-center justify-center space-y-2">
              <p className="w-full text-sm md:text-xl text-left text-[#fffcff]/80 font-poppins p-4">
                <span className="font-bold">Achievements Unlocked.</span> Celebrate Your Reading Milestones!
              </p>
              
            </div>
          </div>
        </div>
  
    );
  }
  