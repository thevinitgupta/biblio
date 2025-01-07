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
    <div className="stats stats-vertical lg:stats-horizontal shadow mt-8 w-full">
  <div className="stat">
    {/* <div className="stat-title">Email</div> */}
    <div className="stat-desc text-lg">Email</div>
    <div className="stat-value text-xl">{email}</div>
  </div>

  <div className="stat">
    {/* <div className="stat-title">New Users</div> */}
    <div className="stat-desc text-lg">Posts</div>
    <div className="stat-value text-xl">{posts}</div>
  </div>

  <div className="stat">
    {/* <div className="stat-title">New Registers</div> */}
    <div className="stat-desc text-lg">Post Views</div>
    <div className="stat-value text-xl">{viewsCount}</div>
  </div>
</div>
  )
}

export default UserData