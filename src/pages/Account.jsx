import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Account.css'

const Account = ({ handleLogout, goToMembersView, token }) => {
  const navigate = useNavigate();
  return (
    <div className="account-container">
      <h1 className="account-title">Account</h1>
      <div className="button-container">
        {token ? (
          <button className="button danger-button" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="button primary-button" onClick={() => navigate('/login')}>Login</button>
            <button className="button secondary-button" onClick={() => navigate('/signup')}>Signup</button>
          </>
        )}
        <button className="button primary-button" onClick={goToMembersView}>Members' View</button>
      </div>
    </div>
  )
}

export default Account

