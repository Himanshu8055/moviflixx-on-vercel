// Page.tsx (Server-Side Rendering)

import React from 'react';
import { PrismaClient } from '@prisma/client';
import MovieCard from '@/app/components/movie_card';

const prisma = new PrismaClient();

const fetchMovies = async (title: string) => {



    const posts = await prisma.web_series.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: title,
                    },
                },
                {
                    genre: {
                        contains: title,
                    },
                },
            ]
        },
        orderBy: {
            release_date: 'desc'
        }

    });
    await prisma.$disconnect();
    return posts;
};

const Page = async ({ params }: { params: { id: string } }) => {

    const search = decodeURIComponent(params.id)

    const movies = await fetchMovies(search);

    return (
        <div className="m-2 flex flex-wrap">
            {movies.map((movie: any) => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
    );
};

export default Page;
