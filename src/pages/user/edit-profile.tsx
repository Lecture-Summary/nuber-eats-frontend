import { useApolloClient, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/button'
import { EMAIL_REGEX } from '../../constants'
import { useMe } from '../../hooks/useMe'
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile'

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`

interface IFormProps {
  email?: string
  password?: string
}

export const EditProfile = () => {
  const client = useApolloClient()
  const { data: userData } = useMe()
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData
      const { email: newEmail } = getValues()
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: { email: newEmail, verified: false },
        })
      }
    }
  }
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted })
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: 'onChange',
  })
  const onSubmit = () => {
    const { email, password } = getValues()
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }),
        },
      },
    })
  }
  return (
    <div className='mt-52 flex flex-col justify-center items-center'>
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className='font-semibold text-2xl mb-3'>Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid max-w-screen-sm gap-3 mt-5 w-full mb-5'
      >
        <input
          {...register('email', { pattern: EMAIL_REGEX })}
          name='email'
          className='input'
          type='email'
          placeholder='Email'
        />
        <input
          {...register('password')}
          name='password'
          className='input'
          type='password'
          placeholder='Password'
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText='Save Profile'
        />
      </form>
    </div>
  )
}
