import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import useAuthStore from "../store/authStore"

const NavLinks = ({
  isMobile = false,
  onLinkClick,
  handleLogout,
}: {
  isMobile?: boolean
  onLinkClick?: () => void
  handleLogout?: () => void
}) => {
  const { isAuthenticated } = useAuthStore()

  const commonLinkClass = "text-sm font-medium hover:text-primary"
  const activeLinkClass = "text-primary"

  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${commonLinkClass} ${
            isActive ? activeLinkClass : "text-primary-foreground/70"
          }`
        }
        onClick={onLinkClick}
      >
        Home
      </NavLink>
      <NavLink
        to="/articles"
        className={({ isActive }) =>
          `${commonLinkClass} ${
            isActive ? activeLinkClass : "text-primary-foreground/70"
          }`
        }
        onClick={onLinkClick}
      >
        Articles
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `${commonLinkClass} ${
            isActive ? activeLinkClass : "text-primary-foreground/70"
          }`
        }
        onClick={onLinkClick}
      >
        Categories
      </NavLink>

      {!isAuthenticated ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${commonLinkClass} ${
                isActive ? activeLinkClass : "text-primary-foreground/70"
              }`
            }
            onClick={onLinkClick}
          >
            Login
          </NavLink>
          <NavLink to="/register" onClick={onLinkClick}>
            <Button
              size={isMobile ? "lg" : "sm"}
              className="w-full md:w-auto text-foreground"
            >
              Register
            </Button>
          </NavLink>
        </>
      ) : (
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`${commonLinkClass} text-primary-foreground/70`}
        >
          Logout
        </Button>
      )}
    </>
  )
}

export const Navbar = () => {
  const { logout } = useAuthStore()

  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleMobile = () => setMobileOpen(!mobileOpen)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b flex items-center justify-center border-border px-6 sm:px-0 bg-background-foreground/90">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl text-primary-foreground font-semibold">
            Travel Apps
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLinks handleLogout={logout} />
        </nav>

        <div className="md:hidden z-30">
          <Button variant="ghost" size="icon" onClick={toggleMobile}>
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-0 right-0 bg-background-foreground px-4 pb-4 pt-2 space-y-2">
          <div className="grid gap-4 py-6">
            <Link to="/" className="flex items-center gap-2 mb-4"></Link>
            <NavLinks
              isMobile
              onLinkClick={closeMobile}
              handleLogout={logout}
            />
          </div>
        </div>
      )}
    </header>
  )
}
