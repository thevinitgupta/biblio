import { ReviewReactionStringType, EntityType } from "@/types/reaction";
import useToggleReaction from "./useToggleReaction";

const useReactionHandler = (postId: string) => {
    const { 
      mutateAsync: toggleReaction, 
      isPending,
      error 
    } = useToggleReaction({ entityId: postId});
  
    const handleReaction = async (reactionType: ReviewReactionStringType, entityType? : EntityType) => {
      try {
        console.log("Handle Reaction called : "+entityType)
        await toggleReaction({
          reactionType,
          entityType: entityType || EntityType.POST
        });
      } catch (err) {
        console.error("Error posting reaction:", err);
      }
    };
  
    return {
      handleReaction,
      isPending,
      error
    };
  };
  
  export default useReactionHandler;