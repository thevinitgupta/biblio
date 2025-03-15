import { ReviewReactionType, ReviewReactionStringType, ReactionsMap } from "@/types/reaction";
import { useState, useEffect } from "react";

const initialReactions = {
    love: false,
    helpful: false,
    insightful: false,
    funny: false,
    agree: false,
  };

// TODO : Make reactions responsive - Open above instead of below and reduce size
const ReactionList = ({
    reactions,
    onReactionClick,
    initialUserReactions = [],
    reactionsMap
  }: {
    reactions: ReviewReactionType[];
    onReactionClick: (type: ReviewReactionStringType) => void;
    initialUserReactions?: ReviewReactionStringType[];
    reactionsMap : ReactionsMap;
  }) => {

    const [activeReactions, setActiveReactions] = useState(
  Object.fromEntries(
    Object.keys(initialReactions).map((reaction) => [
      reaction as ReviewReactionStringType,
      initialUserReactions.includes(reaction as ReviewReactionStringType),
    ])
  )
);

  const handleClick = (reactionType: ReviewReactionStringType) => {
    // Immediately toggle the reaction in our local state
    setActiveReactions(prev => {
        return {
            ...prev,
            [reactionType] : !prev[reactionType]
        }
    });

    
    // Call the API
    onReactionClick(reactionType);
  };

  

  return (
    <ul className="menu menu-sm dropdown-content bg-base-200 top-8 left-6 rounded-box z-[1] mt-3 min-w-min p-2 flex-row flex-nowrap border border-slate-500 border-opacity-40 gap-6 text-3xl">
      {reactions.map((reaction: ReviewReactionType, index: number) => (
        <li 
          key={`${reaction.type}-${activeReactions[reaction.type]}`}
          onClick={() => handleClick(reaction.type)}
          className={`flex flex-col items-center justify-center
            px-2 py-0 rounded-md border 
            ${activeReactions[reaction.type]
              ? 'border-slate-300' 
              : 'border-base-200'} 
            hover:border-slate-300
            transition-all duration-200
          `}
        >
          {reaction.emoji}
          <span className={`text-sm`}>{reactionsMap[reaction.type]}</span>
        </li>
      ))}
    </ul>
  );
  };
  

  export default ReactionList;