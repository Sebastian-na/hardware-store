import React, { useState, useEffect } from 'react'
import {
  Grid, Button, FormControl, Typography, Alert,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import CustomTextField from '../components/CustomTextField'
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

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect)
    }
  }, [isLoggedIn])

  const submitHandler = () => {
    dispatch(login({ username: email, password }))
  }

  useEffect(
    () => {
      if (error) {
        dispatch(removeError())
      }
    },
    [email, password],
  )

  return (
    <Grid container justifyContent="center" maxWidth={800} mx="auto" my={8}>
      <Grid item xs={12}>

        <FormControl fullWidth sx={{ gap: 1.6 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="h2" align="center">SIGN IN</Typography>
          <CustomTextField
            value={email}
            label="Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            error={!!error}
          />
          <CustomTextField
            value={password}
            label="Password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            error={!!error}
          />
          <Button color="secondary" variant="outlined" onClick={submitHandler}>Login</Button>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }} mt={4}>
          New Customer?
          {' '}
          <Link to={redirect ? `/register/?redirect=${redirect}` : '/register'}>Sign up</Link>
        </Typography>
      </Grid>
      {isLoading && <Loader />}
    </Grid>
  )
}

export default LoginScreen
