import React, { useState } from 'react'
import Button from '../Button'
import useCreateComment from '@/hooks/useCreateComment';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { CreateCommentData } from '@/types/forms';
import { Comment } from '@/types/comment';
import useUpdateComment from '@/hooks/useUpdateComment';

const EditComment = ({ comment, toggleEditOption  }: {
    comment : Comment,
    toggleEditOption ? : () => void
}) => {


    const { mutate, isPending } = useUpdateComment();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { register, reset,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            content: comment.content,
            postId: comment.postId,
            parentCommentId: comment.parentCommentId || null
        }
    });

    const { field: { onChange: content_onChange, value: content_value, ref: content_ref } } = useController({
        control: control,
        name: 'content',
        rules: {
            required: true
        }
    })


    // DONE : Call Handle Submit on Submit
    // TODO : Add new Comment to exising comments list on success and not on Error
    const handleCommentSubmit: SubmitHandler<CreateCommentData> = (formData) => {

        const {
            content,
            parentCommentId,
            postId
        } = formData;
        console.log("Comment Submit Data : ", content, parentCommentId, postId)
        mutate({
            commentId : comment.id,
            updateCommentData : {
                content,
                parentCommentId,
                postId
            }
        }, {
            onSuccess: () => {
                reset();
                setErrorMessage(null);
                toggleEditOption && toggleEditOption();
            },
            onError: (error) => {
                setErrorMessage(error.message);
            }
        })
    }

    const handleCancel = () => {
        console.log("handle cancel")
        toggleEditOption && toggleEditOption();
    }
    return (
        <form className="ml-4 form-control p-4 w-full" onSubmit={handleSubmit(handleCommentSubmit)}>

            <textarea className="textarea textarea-bordered h-24 w-full"
                {...register('content', { required: true, minLength: 20 })}
                placeholder="New Comment"></textarea>

            <input type='text'
                {...register('postId', { required: true })}
                readOnly value={comment.postId} className={`hidden`} />
            {errorMessage && <div className="label text-xs text-red-500">
                <span className="label-text-alt">{errorMessage}</span>
                {/* <span className="label-text-alt">Alt label</span> */}
            </div>}
            {comment.parentCommentId &&
                <input type='text'
                    {...register('parentCommentId', { required: false })}
                    readOnly value={comment.parentCommentId} className={`hidden`} />
            }
            {
                isPending ?
                <div className='flex gap-4 justify-start items-center mt-4'>
                    <Button.Neutral type='button' message='cancel' styles={`max-w-20`}/>
                    <Button.Loading message='Update' styles={`max-w-20`}></Button.Loading>
                </div>
                    :
                    <div className='flex gap-4 justify-start items-center mt-4'>
                    {/* TODO : Update Working, Cancel not working */}
                    <Button.Neutral type='button' message='Cancel' onClick={handleCancel} styles={`max-w-20`}/>
                    <Button.Primary type='submit' message='Update' styles={`max-w-20  ${content_value.length < 20 ? ' btn-disabled ' : ''}`}></Button.Primary>
                    </div>
                    
            }

        </form>
    )
}

export default EditComment