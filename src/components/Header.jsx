import {useState, useEffect} from 'react';
import {useContext, createContext} from 'react';
import {nanoid} from 'nanoid'
import menuIcon from '../assets/images/icon-menu.svg'
import logo from '../assets/images/logo.svg'
import cartIcon from '../assets/images/icon-cart.svg'
import userProfileIcon from '../assets/images/image-avatar.png'
import closeIcon from '../assets/images/icon-close.svg'

const HeaderContext = createContext();

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = [
    {page:'Collection', href: '#'},
    {page:'Men', href: '#'},
    {page:'Women', href: '#'},
    {page:'About', href: '#'},
    {page:'contact', href: '#'},
  ]

  useEffect(() => {
    console.log(menuOpen);
  },[menuOpen]);

  return (
    <HeaderContext.Provider value={{pages, menuOpen, setMenuOpen}}>
      <div className="flex justify-between items-center px-3 sm:px-0">
        <div className="flex gap-2">
          <Header.MenuIcon></Header.MenuIcon>
          <Header.Logo></Header.Logo>
          <Header.Navbar>
            {pages.map(page=><Header.NavPage key={nanoid()} href={page.href}>{page.page}</Header.NavPage>)}
          </Header.Navbar>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <Header.CartButton></Header.CartButton>
          <Header.UserProfileButton></Header.UserProfileButton>
        </div>
      </div>
    </HeaderContext.Provider>
  )
}

Header.MenuIcon = function HeaderMenuIcon() {
  const {setMenuOpen} = useContext(HeaderContext);

  return (
    <button className="md:hidden" onClick={()=>setMenuOpen(prevMenuOpen => !prevMenuOpen)}>
      <img src={menuIcon} alt=""/>
    </button>
  )
}

Header.Logo = function HeaderLogo() {
  return (<img src={logo} alt="sneakers logo"/>)
}

Header.CartButton = function HeaderCartButton() {
  return (
    <button>
      <img src={cartIcon} alt=""/>
    </button>
  )
}

Header.UserProfileButton = function HeaderUserProfileButton() {
  return (
    <button onClick={()=> console.log('user profile clicked')}>
      <img src={userProfileIcon} alt="user icon" className="h-3 w-3 sm:h-6.25 sm:w-6.25"/>
    </button>
  )
}

Header.Navbar = function HeaderNavbar({children}) {
  const {menuOpen, setMenuOpen} = useContext(HeaderContext);
  console.log(menuOpen);
  return (
    <nav>
      {
        menuOpen &&
        <div className="fixed inset-y-0 left-0 right-[33.33%] p-3 flex flex-col gap-7  bg-red-200">
          <button onClick={()=>setMenuOpen(prevMenuOpen=> !prevMenuOpen)}><img src={closeIcon} alt=""/></button>
          <ul className="flex flex-col gap-3">
            {children}
          </ul>
        </div>
      }
    </nav>
  )
}

Header.NavPage = function HeaderNavPage({children, href}) {
  return (
    <li><a href={href}>{children}</a></li>
  )
}

export default Header