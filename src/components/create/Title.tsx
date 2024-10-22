import React from 'react'
import { UseFormRegister } from 'react-hook-form'

const Title = ({register} : {
  register : UseFormRegister<any>,
}) => {
  return (
    <div className={`join-item bg-base-200 w-full py-6 px-8`}>
    <textarea {...register("title")} maxLength={60} placeholder="Post Title Here" className="block resize-none p-0 w-full bg-base-200 outline-none border-none active:outline-none focus:outline-none focus:border-none text-4xl text-primary/70 placeholder:text-primary/40 placeholder:text-2xl" />
    </div>
  )
}

export default Title