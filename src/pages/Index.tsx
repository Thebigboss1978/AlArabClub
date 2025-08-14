import DottedSphereBackground from "@/components/DottedSphereBackground";

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-y-auto overflow-x-hidden"> {/* Allow vertical scrolling */}
      <DottedSphereBackground />
      {/* Hero HUD text, positioned over the background */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 text-xs text-muted-foreground pointer-events-none">
        انقر للتفجير/التجميع · حرّك الفأرة للدوران
      </div>
      {/* Main content removed */}
    </div>
  );
};

export default Index;