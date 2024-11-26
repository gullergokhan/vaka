import ResponsiveAppBar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
