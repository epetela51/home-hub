import React from 'react';

import AppHeader from '../../components/AppHeader/AppHeader';
import Button from '../../components/Button/Button';

const Home = () => {
  return (
    <>
      <AppHeader />
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-semibold">Welcome Home</div>
        <Button url="/breaker" text="Find a breaker" />
        <Button url="/meals" text="Lets eat" />
      </div>
    </>
  );
};

export default Home;
