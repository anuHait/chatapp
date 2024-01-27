import React from 'react'
import Form from '../../components/Form'
import ToasterContext from '@components/ToasterContext'
import Provider from '@components/Provider'
const Login = () => {
  return (
    <div>
    <Provider>
    <ToasterContext />
      <Form type="login" />
      </Provider>
    </div>
  )
}

export default Login
