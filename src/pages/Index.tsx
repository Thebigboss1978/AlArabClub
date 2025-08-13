import DottedSphereBackground from "@/components/DottedSphereBackground";

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <DottedSphereBackground />
      {/* You can add other content on top of the background here if needed */}
      {/* For example, a title or navigation, ensuring it has a higher z-index */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        {/* <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
          AlArab Logo Universe
        </h1> */}
      </div>
    </div>
  );
};

export default Index;