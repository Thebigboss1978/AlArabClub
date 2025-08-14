import DottedSphereBackground from "@/components/DottedSphereBackground";
import MainContent from "@/components/MainContent";

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-y-auto overflow-x-hidden"> {/* Allow vertical scrolling */}
      <DottedSphereBackground />
      {/* Hero HUD text, positioned over the background */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 text-xs text-muted-foreground pointer-events-none">
        انقر للتفجير/التجميع · حرّك الفأرة للدوران
      </div>
      <MainContent />
    </div>
  );
};

export default Index;