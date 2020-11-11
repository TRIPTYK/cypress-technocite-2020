import { Link } from '@reach/router'
import React from 'react'
import Calculator from '../Calculator'

const Home = ({ user, onLogout }) => (
  <>
    <Calculator />
    <div className="w-64 mt-2 flex justify-between">
      {user ? (
        <>
            <span>{user.email}</span>
          <button type="button" className="primary-btn" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/register" className="primary-btn">
            Register
          </Link>
          <Link to="/login" className="primary-btn">
            Login
          </Link>
        </>
      )}
    </div>
  </>
)

export default Home
