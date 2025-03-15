"use client";
import { REVIEW_REACTIONS } from '@/constants/reactions'

import { Post } from '@/types/post'
import { EntityReactions } from '@/types/reaction'
import React, { useEffect, useState } from 'react'
import { BiCommentAdd } from 'react-icons/bi'
import { FaRegBookmark } from 'react-icons/fa6'

import { RiHeartAdd2Fill, RiHeartAdd2Line, RiLinkM } from 'react-icons/ri'
import Alert from '../Alert'
import ReactionList from './ReactionList';
import useReactionHandler from '@/hooks/useReactionHandler';


// TODO : Make responsive to be at center and reduce item size
const PostActions = ({
    post,
    reactions
}: {
    post: Post,
    reactions: EntityReactions
}) => {

    const [reactActive, setReactActive] = useState<boolean>(reactions.userReactions.length > 0)

    const { handleReaction, isPending, error: toggle_reaction_error } = useReactionHandler(post.id!);

    const scrolltoHash = function (element_id: string) {
        const element = document.getElementById(element_id)
        element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        history.pushState(null, "", `#${element_id}`);
      }

    useEffect(() => {
        setReactActive(reactions.userReactions.length > 0)
    }, [reactions.userReactions])

    // DONE : Add API calling using toggle_reaction on reaction click
    return (
        <ul className="menu menu-horizontal w-full lg:w-min bg-base-200 lg:menu items-center gap-6 rounded-box fixed z-30 left-0 bottom-0 lg:bottom-auto">
            <li className="dropdown dropdown-hover" tabIndex={0} role="button">
                {
                    reactActive ?
                    <RiHeartAdd2Fill className={`mt-4 w-16 h-16 text-red-700`} />
                    :
                    <RiHeartAdd2Line className={`mt-4 w-16 h-16 text-primary/30
                    hover:text-red-700`} />
                }



                {reactions && (
                    <ReactionList
                        reactions={REVIEW_REACTIONS}
                        onReactionClick={handleReaction}
                        initialUserReactions={reactions.userReactions}
                        reactionsMap={reactions.reactionsMap}
                    />
                )}
            </li>
            <li onClick={() => scrolltoHash("post-comment")}>
                <BiCommentAdd className={`w-16 h-16 text-primary/30 hover:text-teal-500`} />
            </li>
            <li>
                <FaRegBookmark className={`w-14 h-14 text-primary/30 hover:text-amber-600`} />
                {/* Filled(fa6) : <FaBookmark /> */}
            </li>
            <li>
                <RiLinkM className={`mb-4 w-16 h-16 text-primary/30 hover:text-blue-600`} />
                {/* Filled(fa6) : <FaBookmark /> */}
            </li>
            {
                toggle_reaction_error &&
                <Alert.Error message='Error posting reaction' />
            }
        </ul>
    )
}

export default PostActions

