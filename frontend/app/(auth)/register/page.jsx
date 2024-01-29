import React from 'react'
import Form from '@components/Form'
const Register = () => {
  return (
    <div className='flex flex-row gap-5'>
    
    <img src="/assets/cover.jpg" className='w-[55%] h-full'/>
    <div className='flex  flex-col items-center justify-center' >
    <h1 className='text-3xl font-semibold text-center'>Welcome to ChatVista</h1>
      <Form type="register" />
      </div>
    </div>
  )
}

export default Register
