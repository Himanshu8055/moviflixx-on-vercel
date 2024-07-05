import React from 'react'
import Link from 'next/link'
import Styles from '@/app/styles/navbar.module.css'

const navbar = () => {


  const navLinks = [
    {
      name: 'Anime',
      href: '/anime',
    },
    {
      name: 'Hollywood',
      href: '/hollywood',
    },
    {
      name: 'Indian',
      href: '/indian',
    },
    {
      name: 'Series',
      href: '/series',
    },
    {
      name: 'Shows',
      href: '/shows',
    },
  ];


  return (
    <div className={Styles.navbardevice}>
      <nav className={Styles.navbar}>
        <ul>
          {navLinks.map((link) => (
            <Link key={link.name}
              href={link.href}
              className={Styles.a}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default navbar