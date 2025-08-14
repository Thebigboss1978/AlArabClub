import DottedSphereBackground from "@/components/DottedSphereBackground";

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden"> {/* Changed to overflow-hidden as there's no scrollable content */}
      <DottedSphereBackground />
      {/* Hero HUD text, positioned over the background */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 text-xs text-muted-foreground pointer-events-none">
        انقر للتفجير/التجميع · حرّك الفأرة للدوران
      </div>
    </div>
  );
};

export default Index;