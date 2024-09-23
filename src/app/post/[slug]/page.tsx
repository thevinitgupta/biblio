import React, { PropsWithChildren } from 'react'

const Post = (props : PropsWithChildren) => {
    console.log("Dynamic Route Props : ",props)
  return (
    <div>Post</div>
  )
}

export default Post