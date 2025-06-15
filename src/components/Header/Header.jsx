import {useState, useEffect} from 'react';
import {useContext, createContext} from 'react';
import {nanoid} from 'nanoid'
import { CartDataContext } from '../../App.jsx'
import menuIcon from '../../assets/images/icon-menu.svg'
import logo from '../../assets/images/logo.svg'
import cartIcon from '../../assets/images/icon-cart.svg'
import userProfileIcon from '../../assets/images/image-avatar.png'
import closeIcon from '../../assets/images/icon-close.svg'
import deleteIcon from '../../assets/images/icon-delete.svg'

const HeaderContext = createContext();

function Header({children, pages}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(menuOpen);
  },[menuOpen]);

  return (
    <HeaderContext.Provider value={{pages, menuOpen, setMenuOpen}}>
      <header className="flex justify-between items-center px-3 sm:px-0">
        {children}
      </header>
    </HeaderContext.Provider>
  )
}

Header.MenuIcon = function HeaderMenuIcon() {
  const {setMenuOpen} = useContext(HeaderContext);

  return (
    <button className="lg:hidden cursor-pointer active:scale-95" onClick={()=>setMenuOpen(prevMenuOpen => !prevMenuOpen)}>
      <img src={menuIcon} alt=""/>
    </button>
  )
}

Header.Logo = function HeaderLogo() {
  return (<img className="h-2.5" src={logo} alt="sneakers logo"/>)
}

Header.CartButton = function HeaderCartButton() {
  const {cart, setOpenCart} = useContext(CartDataContext);
  return (
    <button className="relative cursor-pointer active:scale-95" onClick={()=>setOpenCart(prevOpenCart => !prevOpenCart)}>
      { cart.quantity && <p className="absolute -top-1 -right-1 text-[10px] text-white font-bold px-[8px] bg-orange-500 rounded-[6.5px]">{cart.quantity}</p>}
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

Header.Navbar = function HeaderNavbar() {
  const {menuOpen, setMenuOpen, pages} = useContext(HeaderContext);
  return (
    <nav>
      { menuOpen && <div className={`fixed inset-0 z-110 opacity-75 lg:hidden bg-black`}></div>}
      <div className={`max-w-37.5 fixed inset-y-0 z-120 left-0 right-[33.33%] p-3 sm:px-10 sm:py-6 flex flex-col gap-7 lg:hidden bg-white transition-all duration-500 ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <button className="cursor-pointer" onClick={()=>setMenuOpen(prevMenuOpen=> !prevMenuOpen)}><img src={closeIcon} alt=""/></button>
        <ul className="flex flex-col gap-3">
          {pages.map(page=><Header.NavPage key={nanoid()} href={page.href}>{page.page}</Header.NavPage>)}
        </ul>
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-4">
          {pages.map(page=><Header.NavPage key={nanoid()} href={page.href}>{page.page}</Header.NavPage>)}
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

Header.CartModal = function HeaderCartModal() {
  const {cart, setCart, openCart, setOpenCart} = useContext(CartDataContext);
  return(
    openCart &&
    <div className="fixed top-11 right-1 lg:right-8 z-1000 rounded-[10px] bg-white drop-shadow-xl">
      <div className="w-45 min-h-32 py-3 flex flex-col gap-3">
        <h2 className="px-3 text-preset-3-bold text-grey-950">Cart</h2>
        <hr className="text-grey-100"/>
        { cart.quantity > 0 ?
          <div className="flex flex-col gap-3 px-2">
            <div className="flex gap-2">
              <img src={cart.image.src} alt={cart.image.alt} className="h-6.25 w-6.25 rounded-[4px]"/>
              <div>
                <p className="text-preset-3 text-grey-500">{cart.productName}</p>
                <div className="flex gap-1">
                  <p className="text-preset-3 text-grey-500">{`$${cart.discountedPrice} x ${cart.quantity}`}</p>
                  <p className="text-preset-3-bold text-grey-950">{`$${cart.discountedPrice * cart.quantity}`}</p>
                </div>
              </div>

              <button className="cursor-pointer active:scale-95" onClick={() => {setCart({}); setOpenCart(false)}}>
                <img src={deleteIcon} alt=""/>
              </button>
            </div>
            <button className="py-2 text-preset-3-bold text-grey-950 bg-orange-500 hover:bg-orange-300 rounded-[10px] cursor-pointer">Checkout</button>
          </div> : <div className="flex pt-6 justify-center items-center">
            <p className="text-preset-3-bold text-grey-500">Your cart is empty.</p>
          </div>}
      </div>
    </div>
  )
}

export default Header