import { Rubik_Lines, Frijole } from 'next/font/google';

const rubikLines = Rubik_Lines({
  weight: '400', // Only one weight available
  subsets: ['latin'],
  display: 'swap',
});

const frijole = Frijole({
  weight: '400', // Only one weight available
  subsets: ['latin'],
  display: 'swap',
});
export default function StreakCard() {
  return (
      <div
        
        className="relative rounded-2xl shadow-xl overflow-hidden card-content"
      >
        {/* Background Gradient */}
        {/* <div className="absolute bg-gradient from-orange-400 to-transparent w-[120%] h-[40%] z-10"></div> */}
  
        <div className="absolute z-10 w-28 h-28 bg-gradient-to-t from-white via-slate-50 to-slate-200 blur-xl opacity-60 rounded-full -top-10 -left-10"></div>
        <div className="absolute z-20 w-60 h-56 bg-gradient-to-br from-slate-200 via-slate-300 to-transparent blur-3xl opacity-60 rounded-full -top-2 -left-10"></div>
        <div className="absolute z-10 w-56 h-56 bg-gradient-to-t from-white via-slate-200 to-slate-400 blur-3xl opacity-60 rounded-full -top-16 -right-10"></div>
        <div className="absolute z-10 w-56 h-56 bg-gradient-to-t from-white via-slate-200 to-slate-400 blur-3xl opacity-60 rounded-full -top-16 -right-10"></div>


        <div className="absolute w-[100%] h-72 bg-gradient-to-t from-yellow-400 via-amber-600 to-orange-500 blur-3xl opacity-60 rounded-full top-2/4"></div>

        <div className="absolute z-20 w-48 h-28 bg-gradient-to-t from-yellow-400 to-yellow-600 blur-xl opacity-60 rounded-full -bottom-10 left-1/3"></div>

        <div className="absolute z-40 w-48 h-28 bg-gradient-to-t from-yellow-700/80 to-transparent blur-xl opacity-60 rounded-full bottom-20 left-4"></div>

        {/* Noise Overlay */}
        <div className="absolute z-10 inset-0 bg-noise"></div>

        {/* Central Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className={`relative z-[25] -left-10 text-[15rem] md:text-[28rem] font-extrabold text-[#021127ff] ${frijole.className}`}>
        <span
          className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#021127ff] via-[#021127ff]  to-slate-200/5 z-10"
          aria-hidden="true"
        >
          1
        </span>
        <span className="relative text-[#021127ff]">1</span>
      </div>
          <div className="absolute z-30 inset-0 flex flex-col items-center justify-center space-y-2 w-3/4 mx-auto -bottom-20 text-[#021127ff]">
            <p className="w-full text-2xl text-right font-bold tracking-wide">
              PAGE
            </p>
            <p className="w-full text-2xl text-right font-bold  tracking-wide">
              PER
            </p>
            
            <p className="w-full text-2xl text-right font-bold  tracking-wide">
              DAY
            </p>
            <p className="w-full text-2xl text-right font-bold tracking-wide">
              ATLEAST
            </p>
          </div>
        </div>
      </div>

  );
}
