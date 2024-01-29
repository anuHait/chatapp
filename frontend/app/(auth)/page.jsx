import React from 'react'
import Form from '../../components/Form'
import ToasterContext from '@components/ToasterContext'
import Provider from '@components/Provider'
const Login = () => {
  return (
    <div>
    <Provider>
    <ToasterContext />
    <div className='flex flex-row gap-5'>
    <img src="/assets/cover.jpg" className='w-[55%] h-full'/>
      <Form type="login" />
    </div>
      </Provider>
    </div>
  )
}

export default Login
