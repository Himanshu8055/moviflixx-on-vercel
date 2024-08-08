// pages/[id].tsx (Server-Side Rendering with Next.js 14)
import { PrismaClient } from '@prisma/client';
import React from 'react';
import Styles from '@/app/styles/details.module.css';

const prisma = new PrismaClient();

const fetchMovies = async (id: number) => {
  const movie = await prisma.adult.findUnique({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  return movie;
};

const fetchShortenedUrl = async (longUrl: string | null) => {
  if (!longUrl) return '';

  const convert = longUrl.replace("/", "%2F").replace(":", "%3A");
  const convert1 = `https://terab0x.pages.dev/?q=${convert}`;
  // const convert1 = `https://teradownloader.com/download?link=${convert}`;
  const apiToken = 'f5e58ee9295a1b7524110c7d8c507d29649f4263';
  const apiUrl = `https://linkpays.in/api?api=${apiToken}&url=${encodeURIComponent(convert1)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result.shortenedUrl || ''; // Ensure the API returns a shortenedUrl field
  } catch (error) {
    console.error('Error fetching shortened URL:', error);
    return '';
  }
};

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const data = parseInt(params.id, 10);

  if (isNaN(data)) {
    return <div>Invalid ID</div>;
  }

  const movieDetails = await fetchMovies(data);

  if (!movieDetails) {
    return <div>Movie not found</div>;
  }

  const {
    title,
    genre,
    rating,
    language,
    release_date,
    description,
    trailer_url,
    poster_image,
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
  } = movieDetails;

  // Fetch shortened URLs
  const shortenedUrls = {
    link_480p: link_480p ? await fetchShortenedUrl(link_480p) : '',
    link_720p: link_720p ? await fetchShortenedUrl(link_720p) : '',
    link_1080p: link_1080p ? await fetchShortenedUrl(link_1080p) : '',
    link_2k: link_2k ? await fetchShortenedUrl(link_2k) : '',
    link_4k: link_4k ? await fetchShortenedUrl(link_4k) : '',
    link_8k: link_8k ? await fetchShortenedUrl(link_8k) : '',
  };

  return (
    <div className={Styles.all}>
      <div className={Styles.container}>
        <div className={Styles.poster}>
          <img src={poster_image || ''} alt={title || 'Poster Image'} />
        </div>
        <div className={Styles.details}>
          <div>
            <h1 className={Styles.title}>{title}</h1>
            <p className={Styles.subtitle}>Genre : {genre}</p>
            <p className={Styles.subtitle}>Rating : {rating}</p>
            <p className={Styles.subtitle}>Language : {language}</p>
            <p className={Styles.subtitle}>Release Date: {release_date ? new Date(release_date).toLocaleDateString() : 'N/A'}</p>
            <hr />
          </div>
          <div className='text-center'>
            <p className={Styles.description}>{description}</p>
            <a href={trailer_url || '#'} target="_blank" rel="noopener noreferrer" className={Styles.trailerButton}>
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.downloadLinks}>
          <h2>: SCREENSHOTS :</h2>
          <div className={Styles.screenshotContainer}>
            {screenshot_1 && (<img src={screenshot_1} alt={title || 'Screenshot 1'} />)}
            {screenshot_2 && (<img src={screenshot_2} alt={title || 'Screenshot 2'} />)}
            {screenshot_3 && (<img src={screenshot_3} alt={title || 'Screenshot 3'} />)}
            {screenshot_4 && (<img src={screenshot_4} alt={title || 'Screenshot 4'} />)}
            {screenshot_5 && (<img src={screenshot_5} alt={title || 'Screenshot 5'} />)}
          </div>
          <hr />
          <h2>: DOWNLOAD LINKS :</h2>
          <p className='text-2xl font-mono mb-10'>Note : If fast Download Button does not work , Please use Download button or Download Mirror</p>
          <ul>
            {link_480p && (
              <li>
                <a href={shortenedUrls?.link_480p || '#'} target="_blank" rel="noopener noreferrer">
                  Download 480p {size_480p && <span>| Size: {size_480p}</span>}
                </a>
              </li>
            )}

            {link_720p && (
              <li>
                <a href={shortenedUrls.link_720p || '#'} target="_blank" rel="noopener noreferrer">
                  Download 720p {size_720p && <span>| Size: {size_720p}</span>}
                </a>
              </li>
            )}
            {link_1080p && (
              <li>
                <a href={shortenedUrls.link_1080p || '#'} target="_blank" rel="noopener noreferrer">
                  Download 1080p {size_1080p && <span>| Size: {size_1080p}</span>}
                </a>
              </li>
            )}
            {link_2k && (
              <li>
                <a href={shortenedUrls.link_2k || '#'} target="_blank" rel="noopener noreferrer">
                  Download 2K {size_2k && <span>| Size: {size_2k}</span>}
                </a>
              </li>
            )}
            {link_4k && (
              <li>
                <a href={shortenedUrls.link_4k || '#'} target="_blank" rel="noopener noreferrer">
                  Download 4K {size_4k && <span>| Size: {size_4k}</span>}
                </a>
              </li>
            )}
            {link_8k && (
              <li>
                <a href={shortenedUrls.link_8k || '#'} target="_blank" rel="noopener noreferrer">
                  Download 8K {size_8k && <span>| Size: {size_8k}</span>}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
