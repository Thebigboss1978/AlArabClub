"use client";

import React, { useEffect, useRef, useState } from 'react';
import DottedSphereBackground from "@/components/DottedSphereBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";

const Index: React.FC = () => {
  const introSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);

  const [hasAudioPlayed, setHasAudioPlayed] = useState(false);

  const playIntroSound = () => {
    if (introSoundRef.current && !hasAudioPlayed) {
      introSoundRef.current.currentTime = 0;
      introSoundRef.current.play().catch(e => console.error("Error playing intro sound:", e));
      setHasAudioPlayed(true);
    }
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.error("Error playing click sound:", e));
    }
  };

  const handleSphereClick = () => {
    playClickSound();
    if (eyeRef.current) {
      eyeRef.current.style.left = "55%";
      setTimeout(() => {
        if (eyeRef.current) eyeRef.current.style.left = "50%";
      }, 1000);
    }
  };

  useEffect(() => {
    // Play intro sound on first user interaction (e.g., click anywhere)
    const handleFirstInteraction = () => {
      playIntroSound();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Glyphs generation (moved from DottedSphereBackground)
  const glyphsContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const glyphs = "𓂀𓏏𓆣𓋹𓉐𓄿𓇳𓎛𓈖𓃭𓍯𓊃𓊪𓃾𓈎𓅱𓅓𓃀𓇋𓍿𓐍𓊽𓌳𓋴𓇯𓏠𓉔𓁷ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|\\/~?><!-=:,.αβγδεζηθικλμνξοπρστυφχψωАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯشعرابشيخفجثجظرزسضطىةءؤإأآ✓∞≠±∑∂∆µπ⊕⊗⊙⊥∩∪∈∉∀∃√∛☥☯☸  ⚛🔥✨🌌💫S⋄A⋄L⋄S⋄";
    const container = glyphsContainerRef.current;
    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < 200; i++) {
        const glyph = document.createElement("div");
        glyph.className = "glyph";
        glyph.style.left = `${Math.random() * 100}%`;
        glyph.style.top = `-${Math.random() * 100}%`;
        glyph.style.animationDelay = `${Math.random() * 2}s`;
        glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        container.appendChild(glyph);
      }
    }
  }, []);


  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-black text-ink">
      {/* Background Layers */}
      <div className="scanlines"></div>
      <div className="grid-background"></div>
      <div className="glyphs" ref={glyphsContainerRef}></div>
      <DottedSphereBackground onSphereClick={handleSphereClick} />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-14">
        <div ref={eyeRef} className="eye-container" title="Eye of Horus">𓁹</div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 text-xs text-muted-text whitespace-nowrap">
          انقر للتفجير/التجميع · حرّك الفأرة للدوران
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="relative z-20">
        <SectionWrapper
          id="safari"
          title="01_𓃰 سفاري الصحراء"
          slug="/ Desert Adventures"
          kicker="انطلق في رحلة لا تُنسى إلى قلب الصحراء العربية — 4x4، جمال، و Quad Bikes — وانغمس في روح الرمال القديمة."
          ctaText="ادخل البوابة الروحية"
          ctaHref="#spirit"
        >
          <Card
            title="4x4 Dune Bashing"
            description="جولات طوفان على الكثبان الذهبية مع توقفات للتصوير والغروب."
            pillText="60–120 دقيقة"
          />
          <Card
            title="Camel Trek"
            description="نزول ناعم لنبض الصحراء على ظهر الجمل، قهوة عربية وتمور."
            pillText="مسار قصير/طويل"
          />
          <Card
            title="Quad Sprint"
            description="دراجات رباعية بسرعة مضبوطة ومسار آمن للمبتدئ والمحترف."
            pillText="معدات متوفرة"
          />
        </SectionWrapper>

        <SectionWrapper
          id="temples"
          title="02_𓉐 المعابد المقدسة"
          slug="/ Sacred Sites"
          kicker="رحلات منسّقة إلى المعابد والأهرام، مع سرد أسطوري وإسقاطات ضوئية ليلية."
        >
          <Card
            title="Luxor & Karnak"
            description="ممرات الأعمدة وصدى النقوش — مسار تاريخي تفاعلي."
            pillText="جولة نهارية/ليلية"
          />
          <Card
            title="Giza Horizon"
            description="أفق الجيزة مع عرض ليزري خفيف يشرح محاور النجوم."
            pillText="+ انتقال VR"
          />
          <Card
            title="Saqqara Layers"
            description="طبقات العمارة من زوسر حتى الأسرات الحديثة."
            pillText="دليل ثنائي اللغة"
          />
        </SectionWrapper>

        <SectionWrapper
          id="nile"
          title="03_𓇳 النيل والفلّوكات"
          slug="/ River Journeys"
          kicker="رحلات نهرية هادئة، موسيقى عود حيّة، وموائد تقليدية على سطح المركب."
        >
          <Card
            title="Sunset Felucca"
            description="خط الأفق يلمع، والرياح تدفعك نحو الحلم."
            pillText="90 دقيقة"
          />
          <Card
            title="Nubian Nights"
            description="ألوان النوبة وأغانيها على صفحة ماء ساكن."
            pillText="أصالة × فن"
          />
        </SectionWrapper>

        <SectionWrapper
          id="spirit"
          title="04_𓂀 البوابة الروحية"
          slug="/ Spirit Portal"
          kicker="بوابة تزامن بين الرمز والهندسة — اختبر الوعي كمسار ملاحي، لا كنقطة وصول."
          ctaText="اذهب إلى Matrix777"
          ctaHref="#matrix777"
        >
          <Card
            title="Ritual Mode"
            description="تتابع خطوات سمعي/بصري — يفتح حالات جديدة في الواجهة."
            pillText="Unlockables"
          />
          <Card
            title="Soul GPT"
            description="حوار مرمّز يعتمد السياق الرمزي للهُوية البصرية."
            pillText="Context-aware"
          />
        </SectionWrapper>

        <SectionWrapper
          id="archives"
          title="05_𓏠 الأرشيف الرقمي"
          slug="/ Digital Archives"
          kicker="أطالس، مخططات، وخرائط نجميّة — قابل للبحث والتوسّع."
        >
          <Card
            title="Codex"
            description="دفتر شفرات وصيغ رسمية للمخطوط البصري."
            pillText="PDF/JSON"
          />
          <Card
            title="Media Vault"
            description="صور عالية الدقة، فيديوهات، ولقطات 360°."
            pillText="Rights-ready"
          />
        </SectionWrapper>

        <SectionWrapper
          id="workshops"
          title="06_𓌳 الورش والطقوس"
          slug="/ Workshops"
          kicker="جلسات حيّة: نقش، موسيقى، لغة هيروغليفية، وتجارب تفاعلية."
        >
          <Card
            title="Hieroglyph 101"
            description="أبجدية الرموز والاتصال البصري."
            pillText="Starter"
          />
          <Card
            title="Sound Bath"
            description="مجالات ترددية تنظّف الشاشة الداخلية."
            pillText="Binaural"
          />
        </SectionWrapper>

        <SectionWrapper
          id="merch"
          title="07_𓋹 المتجر"
          slug="/ Merch"
          kicker="أقنعة، تمائم، وطبعات فنية — شحن عالمي."
        >
          <Card
            title="Sigil Masks"
            description="أقنعة طقسية قابلة للتخصيص."
            pillText="Made-to-order"
          />
          <Card
            title="Glyph Prints"
            description="طبعات معدنية بإضاءة خفيفة."
            pillText="A3/A2"
          />
        </SectionWrapper>

        <SectionWrapper
          id="matrix777"
          title="08_⋄ Matrix777"
          slug="/ Signal Grid"
          kicker="شبكة تزامن — لوحات قياس طاقة/إلهام — تُحدّث آليًا."
        >
          <Card
            title="Resonance Map"
            description="خرائط ديناميكية للنشاط."
            pillText="Live"
          />
          <Card
            title="Key 7:7:7"
            description="بوابات أرقام وإشارات."
            pillText="Rotating"
          />
        </SectionWrapper>

        <SectionWrapper
          id="meta"
          title="09_☥ الميتا"
          slug="/ System & Lore"
          kicker="شرح الفلسفة، هندسة المعلومات، ومخطط الهوية البصرية."
        >
          <Card
            title="Design System"
            description="الألوان، الشبكات، المكوّنات، القواعد."
            pillText="Figma spec"
          />
          <Card
            title="Mythos"
            description="السرد المؤسِّس وأصله."
            pillText="Canon"
          />
        </SectionWrapper>

        <SectionWrapper
          id="contact"
          title="10_✉ تواصل"
          slug="/ Contact"
          kicker="ارسل إشارتك. سنعود إليك بسرعة الضوء."
        >
          <ContactForm />
        </SectionWrapper>
      </main>

      {/* Footer */}
      <Footer />

      {/* Audio Elements */}
      <audio id="introSound" src="https://alarabclub777.vercel.app/sounds/intro.mp3" preload="auto" ref={introSoundRef}></audio>
      <audio id="clickSound" src="https://alarabclub777.vercel.app/sounds/click.mp3" preload="auto" ref={clickSoundRef}></audio>
    </div>
  );
};

export default Index;