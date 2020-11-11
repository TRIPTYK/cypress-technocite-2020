import { navigate } from '@reach/router';
import React, { useEffect, useState } from 'react'

const Form = ({ endPoint,onError, onSuccess }) => {
    const registerToServer = async (values) =>{
        let userRaw = null;
        let user = null;
        try{
            userRaw = await fetch(`http://localhost:3000/${endPoint}`,
            {
                method:'post',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(values)
            })
            if(!userRaw.ok){
                onError(await userRaw.text())
            } else {
                user = await userRaw.json()
                window.localStorage.setItem('tpk-token',user.accessToken)
                onSuccess(user)
                navigate('/')
            }
        }catch(e){
            console.error(e)
            console.log(e)
        }
    }
  function handleSubmit(e) {
    e.preventDefault()
    const {
      email: { value: email },
      password: { value: password },
    } = e.target.elements
    setValues({email, password})
  }
  const [values, setValues] = useState(null)
  useEffect(() => {
    if (!values) {
      return
    }
    console.log(values)
    registerToServer(values)
    return ()=>{}
  },[values])
  return (
    <form className="w-64" onSubmit={handleSubmit}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        email address
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          name="email"
          type="email"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            name="password"
            type="password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              {endPoint}
            </button>
          </span>
        </div>
      </div>
    </form>
  )
}

export default Form
