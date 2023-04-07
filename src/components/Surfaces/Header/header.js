import React, {useState} from 'react'
import {AppBar, Box, Toolbar, Typography, Menu, MenuItem, Link} from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../../images/logo.png'
import * as routesNames from '../../../constants/routes'
import MyDiv from './header.style'

const StyledMenuItem = styled(MenuItem)(() => ({
  '&.MuiMenuItem-root': {
    borderBottom: '1px solid #ccc',
  },
  '&.MuiMenuItem-root a': {
    color: '#000000',
    fontWeight: '400',
    fontSize: '13px',
    fontFamily: 'Poppins,sans-serif',
  },
  '&.MuiMenuItem-root:first-child': {
    marginTop: '-8px',
  },
  '&.MuiMenuItem-root:last-child': {
    marginBottom: '-8px',
  },
}))

const Menus = [
  {
    id: 0,
    menuName: 'Home',
    link: routesNames.HOME,
  },
  {
    id: 1,
    menuName: 'Assets',
    submenu: [
      {
        id: 11,
        submenuName: 'Asset List',
        link: routesNames.ASSETLIST,
      },
      {
        id: 12,
        submenuName: 'Add Asset',
        link: routesNames.ADDASSET,
      },
      {
        id: 13,
        submenuName: 'Map Photos',
        link: routesNames.MAPPHOTOS,
      },
      {
        id: 14,
        submenuName: 'Find & Replace',
        link: routesNames.FINDREPLACE,
      },
    ],
  },
  {
    id: 2,
    menuName: 'Lines',
    submenu: [
      {
        id: 21,
        submenuName: 'Line List',
        link: routesNames.LINELIST,
      },
      {
        id: 22,
        submenuName: 'Add Line',
        link: routesNames.ADDLINE,
      },
    ],
  },
  {
    id: 3,
    menuName: 'Reports',
    submenu: [
      {
        id: 31,
        submenuName: 'Final Asset List Report',
        link: routesNames.ASSETREPORTLIST,
      },
      {
        id: 32,
        submenuName: 'Valuation by class/ condition',
        link: routesNames.REPORTVALUATION,
      },
      {
        id: 33,
        submenuName: 'Photo Reports',
        link: routesNames.PHOTOREPORTS,
      },
    ],
  },
  {
    id: 4,
    menuName: 'Research',
    link: routesNames.RESEARCH,
  },
  {
    id: 5,
    menuName: 'Import',
    submenu: [
      {
        id: 51,
        submenuName: 'Asset Import',
        link: routesNames.IMPORTASSET,
      },
      {
        id: 52,
        submenuName: 'Find & Replace Imported Asset',
        link: routesNames.FINDREPLACEIMPORTEDASSET,
      },
    ],
  },
  {
    id: 6,
    menuName: 'Admin',
    submenu: [
      {
        id: 61,
        submenuName: 'Assign Appraiser',
        link: routesNames.ASSIGNAPPRAISER,
      },
      {
        id: 62,
        submenuName: 'Manage Asset Classes',
        link: routesNames.MANAGEASSETCLASS,
      },
      {
        id: 63,
        submenuName: 'Manage Area',
        link: routesNames.MANAGEAREA,
      },
      {
        id: 64,
        submenuName: 'Manage Serial Labels',
        link: routesNames.MANAGESERAILLABELS,
      },
      {
        id: 65,
        submenuName: 'Manage Asset Types',
        link: routesNames.MANAGEASSETTYPE,
      },
      {
        id: 66,
        submenuName: 'Manage Make',
        link: routesNames.MANAGEMAKE,
      },
      {
        id: 67,
        submenuName: 'Manage Model',
        link: routesNames.MANAGEMODEL,
      },
      {
        id: 68,
        submenuName: 'Manage User',
        link: routesNames.MANAGEUSER,
      },
    ],
  },
]

function Header() {

  const [anchorEl, setAnchorEl] = useState(null)
  const [currentElem, setCurrentElem] = useState(null)

  const handleClick = (index) => (event) => {
    setAnchorEl(event.currentTarget)
    setCurrentElem(index)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setCurrentElem(null)
  }

  const handleLogout = () => {
    console.log('Logout')
  }

  return (
    <MyDiv>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static" className="custom_header">
          <Toolbar className="custom_toolbar">
            <img src={Logo} alt="Hilco Logo" />
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
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
                </Menu>
              </Box> */}
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}} className="menu_box">
              {Menus.map((item, index) => {
                return (
                  <MenuItem className="menuitem" key={index}>
                    {!item.submenu ?
                      <NavLink to={item.link} activeClassName="activeMenu" style={{textDecoration: 'none'}}>{item.menuName}
                      </NavLink> :
                      <Link style={{textDecoration: 'none'}}
                        id={`menu-item-${index}`}
                        onClick={handleClick(index)}
                      >{item.menuName}
                        <KeyboardArrowDownIcon />
                      </Link>
                    }
                    <Menu
                      anchorEl={anchorEl}
                      open={currentElem === index}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          'overflow': 'visible',
                          'filter': 'drop-shadow(0px 2px 25px #00000029)',
                          'mt': 0,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                    >
                      {item?.submenu?.map((submenu, index) => {
                        return (
                          <StyledMenuItem onClick={handleClose} key={index}>
                            <NavLink to={submenu.link} style={{textDecoration: 'none'}}>{submenu.submenuName}
                            </NavLink>
                          </StyledMenuItem>
                        )
                      })}
                    </Menu>
                  </MenuItem>
                )
              })}
            </Box>
            <Box sx={{flexGrow: 0}}>
              <Typography className="logout_user text_font" onClick={handleLogout}>Welcome MNETest | Logout</Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </MyDiv>
  )
}
export default Header
