import { z } from "zod";
import { ResponseType } from "./enums";

export type ReviewReactionStringType = "helpful" | "insightful" | "funny" | "agree" | "love";

export type ReviewReactionType = {
    type: ReviewReactionStringType;
    emoji: string;
    label: string;
}

export enum EntityType {
    POST = "POST",
    COMMENT = "COMMENT"
}

export const ReactionSchema = z.object({
    entityId: z.string(),
    reactionType: z.string().refine((value) => ["helpful", "insightful", "funny", "agree", "love"].includes(value), {
        message: "Invalid Reaction Type"
    }),
    entityType : z.string().refine((value) => ["POST", "COMMENT"].includes(value),{
        message: "Invalid Entity Type"
    })
})

export type ReactionData = z.infer<typeof ReactionSchema>;

export type ReactionsMap = {
    [key in ReviewReactionStringType] : number
}

export type EntityReactions = {
    userReactions : Array<ReviewReactionStringType>,
    totalReactions : number,
    reactionsMap : ReactionsMap
}

export type ReactionsResponseData = {
    message: string;
    data: EntityReactions;
    type: ResponseType
}

export type CommentReactions = {
    userReacted : boolean,
    totalReactions : number,
}