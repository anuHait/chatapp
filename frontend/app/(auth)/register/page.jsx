import React from 'react'
import Form from '@components/Form'
const Register = () => {
  return (
    <div className='flex flex-row gap-5'>
    <img src="/assets/cover.jpg" className='w-[55%] h-full'/>
      <Form type="register" />
    </div>
  )
}

export default Register
