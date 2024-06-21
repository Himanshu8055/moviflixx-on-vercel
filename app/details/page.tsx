// pages/details.tsx
import React, { Suspense } from 'react';
import MovieDetails from '../components/MovieDetails';

const DetailsPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDetails />
    </Suspense>
  );
};

export default DetailsPage;
