import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import './Header.css'
import { ShoppingCart } from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { grey } from '@mui/material/colors'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../logo.png'
import { logout } from '../../reducers/userLoginReducer'

const pages = ['cart']

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginState = useSelector((state) => state.userLogin)
  const { isLoggedIn } = loginState
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 5 }}>
          <Box
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}
            onClick={() => { navigate('/') }}
          >
            <img src={logo} alt="logo" className="logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              variant="outlined"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button startIcon={<ShoppingCart />} />
              </MenuItem>
            </Menu>
          </Box>
          <Box
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', cursor: 'pointer' } }}
            onClick={() => { navigate('/') }}
          >
            <img src={logo} alt="logo" className="logo" />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              gap: '10px',
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) => (
              <Link
                key={page}
                to={`/${page}`}
                component={RouterLink}
              >
                <IconButton
                  key={page}
                  onClick={handleCloseNavMenu}
                  color="neutral"
                  size="medium"
                >
                  <ShoppingCart />

                </IconButton>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{ bgcolor: '#fff', color: grey[700] }} />
              </IconButton>
            </Tooltip>

            {isLoggedIn ? (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/profile" component={RouterLink} underline="none">
                    <Typography variant="body2" textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography variant="body2" textAlign="center">Sign out</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/login" component={RouterLink} underline="none">
                    <Typography variant="body2" textAlign="center">Sign in</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/register" component={RouterLink} underline="none">
                    <Typography variant="body2" textAlign="center">Sign up</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
