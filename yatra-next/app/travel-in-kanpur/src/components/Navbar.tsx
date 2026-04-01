'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  onBookNowClick: () => void
}

export default function Navbar({ onBookNowClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMob = () => setMenuOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 20 L8 10 L14 17 L20 8 L24 20 Z" fill="#fff" stroke="#fff" strokeWidth=".5" strokeLinejoin="round" />
              <circle cx="8" cy="22" r="2.5" fill="#ff6b35" />
              <circle cx="20" cy="22" r="2.5" fill="#ff6b35" />
              <rect x="6" y="18" width="16" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>
          <div className="logo-text-wrap">
            <span className="logo-main">Yatra<span>Travel</span></span>
            <span className="logo-sub">India</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#fleet">Fleet</Link>
          <Link href="/#attractions">Attractions</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <a href="tel:+919044019511" className="nav-phone">+91 90440 19511</a>
        <button className="btn-booknow" onClick={onBookNowClick}>Book Now</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>
      </div>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link href="/" onClick={closeMob}>Home</Link>
        <Link href="/#services" onClick={closeMob}>Services</Link>
        <Link href="/#fleet" onClick={closeMob}>Fleet</Link>
        <Link href="#booking" onClick={closeMob}>Book Now</Link>
        <button className="btn-booknow" onClick={() => { closeMob(); onBookNowClick(); }} style={{ textAlign: 'center', marginTop: '10px', display: 'block', padding: '12px', borderRadius: '8px', width: '100%' }}>
          Book Now
        </button>
      </div>
    </nav>
  )
}
