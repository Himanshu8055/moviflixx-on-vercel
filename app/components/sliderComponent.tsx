"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Styles from '@/app/styles/sliderComponent.module.css';
import { usePathname } from 'next/navigation';


const SliderComponent = () => {
  const listRef = useRef<HTMLUListElement>(null);

  let pathname = usePathname();

  if (pathname.startsWith("/trending")) {
    pathname = "/trending";
} else if (pathname.startsWith("/bollywood")) {
    pathname = "/bollywood";
} else if (pathname.startsWith("/hollywood")) {
    pathname = "/hollywood";
} else if (pathname.startsWith("/south")) {
    pathname = "/south";
} else if (pathname.startsWith("/series")) {
    pathname = "/series";
} else {
    pathname = "";
}
const websiteName = 'http://moviflixx.vercel.app'

  const navLinks = [
    { name: 'Action', href: `${websiteName}${pathname}/action`},
    { name: 'Adventure', href: `${websiteName}${pathname}/adventure`},
    { name: 'Biography', href: `${websiteName}${pathname}/biography`},
    { name: 'Comedy', href: `${websiteName}${pathname}/comedy`},
    { name: 'Documentary', href: `${websiteName}${pathname}/documentary`},
    { name: 'Dual Audio', href: `${websiteName}${pathname}/dual audio`},
    { name: 'Fantasy', href: `${websiteName}${pathname}/fantasy`},
    { name: 'Hindi Dubbed', href: `${websiteName}${pathname}/hindi dubbed`},
    { name: 'History', href: `${websiteName}${pathname}/hindi dubbed`},
    { name: 'Horror', href: `${websiteName}${pathname}/horror`},
    { name: 'Movies Series Collection', href: `${websiteName}${pathname}/movies series collection`},
    { name: 'Music', href: `${websiteName}${pathname}/music`},
    { name: 'Mystery', href:`${websiteName}${pathname}/mystery`},
    { name: 'Punjabi', href: `${websiteName}${pathname}/punjabi` },
    { name: 'Romance', href: `${websiteName}${pathname}/romance`},
    { name: 'Science Fiction', href: `${websiteName}${pathname}/science fiction`},
    { name: 'Thriller', href: `${websiteName}${pathname}/thriller`},
    { name: 'Unofficial', href: `${websiteName}${pathname}/unofficial`},
    { name: 'War', href: `${websiteName}${pathname}/war`},
  ];

  const handleScrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className={Styles.sliderContainer}>
      <button onClick={handleScrollLeft}>
        <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M5 12L11 6M5 12L11 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={Styles.listContainer}>
        <ul className={Styles.slide_ul} ref={listRef}>
          {navLinks.map((link) => (
            <li className={Styles.slide_li} key={link.name}>
              <Link key={link.name} href={link.href} className={Styles.slide_list}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleScrollRight}>
        <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#ffffff" />
        </svg>
      </button>
    </div>
  );
};

export default SliderComponent;
