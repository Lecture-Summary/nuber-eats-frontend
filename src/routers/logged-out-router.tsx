import React from 'react'
import { useForm } from 'react-hook-form'
import { isLoggedInVar } from '../apollo'

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = () => {
    console.log(watch('email'))
  }
  const onInvalid = () => {
    console.log('cant create account')
  }

  console.log(errors)

  return (
    <div>
      <span>Logged Out</span>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('email', {
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name='email'
            type='email'
            placeholder='email'
          />
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            name='password'
            type='password'
            required
            placeholder='password'
          />
        </div>
        <button className='bg-yellow-300 text-white'>Submit</button>
      </form>
    </div>
  )
}