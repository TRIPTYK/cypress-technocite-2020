import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import jwtDecode from 'jwt-decode';
import { Router } from '@reach/router'
import Home from './components/pages/Home'
import Form from './components/pages/Form'
import Notification from './components/Notification'
const App = () => {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const token = window.localStorage.getItem('tpk-token')
  const getUserFromServer = async()=>{
    // console.log(jwtDecode(token))
    try{
    let userRaw = await fetch(`http://localhost:3000/users/${jwtDecode(token).sub}`,{
      method:'get',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    })
    if(!userRaw.ok){
      mgtError(await userRaw.text())
    } else{
      setUser(await userRaw.json())
    }
  }catch(e){
    console.log(e)
  }
  }
  useEffect(()=>{
    if(user){return}
    if(token){
      getUserFromServer()
    }
  },[token,user])
  function mgtError(e) {
    setError(e)
    setShowNotification(true)
  }
  function closeNotification() {
    setShowNotification(false)
  }
  function logout(){
    window.localStorage.removeItem('tpk-token')
    setUser(null)
  }
  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Base TPK APP
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div>
              {showNotification ? (
                <Notification msg={error} onClose={closeNotification} />
              ) : (
                ''
              )}
            </div>
            <div>
              <Router>
                <Home path="/" user={user} onLogout={logout} />
                <Form
                  path="/register"
                  endPoint="register"
                  onError={mgtError}
                  onSuccess={setUser}
                />
                <Form
                  path="/login"
                  endPoint="login"
                  onError={mgtError}
                  onSuccess={setUser}
                />
              </Router>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
