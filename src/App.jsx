import { useState } from "react"
import Header from "./components/Header/Header"
import Footer from "./components/Footer"
import { theme } from "./muiTheme"
import { ThemeProvider, Container } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductScreen, HomeScreen } from "./screens"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
          </Routes>
          </Container>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
