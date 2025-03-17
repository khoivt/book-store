import React from 'react'
import AppHeader from './components/layout/app.header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <AppHeader/>
    <Outlet/>
    </>
  )
}

export default Layout