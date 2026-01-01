import React from 'react'
import Header from '../../Common/Header'
import Footer from '../../Common/Footer'

const UserLayout = ({children}) => {
  return (
    <>
    {/* Header */}
    <Header />
    {/* Main Content*/}
     <main className="flex-1">{children}</main>
    {/* Footer */}
    <Footer/>
    </>
  )
}

export default UserLayout