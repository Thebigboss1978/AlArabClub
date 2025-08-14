"use client";

import React, { useEffect, useRef } from 'react';
import { showSuccess, showError } from '@/utils/toast'; // Import toast utilities

const MainContent: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });

    sectionRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    // For now, we'll just show a success toast.
    showSuccess('تم إرسال رسالتك بنجاح!');
    // Optionally, clear the form fields
    e.currentTarget.reset();
  };

  return (
    <div className="relative z-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 backdrop-blur-md border-b border-green-500">
        <nav className="flex items-center gap-3 p-2 md:p-4">
          <div className="font-extrabold tracking-wider text-gold-500 text-lg md:text-xl">𓁹 AlArab 5D</div>
          <a href="#safari" className="nav-link">Safari</a>
          <a href="#temples" className="nav-link">Temples</a>
          <a href="#nile" className="nav-link">Nile</a>
          <a href="#spirit" className="nav-link">Spirit Portal</a>
          <a href="#archives" className="nav-link">Archives</a>
          <a href="#workshops" className="nav-link">Workshops</a>
          <a href="#merch" className="nav-link">Merch</a>
          <a href="#matrix777" className="nav-link">Matrix777</a>
          <a href="#meta" className="nav-link">Meta</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      <main className="relative z-20 pt-[60px]"> {/* Added padding-top to account for fixed header */}
        {/* HERO section - The visual is handled by DottedSphereBackground, only text content here */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-14 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gold-500 mb-4 drop-shadow-lg">
            AlArab Club 777
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 max-w-2xl opacity-90">
            بوابة الروح · Cyber-Egyptian Experience
          </p>
        </section>

        {/* 01_safari_𓃰 Desert Adventures */}
        <section id="safari" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">01_𓃰 سفاري الصحراء <span className="text-muted-foreground text-sm">/ Desert Adventures</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">انطلق في رحلة لا تُنسى إلى قلب الصحراء العربية — 4x4، جمال، و Quad Bikes — وانغمس في روح الرمال القديمة.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <article className="card"><h4>4x4 Dune Bashing</h4><p className="text-muted-foreground">جولات طوفان على الكثبان الذهبية مع توقفات للتصوير والغروب.</p><span className="pill">60–120 دقيقة</span></article>
            <article className="card"><h4>Camel Trek</h4><p className="text-muted-foreground">نزول ناعم لنبض الصحراء على ظهر الجمل، قهوة عربية وتمور.</p><span className="pill">مسار قصير/طويل</span></article>
            <article className="card"><h4>Quad Sprint</h4><p className="text-muted-foreground">دراجات رباعية بسرعة مضبوطة ومسار آمن للمبتدئ والمحترف.</p><span className="pill">معدات متوفرة</span></article>
          </div>
          <a className="cta" href="#spirit">ادخل البوابة الروحية →</a>
        </section>

        {/* 02_temples_𓉐 Sacred Sites */}
        <section id="temples" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">02_𓉐 المعابد المقدسة <span className="text-muted-foreground text-sm">/ Sacred Sites</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">رحلات منسّقة إلى المعابد والأهرام، مع سرد أسطوري وإسقاطات ضوئية ليلية.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <article className="card"><h4>Luxor & Karnak</h4><p className="text-muted-foreground">ممرات الأعمدة وصدى النقوش — مسار تاريخي تفاعلي.</p><span className="pill">جولة نهارية/ليلية</span></article>
            <article className="card"><h4>Giza Horizon</h4><p className="text-muted-foreground">أفق الجيزة مع عرض ليزري خفيف يشرح محاور النجوم.</p><span className="pill">+ انتقال VR</span></article>
            <article className="card"><h4>Saqqara Layers</h4><p className="text-muted-foreground">طبقات العمارة من زوسر حتى الأسرات الحديثة.</p><span className="pill">دليل ثنائي اللغة</span></article>
          </div>
        </section>

        {/* 03_nile_𓇳 River & Feluccas */}
        <section id="nile" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">03_𓇳 النيل والفلّوكات <span className="text-muted-foreground text-sm">/ River Journeys</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">رحلات نهرية هادئة، موسيقى عود حيّة، وموائد تقليدية على سطح المركب.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Sunset Felucca</h4><p className="text-muted-foreground">خط الأفق يلمع، والرياح تدفعك نحو الحلم.</p><span className="pill">90 دقيقة</span></article>
            <article className="card"><h4>Nubian Nights</h4><p className="text-muted-foreground">ألوان النوبة وأغانيها على صفحة ماء ساكن.</p><span className="pill">أصالة × فن</span></article>
          </div>
        </section>

        {/* 04_spirit_portal_𓂀 */}
        <section id="spirit" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">04_𓂀 البوابة الروحية <span className="text-muted-foreground text-sm">/ Spirit Portal</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">بوابة تزامن بين الرمز والهندسة — اختبر الوعي كمسار ملاحي، لا كنقطة وصول.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Ritual Mode</h4><p className="text-muted-foreground">تتابع خطوات سمعي/بصري — يفتح حالات جديدة في الواجهة.</p><span className="pill">Unlockables</span></article>
            <article className="card"><h4>Soul GPT</h4><p className="text-muted-foreground">حوار مرمّز يعتمد السياق الرمزي للهُوية البصرية.</p><span className="pill">Context-aware</span></article>
          </div>
          <a className="cta" href="#matrix777">اذهب إلى Matrix777 →</a>
        </section>

        {/* 05_archives_𓏠 Digital Archives */}
        <section id="archives" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">05_𓏠 الأرشيف الرقمي <span className="text-muted-foreground text-sm">/ Digital Archives</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">أطالس، مخططات، وخرائط نجميّة — قابل للبحث والتوسّع.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Codex</h4><p className="text-muted-foreground">دفتر شفرات وصيغ رسمية للمخطوط البصري.</p><span className="pill">PDF/JSON</span></article>
            <article className="card"><h4>Media Vault</h4><p className="text-muted-foreground">صور عالية الدقة، فيديوهات، ولقطات 360°.</p><span className="pill">Rights-ready</span></article>
          </div>
        </section>

        {/* 06_workshops_𓌳 */}
        <section id="workshops" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">06_𓌳 الورش والطقوس <span className="text-muted-foreground text-sm">/ Workshops</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">جلسات حيّة: نقش، موسيقى، لغة هيروغليفية، وتجارب تفاعلية.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Hieroglyph 101</h4><p className="text-muted-foreground">أبجدية الرموز والاتصال البصري.</p><span className="pill">Starter</span></article>
            <article className="card"><h4>Sound Bath</h4><p className="text-muted-foreground"> مجالات ترددية تنظّف الشاشة الداخلية.</p><span className="pill">Binaural</span></article>
          </div>
        </section>

        {/* 07_merch_𓋹 */}
        <section id="merch" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">07_𓋹 المتجر <span className="text-muted-foreground text-sm">/ Merch</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">أقنعة، تمائم، وطبعات فنية — شحن عالمي.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Sigil Masks</h4><p className="text-muted-foreground">أقنعة طقسية قابلة للتخصيص.</p><span className="pill">Made-to-order</span></article>
            <article className="card"><h4>Glyph Prints</h4><p className="text-muted-foreground">طبعات معدنية بإضاءة خفيفة.</p><span className="pill">A3/A2</span></article>
          </div>
        </section>

        {/* 08_matrix777_⋄ */}
        <section id="matrix777" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">08_⋄ Matrix777 <span className="text-muted-foreground text-sm">/ Signal Grid</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">شبكة تزامن — لوحات قياس طاقة/إلهام — تُحدّث آليًا.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Resonance Map</h4><p className="text-muted-foreground">خرائط ديناميكية للنشاط.</p><span className="pill">Live</span></article>
            <article className="card"><h4>Key 7:7:7</h4><p className="text-muted-foreground">بوابات أرقام وإشارات.</p><span className="pill">Rotating</span></article>
          </div>
        </section>

        {/* 09_meta_☥ System & Lore */}
        <section id="meta" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">09_☥ الميتا <span className="text-muted-foreground text-sm">/ System & Lore</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">شرح الفلسفة، هندسة المعلومات، ومخطط الهوية البصرية.</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <article className="card"><h4>Design System</h4><p className="text-muted-foreground">الألوان، الشبكات، المكوّنات، القواعد.</p><span className="pill">Figma spec</span></article>
            <article className="card"><h4>Mythos</h4><p className="text-muted-foreground">السرد المؤسِّس وأصله.</p><span className="pill">Canon</span></article>
          </div>
        </section>

        {/* 10_contact_✉ */}
        <section id="contact" ref={addSectionRef} className="reveal py-18 px-4 max-w-screen-xl mx-auto border-t border-green-500 border-opacity-30">
          <h2 className="flex items-center gap-2 font-black text-gold-500 text-2xl md:text-3xl mb-2">10_✉ تواصل <span className="text-muted-foreground text-sm">/ Contact</span></h2>
          <p className="text-blue-300 opacity-90 mb-4">ارسل إشارتك. سنعود إليك بسرعة الضوء.</p>
          <form className="card p-4" onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-ink-500">الاسم</span><br/>
              <input required type="text" className="w-full p-2 rounded-md border border-green-600 bg-gray-950 text-green-200 mt-1" />
            </label>
            <label className="block mb-4">
              <span className="text-ink-500">البريد</span><br/>
              <input required type="email" className="w-full p-2 rounded-md border border-green-600 bg-gray-950 text-green-200 mt-1" />
            </label>
            <label className="block mb-4">
              <span className="text-ink-500">الرسالة</span><br/>
              <textarea required rows={5} className="w-full p-2 rounded-md border border-green-600 bg-gray-950 text-green-200 mt-1"></textarea>
            </label>
            <button className="cta" type="submit">إرسال</button>
          </form>
        </section>
      </main>

      <footer className="py-16 px-4 border-t border-green-500 border-opacity-30 text-center text-muted-foreground">
        © AlArab 5D — بوابة الروح · Cyber-Egyptian Experience
      </footer>
    </div>
  );
};

export default MainContent;