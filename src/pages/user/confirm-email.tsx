import { useApolloClient, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { useMe } from '../../hooks/useMe'
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail'

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`

export const ConfirmEamil = () => {
  const { data: userData } = useMe()
  const client = useApolloClient()
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data
    if (ok && userData?.me) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: { verified: true },
      })
    }
  }
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  )
  useEffect(() => {
    const [_, code] = window.location.href.split('code=')
    verifyEmail({ variables: { input: { code } } })
  }, [])

  return (
    <div className='mt-52 flex flex-col items-center justify-center'>
      <h2 className='text-lg mb-2 font-medium'>Confirming email...</h2>
      <h4 className='text-gray-700 text-sm'>
        Please wait, don't close this page...
      </h4>
    </div>
  )
}