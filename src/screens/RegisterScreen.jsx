import React, { useState, useEffect } from 'react'
import {
  Grid, Button, FormControl, Typography, Alert, InputLabel, Input, FormHelperText,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { register } from '../reducers/userRegisterReducer'
import { login } from '../reducers/userLoginReducer'
import validateEmail from '../utils/emailValidator'

function RegisterScreen() {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const userRegister = useSelector((state) => state.userRegister)
  const { isLoading } = userRegister
  const { isLoggedIn } = userLogin
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect)
    }
  }, [isLoggedIn])

  const registerAndLogin = async (data) => {
    await dispatch(register(data))
    if (userRegister.error) {
      setError(userRegister.error)
      return {}
    }
    return dispatch(login(data))
  }

  const submitHandler = async () => {
    // check if all fields are filled
    if (!email || !name || !password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }
    if (!validateEmail(email)) {
      setError('Invalid email')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    dispatch(registerAndLogin({ email, password, first_name: name }))
  }

  useEffect(
    () => {
      if (error) {
        setError('')
      }
    },
    [email, password, confirmPassword],
  )

  return (
    <Grid container mt={2} spacing={4}>
      <Grid item xs={12} textAlign="center"><Typography component="h1" variant="h2">SIGN IN</Typography></Grid>
      <Grid item xs={12}>
        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>Enter your name</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12} textAlign="center">
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
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
        <FormControl>
          <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormHelperText>Confirm your password</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button
          variant="contained"
          size="large"
          onClick={submitHandler}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'SIGN UP'}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }} mt={4}>
          Have an account?
          {' '}
          <Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}>Sign in</Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default RegisterScreen
