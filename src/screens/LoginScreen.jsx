import React, { useState, useEffect } from 'react'
import {
  Grid, Button, FormControl, Typography, Alert, Input, InputLabel, FormHelperText,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { login, removeError } from '../reducers/userLoginReducer'

function LoginScreen() {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { isLoggedIn, isLoading, error } = userLogin
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const submitHandler = () => {
    dispatch(login({ username: email, password }))
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect)
    }
  }, [isLoggedIn])

  useEffect(
    () => {
      if (error) {
        dispatch(removeError())
      }
    },
    [email, password],
  )

  return (
    <Grid container mt={2} spacing={4}>
      <Grid item xs={12} textAlign="center"><Typography component="h1" variant="h2">SIGN IN</Typography></Grid>
      <Grid item xs={12}>
        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>Enter your email</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText>Enter your password</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={submitHandler}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'SIGN IN'}
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }} mt={4}>
          New Customer?
          {' '}
          <Link to={redirect ? `/register/?redirect=${redirect}` : '/register'}>Sign up</Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LoginScreen
