import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router'
import { Restaurants } from '../pages/client/restaurants'
import { meQuery } from '../__generated__/meQuery'
import { Header } from '../components/header'

const ClientRoutes = [
  <Route path='/' exact>
    <Restaurants />
  </Route>,
]

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY)
  if (!data || loading || error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading...</span>
      </div>
    )
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}
