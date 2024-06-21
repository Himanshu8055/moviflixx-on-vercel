import React from 'react';
import { PrismaClient } from '@prisma/client';
import MovieCard from './components/movie_card';

const prisma = new PrismaClient();

const fetchMovies = async () => {
  const posts = await prisma.all_data.findMany({
    orderBy:{
    release_date: 'desc'
   }, 
  });
  await prisma.$disconnect();
  return posts;
};

const Page = async () => {
  const movies = await fetchMovies();

  return (
    <div className="m-2 flex flex-wrap">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default Page;
