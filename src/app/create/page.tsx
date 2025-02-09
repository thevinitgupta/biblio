"use client";
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import DetailsSkeleton from '@/components/DetailsSkeleton';
import Editor from '@/components/create/Editor';
import Title from '@/components/create/Title';
import UploadPostImageModal from '@/components/create/UploadPostImageModal';
import useAuth from '@/hooks/useAuth';
import useCreatePost from '@/hooks/useCreatePost';
import { Book } from '@/types/book';
import { ResponseType } from '@/types/enums';
import { ErrorResponse } from '@/types/errors';
import { CreatePostData } from '@/types/forms';
import { parseError, parseServerError } from '@/utils/errorParser';
import useGlobalStore from '@/utils/zustand';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { PiUpload } from "react-icons/pi";

const CreatePost = () => {
  const {sessionToken} = useGlobalStore();
  const router = useRouter();
  const [postBody, setPostBody] = useState('');
  const [postImage, setPostImage] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [taggedBook, setTaggedBook] = useState<Book | null>(null);
  const {register, handleSubmit, control, reset } = useForm<CreatePostData>({
    mode : "onSubmit"
  });

  const [error, setError] = useState<ErrorResponse | null>(null);

  const { data: token, isLoading : tokenLoading, isError : tokenError, error: auth_error } = useAuth();
  
  const {isPending : createPostPending, 
    isError : server_createPostError, 
    data : createPostData , 
    mutate : server_createPost } = useCreatePost();

  const {field : { onChange, value, ref}} = useController({
    control : control,
    name: 'content',
    rules : {
      required : true
    }
  })

  if (!tokenLoading && (!token || auth_error)) {
    console.log(auth_error?.message);
  }

  const onSubmit : SubmitHandler<CreatePostData> = (formData) => {
    server_createPost({...formData, taggedBook : {
      id : taggedBook?.id,
      bookInfo : taggedBook?.volumeInfo
    },
    coverImage : postImage
  }, {
      onSuccess: (data) => {
          if (data.type === ResponseType.success) {
            reset();
            router.push("/dashboard");
          }
      },
      onError: (lError) => {
          let parsedError = parseError(lError);
          if (parsedError === null) {
              parsedError = parseServerError(lError);
          }
          console.log("Parsed Error : ", parsedError);
          setError(parsedError);
          // setError();
      }
  });
  }

  const openPostImageModal = () => {
    const dialog = document.getElementById(
        "post_image_modal"
    ) as HTMLDialogElement; // Cast to HTMLDialogElement
    dialog.showModal();
};


   // Prevent Enter key from submitting the form during normal typing
   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent Enter from submitting the form
    }
    setError(null);
  };

  useEffect(()=> {
    if(!sessionToken) {
      router.replace("/auth");
    }
  },[])

  return (

    tokenLoading ?
      <DetailsSkeleton lines={2} /> :
      <>
      <form className="w-full lg:w-4/5 max-w-[876px] join join-vertical relative overflow-y-scroll [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-base-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-base-100
      dark:[&::-webkit-scrollbar-track]:bg-base-100
      dark:[&::-webkit-scrollbar-thumb]:bg-base-100"
       onSubmit={handleSubmit(onSubmit)}
       onKeyDown={handleKeyDown} >
        <div className={`h-32 w-full`}>
        <div className={`flex w-content max-w-1/4 h-6 md:h-10 py-3 px-6 justify-start gap-2 items-center bg-base-200 text-sm md:text-base rounded-lg cursor-pointer`}
                    onClick={openPostImageModal}>
                    <PiUpload className={`h-6 md:h-8 w-6 md:w-8`} /> Upload Cover Image
                    
                </div>
        </div>
        <Title register={register} />
        <Editor initialValue={''}
        onChange={onChange} setContent={setPostBody} setDisplayText={setDisplayText} 
        setTaggedBook={setTaggedBook} taggedBook={taggedBook} />
        <div className={`w-full max-w-[876px] grid place-items-center fixed bottom-0 left-auto bg-base-100 shadow-md py-6`}>
        {server_createPostError && error &&
          <Alert.Default key={Date.now()} message={error.description} type={error.type} />}
          <div className={`w-full grid place-items-end font-poppins`}>
          <Button.Primary type="submit" message='Post' styles='max-w-[150px] text-xl rounded-xl' />
          </div>
        </div>
        
      </form>
      <dialog id="post_image_modal" className="modal">
                <UploadPostImageModal postImageSetter={setPostImage} />
            </dialog>
            </>
  )
}

export default CreatePost