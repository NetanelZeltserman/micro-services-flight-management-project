import React from 'react'
import CustomersList from '../../components/admin/CustomersList'
import ExampleSidebar from '../../components/admin/Sidebar'
import { ToastContainer } from 'react-toastify';

export default function AdminHomePage() {
  return (
    <div className='container flex justify-center w-full mx-10 my-8'>
        <ToastContainer />
        <ExampleSidebar />

        <div className='w-full h-full ml-16'>
          <CustomersList />
        </div>
    </div>
  )
}
