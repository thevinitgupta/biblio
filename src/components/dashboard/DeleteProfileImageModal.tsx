import useDeleteProfileImage from '@/hooks/useDeleteProfileImage'
import React, { useEffect, useState } from 'react'
import { SiTicktick } from 'react-icons/si';

const DeleteProfileImageModal = () => {
    const {isPending, isError, isSuccess, mutate : deleteProfileImage, data, reset : resetDelete} = useDeleteProfileImage();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleModalClose = () => {
        setErrorMessage(null);
        resetDelete(); // Reset the mutation state
      };

    
    useEffect(()=> {
        if(isError && data){
            setErrorMessage(data);
        }
    }, [data])
    
  return (
    <div className="modal-box">
    <h3 className="font-bold text-lg">Delete Image</h3>
    <div className="divider"></div>
    {!isPending && !isError && !isSuccess &&
        <p className="py-4 text-warning">Are you sure you want to delete your profile image?</p>
    }
    {
        isPending && <span className="loading loading-spinner text-accent"></span>
    }
    {
        isError && 
        <p className="py-4 text-error">{errorMessage}</p>
    }
    {
        isSuccess &&
        <div className='h-16 w-full text-primary rounded-full flex justify-center gap-5 items-center text-xl'>
            <SiTicktick className='text-success text-3xl' /> Successfully Deleted
        </div>
    }
    <div className="modal-action">
        {!isSuccess && !data &&<button disabled={isPending} 
        onClick={()=> deleteProfileImage()} className="btn btn-error">Delete</button>}
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleModalClose} disabled={isPending} className="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
  )
}

export default DeleteProfileImageModal