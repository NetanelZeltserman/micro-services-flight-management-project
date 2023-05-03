import React from 'react'
import ExampleSidebar from '../../components/admin/Sidebar'
import AcquisitionOverview from '../../components/admin/AcquisitionOverview'
import { ToastContainer } from 'react-toastify';
import SalesThisWeek from '../../components/admin/SalesChart'

export default function AdminHomePage() {
  return (
    <div className='container flex justify-center w-full mx-10 my-8'>
        <ToastContainer />
        <ExampleSidebar/>

        <div className='w-full h-full ml-16'>
          <SalesThisWeek />
          <AcquisitionOverview />
        </div>
    </div>
  )
}
