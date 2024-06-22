"use client"
import React, { useState } from 'react';
import Styles from '@/app/styles/header.module.css';
import TelegramButton from '@/app/styles/button.module.css';
import Image from 'next/image';
import InputSearch from './input'
import Navbar from './navbar'
import Link from 'next/link';

const Header = () => {

  return (
    <div className={Styles.headerContainer}>
      <div className={Styles.header}>
        {/* Our website's Logo */}
        <div className={Styles.websitelogo}>
          <Link href="/">
            <Image src="/movieflix_logo.png" alt="Logo" width={150} height={100} />
          </Link>
        </div>

        {/* Search and Navbar */}
        <div className={Styles.navbarContainer}>
          {/* Searchbar and Telegram */}
          <div className={Styles.search_header}>
            <InputSearch />
            {/* Link to Join Telegram Channel */}
            <a className={TelegramButton.button} href="https://t.me/movi_flix" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <div className={Styles.navItem}>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;