
import { getSession } from '@/utils/sessions'
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {
    const session = await getSession();


    // if(!session) redirect("/auth")
  return (
    <div>Welcome {session? "thevinitgupta@gmail.com" : "User"}!</div>
  )
}

export default Dashboard