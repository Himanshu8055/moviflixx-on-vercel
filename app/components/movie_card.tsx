"use client";
import React from 'react';
import Styles from '.././styles/cards.module.css'
import { useRouter } from 'next/navigation'

interface MovieCardProps {
  poster_image: string;
  title: string;
  genre: string;
  language: string;
  rating: number;
  release_date: Date;
  trailer_url: string;
  description?: string;
  screenshot_1: string;
  screenshot_2: string;
  screenshot_3: string;
  screenshot_4: string;
  screenshot_5: string;
  link_480p: string;
  size_480p: string;
  link_720p: string;
  size_720p: string;
  link_1080p: string;
  size_1080p: string;
  size_2k: string;
  link_2k: string;
  link_4k: string;
  size_4k: string;
  link_8k: string;
  size_8k: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  poster_image,
  title,
  description,
  genre,
  language,
  rating,
  trailer_url,
  screenshot_1,
  screenshot_2,
  screenshot_3,
  screenshot_4,
  screenshot_5,
  link_480p,
  link_720p,
  link_1080p,
  link_2k,
  link_4k,
  link_8k,
  size_480p,
  size_720p,
  size_1080p,
  size_2k,
  size_4k,
  size_8k,
  release_date,
}) => {

  const detail = [
    { poster_image: poster_image },
    { genre: genre },
    { rating: rating },
    { language: language },
    { release_date: release_date },
    { title: title },
    { description: description },
    { trailer_url: trailer_url },
    { screenshot_1: screenshot_1 },
    { screenshot_2: screenshot_2 },
    { screenshot_3: screenshot_3 },
    { screenshot_4: screenshot_4 },
    { screenshot_5: screenshot_5 },
    { link_480p: link_480p },
    { link_720p: link_720p },
    { link_1080p: link_1080p },
    { link_2k: link_2k },
    { link_4k: link_4k },
    { link_8k: link_8k },
    { size_480p: size_480p },
    { size_720p: size_720p },
    { size_1080p: size_1080p },
    { size_2k: size_2k },
    { size_4k: size_4k },
    { size_8k: size_8k }
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const ReleaseDate = release_date ? formatDate(release_date) : 'Unknown Date';

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringifiedDetail = JSON.stringify(detail);
    router.push(`/details?detail=${encodeURIComponent(stringifiedDetail)}`);
  };

  return (
    <form onSubmit={handleSubmit} >
      <button type="submit">
        <div className={Styles.card}>
          <div
            className={Styles.top_section}
            style={{
              backgroundImage: `url(${poster_image})`,
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

