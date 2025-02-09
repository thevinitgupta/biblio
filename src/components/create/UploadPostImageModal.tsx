"use client";
import useUploadPostImage from '@/hooks/useUploadPostImage';
import { ResponseType } from '@/types/enums';
import { UploadProfileImageData } from '@/types/forms';
import { parseError, parseServerError } from '@/utils/errorParser';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

const UploadPostImageModal = ({
    postImageSetter
}:{
    postImageSetter : Dispatch<SetStateAction<string>>, 
}) => {
    const [fileWarning, setFileWarning] = useState<string| null>(null);
    const [fileResponse, setFileResponse] = useState<string| null>(null);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string|null>(null);
    const {register, handleSubmit, reset} = useForm<UploadProfileImageData>(); 
    const {mutate:upload_post_img, isError, isPending, isSuccess, data, reset : resetUpload} = useUploadPostImage();

    const handleFile = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log("File Changed")
        setUploadedImage(null);
        setFileWarning(null);
        const fileList = e.target.files;
        if(!fileList) {
            setFileWarning('No file selected');
            return;
        }
        const file = fileList[0];
        console.log("File :"+file.size/(1024*1024)+"mb")
        if(file.size > 1024*1024 * 5) {
            setFileWarning('Max size allowed is 5mb');
            return;
        }
        else if(![".png",".jpg",".jpeg"].includes(file.name.substring(file.name.lastIndexOf(".")))){
            setFileWarning('Only .png, .jpg, .jpeg files are allowed');
            return;
        }
        
        setUploadedImage(file);
    }

    const onSubmit : SubmitHandler<UploadProfileImageData> = (formData) => {
        upload_post_img(formData, {
          onSuccess: (data) => {
              if (data.type === ResponseType.success) {
                reset();
                // console.log("SUCESS UPLOAD RESPONSE MESSAGE :",data)
                setFileResponse(data.message);
                postImageSetter(data.data!);
              }
          },
          onError: (lError) => {
              let parsedError = parseError(lError);
              if (parsedError === null) {
                  parsedError = parseServerError(lError);
              }
              console.log("Parsed Error : ", parsedError);
              setFileWarning(parsedError.description);
              // setError();
          }
      });
      }

      const handleModalClose = () => {
        setFileWarning(null);
        setFileResponse(null);
        reset();
        resetUpload(); // Reset the mutation state
      };
      
      useEffect(()=> {
        if(!uploadedImage){
            setImagePreview(null);
            return;
        }
        const previewUrl = URL.createObjectURL(uploadedImage);
        setImagePreview(previewUrl);

        () => setImagePreview(null);
      }, [uploadedImage])
    
    return (
        <>
            <div className="modal-box shadow-sm shadow-primary/20 w-2/5 h-3/5 max-w-3xl">
                <h3 className="font-bold text-xl">Update Post Image</h3>
                <div className="divider"></div>
                <p className="py-4 text-sm text-warning">Upload 4:7 ratio image for best results</p>
                <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>

                {!isPending && !isError && !isSuccess && <input type="file" {...register('file')}  accept='image/png, image/jpg' onChange={(e)=> handleFile(e)}
                className="file-input file-input-neutral w-full" /> }
                {
                    isPending && 
                    <span className="loading loading-spinner text-accent"></span>
                }
                {fileResponse ? <p className={`py-4 text-xs text-success ${fileResponse ? "block" : "invisible"}`}>{fileResponse}</p> : <p className={`py-4 text-xs text-error ${fileWarning ? "block" : "invisible"}`}>{fileWarning}</p> }

                {
                    imagePreview && <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded-md mb-5" />
                }
                <div className='w-full flex justify-end'>
                    {!isSuccess && !data && <button disabled={isPending} type="submit" className="btn btn-active btn-primary">Upload</button>}
                </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop bg-black/60">
                <button onClick={handleModalClose}>close</button>
            </form>
        </>
    )
}

export default UploadPostImageModal