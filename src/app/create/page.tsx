"use client";
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import DetailsSkeleton from '@/components/DetailsSkeleton';
import Editor from '@/components/create/Editor';
import Title from '@/components/create/Title';
import useAuth from '@/hooks/useAuth';
import useCreatePost from '@/hooks/useCreatePost';
import { ResponseType } from '@/types/enums';
import { ErrorResponse } from '@/types/errors';
import { CreatePostData } from '@/types/forms';
import { parseError, parseServerError } from '@/utils/errorParser';
import useGlobalStore from '@/utils/zustand';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form';

const CreatePost = () => {
  const {sessionToken} = useGlobalStore();
  const router = useRouter();
  const [postBody, setPostBody] = useState('');
  const [displayText, setDisplayText] = useState('');
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
    server_createPost(formData, {
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
      <form className="w-full lg:w-4/5 join join-vertical relative"
       onSubmit={handleSubmit(onSubmit)}
       onKeyDown={handleKeyDown} >
        <Title register={register} />
        <Editor initialValue={''}
        onChange={onChange} setContent={setPostBody} setDisplayText={setDisplayText}/>
        // <textarea {...register('content')} value={postBody} className={`hidden h-0 w-0`} />
        <div className={`w-full grid place-items-center fixed bottom-0 left-0 bg-base-100 shadow-md px-16 py-6`}>
        {server_createPostError && error &&
          <Alert.Default key={Date.now()} message={error.description} type={error.type} />}
          <div className={`w-full lg:w-4/5 grid place-items-end font-poppins`}>
          <Button.Primary type="submit" message='Post' styles='max-w-[150px] text-xl rounded-xl' />
          </div>
        </div>
        
      </form>
  )
}

export default CreatePost