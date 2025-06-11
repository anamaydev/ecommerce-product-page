import Header from './Header'

export default function CustomHeader(){
  const pages = [
    {page:'Collection', href: '#'},
    {page:'Men', href: '#'},
    {page:'Women', href: '#'},
    {page:'About', href: '#'},
    {page:'Contact', href: '#'},
  ]

  return(
    <Header pages={pages}>
      <div className="flex gap-2 lg:gap-7">
        <Header.MenuIcon />
        <Header.Logo />
        <Header.Navbar />
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <Header.CartButton />
        <Header.UserProfileButton />
      </div>
    </Header>
  )
}