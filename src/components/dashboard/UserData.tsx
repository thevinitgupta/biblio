import React from 'react'

const UserData = ({
    email,
    posts,
    viewsCount
}: {
    email : string,
    posts : number,
    viewsCount : number
}) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow mt-8 w-[85vw] md:w-full">
  <div className="stat">
    {/* <div className="stat-title">Email</div> */}
    <div className="stat-desc text-base md:text-lg">Email</div>
    <div className="stat-value text-lg md:text-xl">{email}</div>
  </div>

  <div className="stat">
    {/* <div className="stat-title">New Users</div> */}
    <div className="stat-desc text-base md:text-lg">Posts</div>
    <div className="stat-value text-lg md:text-xl">{posts}</div>
  </div>

  <div className="stat">
    {/* <div className="stat-title">New Registers</div> */}
    <div className="stat-desc text-base md:text-lg">Post Views</div>
    <div className="stat-value text-lg md:text-xl">{viewsCount}</div>
  </div>
</div>
  )
}

export default UserData