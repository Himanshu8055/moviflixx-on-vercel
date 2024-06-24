// components/MovieDetails.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Styles from '../styles/details.module.css';

interface MovieDetailProps {
  poster_image: string;
  title: string;
  description?: string;
  genre: string;
  language: string;
  rating: number;
  trailer_url: string;
  screenshot_1: string;
  screenshot_2: string;
  screenshot_3: string;
  screenshot_4: string;
  screenshot_5: string;
  link_480p?: string;
  link_720p?: string;
  link_1080p?: string;
  link_2k?: string;
  link_4k?: string;
  link_8k?: string;
  size_480p?: string;
  size_720p?: string;
  size_1080p?: string;
  size_2k?: string;
  size_4k?: string;
  size_8k?: string;
  release_date: Date;
}

const fetchShortenedUrl = async (longUrl: any) => {
  if (!longUrl) return '';

  const convert = longUrl.replace("/", "%2F").replace(":", "%3A");
  const convert1 = `https://teradownloader.com/download?link=${convert}`;
  const apiToken = 'f5e58ee9295a1b7524110c7d8c507d29649f4263';
  const apiUrl = `https://linkpays.in/api?api=${apiToken}&url=${encodeURIComponent(convert1)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result.shortenedUrl; // Assuming the API returns a shortenedUrl field
  } catch (error) {
    console.error('Error fetching shortened URL:', error);
    return '';
  }
};

const MovieDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const detail = searchParams.get('detail');

  const [movieDetails, setMovieDetails] = useState<MovieDetailProps | null>(null);
  const [shortenedUrls, setShortenedUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (detail) {
      const parsedDetail = JSON.parse(decodeURIComponent(detail as string));
      const formattedDetail = Object.assign(
        {},
        ...parsedDetail.map((item: any) => item)
      );
      setMovieDetails(formattedDetail);
    }
  }, [detail]);

  useEffect(() => {
    const shortenUrls = async () => {
      if (movieDetails) {
        const urls = ['link_480p', 'link_720p', 'link_1080p', 'link_2k', 'link_4k', 'link_8k'];
        const shortened = await Promise.all(
          urls.map((key) => fetchShortenedUrl(movieDetails[key as keyof MovieDetailProps]))
        );
        const newShortenedUrls: { [key: string]: string } = {};
        urls.forEach((key, index) => {
          newShortenedUrls[key] = shortened[index];
        });
        setShortenedUrls(newShortenedUrls);
      }
    };
    shortenUrls();
  }, [movieDetails]);

  if (!movieDetails) {
    return <div className={Styles.loading}>Loading...</div>;
  }

  const {
    poster_image,
    title,
    genre,
    language,
    rating,
    description,
    trailer_url,
    screenshot_1,
    screenshot_2,
    screenshot_3,
    screenshot_4,
    screenshot_5,
    size_480p,
    size_720p,
    size_1080p,
    size_2k,
    size_4k,
    size_8k,
    release_date,
  } = movieDetails;

  return (
    <div className={Styles.all}>
      <div className={Styles.container}>
        <div className={Styles.poster}>
          <img src={poster_image} alt={title} />
        </div>
        <div className={Styles.details}>
          <div>
            <h1 className={Styles.title}>{title}</h1>
            <p className={Styles.subtitle}>Genre : {genre}</p>
            <p className={Styles.subtitle}>Rating : {rating}</p>
            <p className={Styles.subtitle}>Language : {language}</p>
            <p className={Styles.subtitle}>Release Date: {new Date(release_date).toLocaleDateString()}</p>
            <hr />
          </div>
          <div className='text-center'>
            <p className={Styles.description}>{description}</p>
            <a href={trailer_url} target="_blank" rel="noopener noreferrer" className={Styles.trailerButton}>
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.downloadLinks}>
          <h2>: SCREENSHOTS :</h2>
          <div className={Styles.screenshotContainer}>
            {movieDetails.screenshot_1 && (<img src={screenshot_1} alt={title} />)}
            {movieDetails.screenshot_2 && (<img src={screenshot_2} alt={title} />)}
            {movieDetails.screenshot_3 && (<img src={screenshot_3} alt={title} />)}
            {movieDetails.screenshot_4 && (<img src={screenshot_4} alt={title} />)}
            {movieDetails.screenshot_5 && (<img src={screenshot_5} alt={title} />)}
          </div>
          <hr />
          <h2>: DOWNLOAD LINKS :</h2>
          <p className='text-2xl font-mono mb-10'>Note : If fast Download Button does not work , Please use Download button or Download Mirror</p>
          <ul>
            {movieDetails.link_480p && (
              <li>
                <a href={shortenedUrls.link_480p} target="_blank" rel="noopener noreferrer">
                  Download 480p | Size: {size_480p}
                </a>
              </li>
            )}
            {movieDetails.link_720p && (
              <li>
                <a href={shortenedUrls.link_720p} target="_blank" rel="noopener noreferrer">
                  Download 720p | Size: {size_720p}
                </a>
              </li>
            )}
            {movieDetails.link_1080p && (
              <li>
                <a href={shortenedUrls.link_1080p} target="_blank" rel="noopener noreferrer">
                  Download 1080p | Size: {size_1080p}
                </a>
              </li>
            )}
            {movieDetails.link_2k && (
              <li>
                <a href={shortenedUrls.link_2k} target="_blank" rel="noopener noreferrer">
                  Download 2K | Size: {size_2k}
                </a>
              </li>
            )}
            {movieDetails.link_4k && (
              <li>
                <a href={shortenedUrls.link_4k} target="_blank" rel="noopener noreferrer">
                  Download 4K | Size: {size_4k}
                </a>
              </li>
            )}
            {movieDetails.link_8k && (
              <li>
                <a href={shortenedUrls.link_8k} target="_blank" rel="noopener noreferrer">
                  Download 8K | Size: {size_8k}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
