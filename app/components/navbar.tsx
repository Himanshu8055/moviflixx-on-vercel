import React from 'react'
import Link from 'next/link'
import Styles from '@/app/styles/navbar.module.css'

const navbar = () => {


  const navLinks = [
    {
      name: 'Trending',
      href: '/trending',
    },
    {
      name: 'Bollywood',
      href: '/bollywood',
    },
    {
      name: 'Hollywood',
      href: '/hollywood',
    },
    {
      name: 'South',
      href: '/south',
    },
    {
      name: 'Series',
      href: '/series',
    },
    {
      name: 'Anime',
      href: '/anime',
    },
    {
      name: 'K-Drama',
      href: '/k_drama',
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