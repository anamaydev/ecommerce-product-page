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
    {page:'Contact', href: '#'},
  ]

  useEffect(() => {
    console.log(menuOpen);
  },[menuOpen]);

  return (
    <HeaderContext.Provider value={{pages, menuOpen, setMenuOpen}}>
      <div className="flex justify-between items-center px-3 sm:px-0">
        <div className="flex gap-2 lg:gap-7">
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
    <button className="lg:hidden" onClick={()=>setMenuOpen(prevMenuOpen => !prevMenuOpen)}>
      <img src={menuIcon} alt=""/>
    </button>
  )
}

Header.Logo = function HeaderLogo() {
  return (<img className="h-2.5" src={logo} alt="sneakers logo"/>)
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
        <>
          <div className="fixed inset-0 z-10 opacity-75 lg:hidden bg-black"></div>
          <div className="max-w-37.5 fixed inset-y-0 z-20 left-0 right-[33.33%] p-3 sm:px-10 sm:py-6 flex flex-col gap-7 lg:hidden bg-white">
            <button onClick={()=>setMenuOpen(prevMenuOpen=> !prevMenuOpen)}><img src={closeIcon} alt=""/></button>
            <ul className="flex flex-col gap-3">
              {children}
            </ul>
          </div>
        </>
      }

      <div className="hidden lg:block">
        <ul className="flex gap-4">
          {children}
        </ul>
      </div>
    </nav>
  )
}

Header.NavPage = function HeaderNavPage({children, href}) {
  return (
    <li><a className="text-preset-3-bold text-4.5 lg:text-preset-4 lg:text-grey-500" href={href}>{children}</a></li>
  )
}

export default Header