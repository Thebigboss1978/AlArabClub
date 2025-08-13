import DottedSphereBackground from "@/components/DottedSphereBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <DottedSphereBackground />
      <div className="relative z-30 text-center p-4 max-w-3xl mx-auto">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg mb-4">
          AlArab Logo Universe
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
          Explore a realm where digital artistry meets ancient mystique. Dive into a universe of unique logos and captivating designs.
        </p>
        <Link to="/explore">
          <Button 
            variant="outline" 
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-6 text-lg md:text-xl rounded-full shadow-lg"
          >
            Explore Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;