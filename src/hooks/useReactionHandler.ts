import { ReviewReactionStringType, EntityType } from "@/types/reaction";
import useToggleReaction from "./useToggleReaction";

const useReactionHandler = (postId: string) => {
    const { 
      mutateAsync: toggleReaction, 
      isPending,
      error 
    } = useToggleReaction({ entityId: postId });
  
    const handleReaction = async (reactionType: ReviewReactionStringType) => {
      try {
        await toggleReaction({
          reactionType,
          entityType: EntityType.POST
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