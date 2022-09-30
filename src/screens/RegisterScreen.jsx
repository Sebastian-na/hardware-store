import React, { useState, useEffect } from 'react'
import {
  Grid, Button, FormControl, Typography, Alert,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import CustomTextField from '../components/CustomTextField'
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

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email')
    }
    const res = await dispatch(register({ email, password, first_name: name }))
    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(login({ username: email, password }))
    }
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
    <Grid container justifyContent="center" maxWidth={800} mx="auto" my={8}>
      <Grid item xs={12}>

        <FormControl fullWidth sx={{ gap: 1.6 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="h2" align="center">SIGN UP</Typography>
          <CustomTextField
            value={email}
            label="Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <CustomTextField
            value={name}
            label="Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            required
          />
          <CustomTextField
            value={password}
            label="Password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <CustomTextField
            value={confirmPassword}
            label="Confirm Password"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />
          <Button color="secondary" variant="outlined" onClick={submitHandler}>Register</Button>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }} mt={4}>
          Have an account?
          {' '}
          <Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}>Sign in</Link>
        </Typography>
      </Grid>
      {isLoading && <Loader />}
    </Grid>
  )
}

export default RegisterScreen
