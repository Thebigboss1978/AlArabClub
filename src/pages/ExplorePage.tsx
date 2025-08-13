import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ExplorePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Welcome to the Explore Page!
      </h1>
      <p className="text-lg md:text-xl text-center mb-8 max-w-2xl">
        This is where you can discover all the amazing logos and designs. More content coming soon!
      </p>
      <Link to="/">
        <Button 
          variant="outline" 
          className="bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background transition-colors duration-300 px-6 py-3 text-lg rounded-full"
        >
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default ExplorePage;