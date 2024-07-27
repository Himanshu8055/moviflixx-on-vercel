"use client";
import React, { useEffect, useRef, useState } from 'react';
import Styles from '../styles/cards.module.css';
import { useRouter, usePathname } from 'next/navigation';

interface MovieCardProps {
  id: number;
  poster_image: string;
  title: string;
  release_date: Date;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  poster_image,
  title,
  release_date,
}) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const ReleaseDate = release_date ? formatDate(release_date) : 'Unknown Date';

  const router = useRouter();

  let pathname = usePathname().toString();

  if (pathname.startsWith('/anime')) {
    pathname = '/anime';
  } else if (pathname.startsWith('/hollywood')) {
    pathname = '/hollywood';
  } else if (pathname.startsWith('/indian')) {
    pathname = '/indian';
  } else if (pathname.startsWith('/shows')) {
    pathname = '/shows';
  } else if (pathname.startsWith('/series')) {
    pathname = '/series';
  } else {
    pathname = '';
  }

  // Localhost
  // const searchResult = `http://localhost:3000${pathname}/details/${id}`;

  // Main
  const searchResult = `http://moviflixx.vercel.app${pathname}/details/${id}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(searchResult);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        <div className={Styles.card} ref={cardRef}>
          <div
            className={Styles.top_section}
            style={{
              backgroundImage: isInView ? `url(${poster_image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={Styles.border}></div>
            <div className={Styles.icons}>
              <div className={Styles.logo}>{ReleaseDate}</div>
            </div>
          </div>
          <div className={Styles.bottom_section}>
            <span className={Styles.title}>{title}</span>
          </div>
        </div>
      </button>
    </form>
  );
};

export default MovieCard;
