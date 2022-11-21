import React, { useState, useEffect } from 'react'
import {
  Grid, Typography, FormControl, Alert, Button, Input, InputLabel,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile, removeSuccess } from '../reducers/profileReducer'
import validateEmail from '../utils/emailValidator'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const profile = useSelector((state) => state.profile)

  const { user } = userLogin
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [])

  useEffect(
    () => {
      if (error) {
        setError('')
      }
    },
    [email, password, confirmPassword, name],
  )

  const updateHandler = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email')
      return
    }
    dispatch(updateUserProfile({
      name, email, password, access_token: JSON.parse(localStorage.getItem('user')).token,
    }))
    setTimeout(() => {
      dispatch(removeSuccess())
    }, 3000)
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <Grid container mt={6}>
      <Grid container item xs={12} md={5} spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" mb={3}>PROFILE</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={updateHandler}>Update</Button>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {profile.success && (
          <Grid item xs={12}>
            <Alert severity="success">Profile updated successfully</Alert>
          </Grid>
        )}
        {profile.isLoading && (
          <Grid item xs={12}>
            <Alert severity="info">Updating profile...</Alert>
          </Grid>
        )}

      </Grid>
    </Grid>
  )
}

export default ProfileScreen
