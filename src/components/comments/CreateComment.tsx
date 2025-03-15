import React, { useState } from 'react'
import Button from '../Button'
import useCreateComment from '@/hooks/useCreateComment';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { CreateCommentData } from '@/types/forms';

const CreateComment = ({ parentId = null, postId, toggleReplyOption }: {
    parentId?: string | null,
    postId: string,
    toggleReplyOption ? : () => void
}) => {


    const { mutate, isPending } = useCreateComment();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { register, reset,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            content: '',
            postId: postId,
            parentCommentId: parentId || null
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
            content: content,
            parentCommentId: parentCommentId || parentId || null,
            postId: postId
        }, {
            onSuccess: () => {
                reset();
                setErrorMessage(null);
                toggleReplyOption && toggleReplyOption();
            },
            onError: (error) => {
                setErrorMessage(error.message);
            }
        })
    }
    return (
        <form className="ml-4 form-control p-4 w-full" onSubmit={handleSubmit(handleCommentSubmit)}>

            <textarea className="textarea textarea-bordered h-24 w-full"
                {...register('content', { required: true, minLength: 20 })}
                placeholder="New Comment"></textarea>

            <input type='text'
                {...register('postId', { required: true })}
                readOnly value={postId} className={`hidden`} />
            {errorMessage && <div className="label text-xs text-red-500">
                <span className="label-text-alt">{errorMessage}</span>
                {/* <span className="label-text-alt">Alt label</span> */}
            </div>}
            {parentId &&
                <input type='text'
                    {...register('parentCommentId', { required: false })}
                    readOnly value={parentId} className={`hidden`} />
            }
            {
                isPending ?
                    <Button.Loading message='Send' styles={`max-w-20 mt-4`}></Button.Loading>
                    :
                    <Button.Primary type='submit' message='Send' styles={`max-w-20 mt-4 ${content_value.length < 20 ? ' btn-disabled ' : ''}`}></Button.Primary>
            }

        </form>
    )
}

export default CreateComment