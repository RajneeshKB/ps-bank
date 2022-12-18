import React, { FC } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'

interface IPageLayoutProps {
  children: React.ReactNode
}

const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PageLayout
