import Image from "next/image";


export default function DiscussionsCard() {
    return (
        <div
          
          className="relative rounded-2xl shadow-xl overflow-hidden card-content"
        >
          {/* Background Gradient */}
          {/* <div className="absolute bg-gradient from-orange-400 to-transparent w-[120%] h-[40%] z-10"></div> */}
    
          <div className="absolute z-10 w-72 h-56 bg-gradient-to-t from-slate-50 via-slate-100 to-slate-200 blur-3xl rounded-full"></div>
          <div className="absolute z-10 w-48 h-48 bg-gradient-to-t from-slate-50 via-slate-100 to-slate-200 blur-3xl rounded-full right-20 top-0"></div>
          <div className="absolute z-40 w-48 h-48 bg-gradient-to-t from-slate-50 via-slate-100 to-slate-200 blur-2xl rounded-full right-6 top-0"></div>
          <div className="absolute z-10 w-72 h-56 bg-gradient-to-t from-white via-slate-50 to-slate-200 blur-3xl rounded-full right-0 bottom-10"></div>
          <div className="absolute z-10 w-5/6 h-56 bg-gradient-to-t from-white via-slate-50 to-slate-200 blur-3xl rounded-full left-0 bottom-0"></div>
  
  
          
          <div className="absolute z-20 w-48 h-28 bg-gradient-to-t from-yellow-700/80 to-transparent blur-xl opacity-60 rounded-full -bottom-4 -right-10"></div>
          {/* <div className="absolute z-[25] w-4/6 h-4/5 bg-gradient-to-br from-black/80 via-black/60 to-transparent blur-xl opacity-60 rounded-full bottom-20 right-16"></div> */}
  
          {/* Noise Overlay */}
          <div className="absolute z-[15] inset-0 bg-lines"></div>
  
          {/* Central Text */}
          <div className="relative flex flex-col items-center justify-center text-center w-full h-full">
           <div className="h-[75%] max-h-[520px] flex justify-center items-center">
          <img
            src={"/post_tile.png"}
            alt=""
            className="h-[75%] relative object-contain z-[30] rounded-2xl shadow-2xl shadow-amber-600/45"
            />
            </div> 

            <div className="relative w-full flex flex-col items-center justify-center space-y-2 z-50">
              <p className="w-full text-xl text-left text-[#021127ff] font-poppins p-4 ml-4">
                <span className="font-bold">Reader's Corner.</span> Join the discussion to share your thoughts!
              </p>
              
            </div>
          </div>
        </div>
  
    );
  }
  