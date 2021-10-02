import React from 'react'
import nuberLogo from '../images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='py-4'>
      <div className='w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center'>
        <img src={nuberLogo} className='w-24' alt='logo' />
        <span className='text-xs'>
          <Link to='/my-profile'>
            <FontAwesomeIcon icon={faUser} className='text-xl' />
          </Link>
        </span>
      </div>
    </header>
  )
}