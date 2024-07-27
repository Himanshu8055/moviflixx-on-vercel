import React from 'react';
import { PrismaClient } from '@prisma/client';
import MovieCard from '../../components/movie_card';

const prisma = new PrismaClient();

const fetchMovies = async () => {
  const posts = await prisma.all_collection.findMany({
    where: {
      type: 'Hollywood'
    },
    orderBy: {
      release_date: 'desc'
    },
    take: 210,
  });
  await prisma.$disconnect();
  return posts;
};

const Page = async () => {
  const movies = await fetchMovies();

  return (
    <div className="m-2 flex flex-wrap justify-center">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default Page;
