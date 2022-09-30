import React from 'react'
import { ThemeProvider, Container, CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer'
import theme from './muiTheme'
import {
  ProductScreen, HomeScreen, CartScreen, LoginScreen, RegisterScreen,
} from './screens'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{
            position: 'relative',
            minHeight: '100vh',
          }}
        >
          <div style={{ paddingBottom: '2.5rem' }}>
            <Header />
            <Container maxWidth="xl">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart/" element={<CartScreen />} />
                <Route path="/cart/:id" element={<CartScreen />} />
                <Route path="/login/" element={<LoginScreen />} />
                <Route path="/register/" element={<RegisterScreen />} />

              </Routes>
            </Container>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
