import { useState } from "react";
import Icon from "@/components/ui/icon";

type BookingState = { date: string; time: string; service: string; name: string; phone: string; dog: string };

const IMG_HERO = "https://cdn.poehali.dev/projects/330cd952-4b1d-4d56-90e3-f65e3a446771/files/6b21730f-9499-4db0-918a-b51ffdbe6cd0.jpg";
const IMG_WALKER = "https://cdn.poehali.dev/projects/330cd952-4b1d-4d56-90e3-f65e3a446771/files/42678aa7-5049-4dc7-a929-67cdf9e4237d.jpg";
const IMG_DOGS = "https://cdn.poehali.dev/projects/330cd952-4b1d-4d56-90e3-f65e3a446771/files/40ef9bb7-89a3-4cd6-9029-face428e3324.jpg";

const services = [
  { icon: "Footprints", title: "Стандартная прогулка", desc: "60 минут в парке, свежий воздух и активное движение для вашего питомца", color: "#fde68a" },
  { icon: "Zap", title: "Экспресс-прогулка", desc: "30 минут для занятых владельцев — быстро и качественно", color: "#fed7aa" },
  { icon: "Star", title: "VIP-прогулка", desc: "90 минут с фотоотчётом, игрушками и лакомствами", color: "#bbf7d0" },
  { icon: "Heart", title: "Групповая прогулка", desc: "Социализация с другими собаками в дружелюбной компании", color: "#ddd6fe" },
];

const prices = [
  { name: "Экспресс", duration: "30 мин", price: "600", popular: false },
  { name: "Стандарт", duration: "60 мин", price: "1 000", popular: true },
  { name: "VIP", duration: "90 мин", price: "1 500", popular: false },
  { name: "Абонемент", duration: "10 прогулок", price: "5 000", popular: false },
];

const reviews = [
  { name: "Марина К.", dog: "Лабрадор Рыжик", text: "Отличный сервис! Наш Рыжик возвращается всегда счастливым и уставшим. Рекомендую всем!", stars: 5, avatar: "🐕" },
  { name: "Алексей П.", dog: "Хаски Буря", text: "Профессиональный подход и чуткое отношение к животным. Приходят вовремя, пишут отчёты.", stars: 5, avatar: "🐺" },
  { name: "Ольга Н.", dog: "Пудель Клод", text: "Клод обожает свои прогулки! Выгульщики очень добрые и терпеливые. Спасибо огромное!", stars: 5, avatar: "🐩" },
  { name: "Дмитрий В.", dog: "Корги Пончик", text: "Пончик ждёт выгульщика у двери каждый день. Это лучшая рекомендация!", stars: 5, avatar: "🦊" },
];

const gallery = [IMG_HERO, IMG_WALKER, IMG_DOGS];

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState({ date: "", time: "", service: "", name: "", phone: "", dog: "" });
  const [bookingDone, setBookingDone] = useState(false);

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#about", label: "О нас" },
    { href: "#prices", label: "Цены" },
    { href: "#gallery", label: "Галерея" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ];

  const handleBooking = () => {
    setBookingDone(true);
    setBookingStep(1);
    setBooking({ date: "", time: "", service: "", name: "", phone: "", dog: "" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--warm-cream)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: "rgba(253,246,237,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(217,119,6,0.15)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)", fontSize: "1.6rem" }}>
            <span className="animate-wiggle inline-block">🐾</span> ПёсПрогулки
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:text-amber-600" style={{ color: "#78350f" }}>{l.label}</a>
            ))}
            <a href="#booking" className="btn-primary text-sm px-5 py-2.5 rounded-xl">Забронировать</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: "var(--warm-brown)" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4 animate-slide-down" style={{ background: "var(--warm-cream)", borderBottom: "1px solid rgba(217,119,6,0.15)" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium" style={{ color: "var(--warm-brown)" }} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#booking" className="btn-primary text-sm text-center rounded-xl" onClick={() => setMenuOpen(false)}>Забронировать</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden paw-bg">
        <div className="absolute top-20 right-10 text-6xl animate-float opacity-30 select-none">🐾</div>
        <div className="absolute bottom-20 left-10 text-5xl animate-float opacity-20 select-none" style={{ animationDelay: "2s" }}>🦴</div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium animate-fade-in-up" style={{ background: "#fde68a", color: "var(--warm-brown)" }}>
              <span>📍</span> Работаем в Ноябрьске
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up delay-100" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)" }}>
              Прогулки для собак с любовью 🐕
            </h1>
            <p className="text-lg mb-8 leading-relaxed animate-fade-in-up delay-200" style={{ color: "#78350f" }}>
              Заботимся о вашем питомце как о своём. Онлайн-бронирование, фотоотчёты и всегда вовремя.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <a href="#booking" className="btn-primary text-center rounded-2xl">Забронировать прогулку</a>
              <a href="#services" className="btn-outline text-center rounded-2xl">Узнать подробнее</a>
            </div>
            <div className="flex gap-8 mt-10 animate-fade-in-up delay-400">
              {[["200+", "счастливых собак"], ["2 года", "на рынке"], ["100%", "довольных хозяев"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-amber)" }}>{num}</div>
                  <div className="text-xs" style={{ color: "#92400e" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in-up delay-300">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl" style={{ background: "#fde68a", transform: "rotate(3deg)" }}></div>
            <img src={IMG_HERO} alt="Счастливая собака" className="relative rounded-3xl w-full object-cover shadow-2xl" style={{ height: "420px" }} />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold text-sm" style={{ color: "var(--warm-brown)" }}>5.0 рейтинг</div>
                <div className="text-xs" style={{ color: "#92400e" }}>120+ отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Наши услуги</h2>
            <p className="text-base" style={{ color: "#92400e" }}>Выбирайте то, что подходит вашему питомцу</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="card-hover rounded-3xl p-6 cursor-pointer" style={{ background: "white", border: "2px solid transparent", animationDelay: `${i * 0.1}s` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--warm-amber)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: s.color }}>
                  <Icon name={s.icon} size={26} style={{ color: "var(--warm-brown)" }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--warm-brown)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#92400e" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4 paw-bg" style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl" style={{ background: "rgba(217,119,6,0.15)", transform: "rotate(-2deg)" }}></div>
            <img src={IMG_WALKER} alt="Наша команда" className="relative rounded-3xl w-full object-cover shadow-xl" style={{ height: "380px" }} />
          </div>
          <div>
            <h2 className="section-title mb-6">О нас</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#78350f" }}>
              Мы — команда настоящих любителей животных из Ноябрьска. Каждый наш выгульщик прошёл обучение и знает, как обращаться с собаками любых пород и темпераментов.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#78350f" }}>
              Мы понимаем, как важно доверять тому, кто гуляет с вашим питомцем. Поэтому работаем прозрачно: присылаем фото и геолокацию во время каждой прогулки.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Shield", text: "Застрахованные выгульщики" },
                { icon: "Camera", text: "Фотоотчёт после прогулки" },
                { icon: "MapPin", text: "GPS-трекинг маршрута" },
                { icon: "Clock", text: "Точность до минуты" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(217,119,6,0.2)" }}>
                    <Icon name={item.icon} size={18} style={{ color: "var(--warm-amber)" }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#78350f" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-20 px-4" style={{ background: "var(--warm-cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Цены</h2>
            <p className="text-base" style={{ color: "#92400e" }}>Прозрачно и честно, без скрытых платежей</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prices.map(p => (
              <div key={p.name} className={`rounded-3xl p-6 text-center card-hover relative ${p.popular ? "shadow-xl" : ""}`}
                style={{ background: p.popular ? "var(--warm-amber)" : "white", border: p.popular ? "none" : "2px solid #fde68a" }}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: "var(--warm-brown)", color: "white" }}>
                    Популярный
                  </div>
                )}
                <div className="text-sm font-semibold mb-1" style={{ color: p.popular ? "rgba(255,255,255,0.8)" : "#92400e" }}>{p.duration}</div>
                <div className="text-4xl font-black my-3" style={{ fontFamily: "Caveat, cursive", color: p.popular ? "white" : "var(--warm-brown)" }}>{p.price} ₽</div>
                <div className="font-semibold mb-5" style={{ color: p.popular ? "white" : "var(--warm-brown)" }}>{p.name}</div>
                <a href="#booking" className="block py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ color: p.popular ? "var(--warm-amber)" : "white", background: p.popular ? "white" : "var(--warm-amber)" }}>
                  Выбрать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-4" style={{ background: "#fef9f0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Галерея</h2>
            <p className="text-base" style={{ color: "#92400e" }}>Наши четвероногие клиенты на прогулке</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((src, i) => (
              <div key={i} className="rounded-3xl overflow-hidden card-hover shadow-md">
                <img src={src} alt={`Галерея ${i + 1}`} className="w-full object-cover" style={{ height: i === 1 ? "320px" : "260px" }} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm" style={{ color: "#92400e" }}>Фотоотчёт после каждой прогулки — бесплатно 📸</p>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 px-4 paw-bg" style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Забронировать прогулку</h2>
            <p style={{ color: "#78350f" }}>Выберите удобное время — и мы придём!</p>
          </div>

          <div className="rounded-3xl p-8 shadow-xl" style={{ background: "white" }}>
            {bookingDone ? (
              <div className="text-center py-8">
                <div className="text-7xl mb-4 animate-wiggle">🎉</div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)" }}>Заявка принята!</h3>
                <p style={{ color: "#92400e" }}>Мы свяжемся с вами в течение 30 минут для подтверждения.</p>
                <button className="btn-primary mt-6 rounded-2xl" onClick={() => setBookingDone(false)}>Забронировать ещё</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {[1, 2, 3].map(step => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                        style={{ background: bookingStep >= step ? "var(--warm-amber)" : "#fde68a", color: bookingStep >= step ? "white" : "var(--warm-brown)" }}>
                        {step}
                      </div>
                      {step < 3 && <div className="w-12 h-0.5" style={{ background: bookingStep > step ? "var(--warm-amber)" : "#fde68a" }}></div>}
                    </div>
                  ))}
                </div>

                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-4" style={{ color: "var(--warm-brown)" }}>1. Выберите услугу и дату</h3>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#78350f" }}>Услуга</label>
                      <select className="w-full rounded-2xl px-4 py-3 text-sm border-2 outline-none transition-colors"
                        style={{ borderColor: booking.service ? "var(--warm-amber)" : "#fde68a", background: "var(--warm-cream)", color: "var(--warm-brown)" }}
                        value={booking.service} onChange={e => setBooking({ ...booking, service: e.target.value })}>
                        <option value="">Выберите услугу...</option>
                        {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#78350f" }}>Дата прогулки</label>
                      <input type="date" className="w-full rounded-2xl px-4 py-3 text-sm border-2 outline-none transition-colors"
                        style={{ borderColor: booking.date ? "var(--warm-amber)" : "#fde68a", background: "var(--warm-cream)", color: "var(--warm-brown)" }}
                        value={booking.date} min={new Date().toISOString().split("T")[0]}
                        onChange={e => setBooking({ ...booking, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#78350f" }}>Время</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setBooking({ ...booking, time: t })}
                            className="py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                            style={{ background: booking.time === t ? "var(--warm-amber)" : "#fef9f0", color: booking.time === t ? "white" : "var(--warm-brown)", border: `2px solid ${booking.time === t ? "var(--warm-amber)" : "#fde68a"}` }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="btn-primary w-full rounded-2xl mt-4"
                      disabled={!booking.service || !booking.date || !booking.time}
                      onClick={() => setBookingStep(2)}
                      style={{ opacity: (!booking.service || !booking.date || !booking.time) ? 0.5 : 1 }}>
                      Далее →
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-4" style={{ color: "var(--warm-brown)" }}>2. О вас и вашей собаке</h3>
                    {[
                      { key: "name", label: "Ваше имя", placeholder: "Например: Мария Иванова", type: "text" },
                      { key: "phone", label: "Номер телефона", placeholder: "+7 (000) 000-00-00", type: "tel" },
                      { key: "dog", label: "Имя и порода собаки", placeholder: "Рыжик, лабрадор, 3 года", type: "text" },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-2" style={{ color: "#78350f" }}>{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder}
                          className="w-full rounded-2xl px-4 py-3 text-sm border-2 outline-none transition-colors"
                          style={{ borderColor: booking[field.key as keyof BookingState] ? "var(--warm-amber)" : "#fde68a", background: "var(--warm-cream)", color: "var(--warm-brown)" }}
                          value={booking[field.key as keyof BookingState]}
                          onChange={e => setBooking({ ...booking, [field.key]: e.target.value })} />
                      </div>
                    ))}
                    <div className="flex gap-3">
                      <button className="btn-outline flex-1 rounded-2xl" onClick={() => setBookingStep(1)}>← Назад</button>
                      <button className="btn-primary flex-1 rounded-2xl"
                        disabled={!booking.name || !booking.phone || !booking.dog}
                        onClick={() => setBookingStep(3)}
                        style={{ opacity: (!booking.name || !booking.phone || !booking.dog) ? 0.5 : 1 }}>
                        Далее →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div>
                    <h3 className="font-bold text-lg mb-6" style={{ color: "var(--warm-brown)" }}>3. Подтверждение</h3>
                    <div className="rounded-2xl p-5 space-y-3 mb-6" style={{ background: "var(--warm-cream)" }}>
                      {[
                        ["Услуга", booking.service],
                        ["Дата", booking.date ? new Date(booking.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" }) : ""],
                        ["Время", booking.time],
                        ["Имя", booking.name],
                        ["Телефон", booking.phone],
                        ["Питомец", booking.dog],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span style={{ color: "#92400e" }}>{label}</span>
                          <span className="font-semibold" style={{ color: "var(--warm-brown)" }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className="btn-outline flex-1 rounded-2xl" onClick={() => setBookingStep(2)}>← Назад</button>
                      <button className="btn-primary flex-1 rounded-2xl" onClick={handleBooking}>Забронировать 🐾</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-4" style={{ background: "var(--warm-cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Отзывы</h2>
            <p style={{ color: "#92400e" }}>Что говорят хозяева наших клиентов</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-3xl p-6 card-hover" style={{ background: "white", border: "2px solid #fde68a" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{r.avatar}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "var(--warm-brown)" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "#92400e" }}>{r.dog}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array(r.stars).fill(0).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#78350f" }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-4" style={{ background: "var(--warm-brown)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "Caveat, cursive", color: "#fde68a" }}>Контакты</h2>
            <p style={{ color: "#fcd9a0" }}>Всегда на связи для вас и вашего питомца</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (912) 421-32-27", sub: "Ежедневно 8:00–21:00" },
              { icon: "MapPin", title: "Адрес", value: "г. Ноябрьск", sub: "Работаем по всему городу" },
            ].map(c => (
              <div key={c.title} className="text-center p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "#fde68a" }}>
                  <Icon name={c.icon} size={22} style={{ color: "var(--warm-brown)" }} />
                </div>
                <div className="font-semibold mb-1" style={{ color: "#fde68a" }}>{c.title}</div>
                <div className="font-bold mb-1" style={{ color: "white" }}>{c.value}</div>
                <div className="text-sm" style={{ color: "#fcd9a0" }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#booking" className="inline-block px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ background: "#fde68a", color: "var(--warm-brown)" }}>
              Записаться на прогулку 🐾
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-4 text-center text-sm" style={{ background: "#3c1a00", color: "#fcd9a0" }}>
        © 2024 ПёсПрогулки · Ноябрьск · Всё для счастья вашего питомца 🐾
      </footer>
    </div>
  );
}