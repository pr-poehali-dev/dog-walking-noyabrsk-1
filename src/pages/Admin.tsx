import { useState } from "react";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/6d7ec3e8-2a56-4129-9405-e672f040587d";

const STATUS_OPTIONS = [
  { value: "new",       label: "Новая",        color: "#fde68a" },
  { value: "confirmed", label: "Подтверждена", color: "#bbf7d0" },
  { value: "done",      label: "Выполнена",    color: "#d1fae5" },
  { value: "cancelled", label: "Отменена",     color: "#fee2e2" },
];

type Booking = {
  id: number;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  dog: string;
  status: string;
  created_at: string;
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const login = () => {
    setLoading(true);
    setAuthError(false);
    fetch(`${API}?mode=admin`, { headers: { "X-Admin-Password": password } })
      .then(r => {
        if (r.status === 401) { setAuthError(true); setLoading(false); return null; }
        return r.json();
      })
      .then(data => {
        if (!data) return;
        setBookings(Array.isArray(data) ? data : []);
        setAuthed(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const refresh = () => {
    fetch(`${API}?mode=admin`, { headers: { "X-Admin-Password": password } })
      .then(r => r.json())
      .then(data => setBookings(Array.isArray(data) ? data : []));
  };

  const updateStatus = (id: number, status: string) => {
    fetch(`${API}?mode=status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Password": password },
      body: JSON.stringify({ id, status }),
    }).then(() => {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    });
  };

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--warm-cream)" }}>
        <div className="w-full max-w-sm rounded-3xl p-8 shadow-xl" style={{ background: "white" }}>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)" }}>Панель администратора</h1>
            <p className="text-sm mt-1" style={{ color: "#92400e" }}>Введите пароль для входа</p>
          </div>
          <input
            type="password"
            placeholder="Пароль"
            className="w-full rounded-2xl px-4 py-3 text-sm border-2 outline-none mb-3"
            style={{ borderColor: authError ? "#fca5a5" : "#fde68a", background: "var(--warm-cream)", color: "var(--warm-brown)" }}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
          />
          {authError && <p className="text-sm text-red-500 mb-3 text-center">Неверный пароль</p>}
          <button className="btn-primary w-full rounded-2xl" onClick={login} disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>
          <div className="mt-4 text-center">
            <a href="/" className="text-sm hover:opacity-70" style={{ color: "var(--warm-amber)" }}>← На сайт</a>
          </div>
        </div>
      </div>
    );
  }

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s.value] = bookings.filter(b => b.status === s.value).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "var(--warm-cream)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)" }}>
              Все брони 🐾
            </h1>
            <p className="text-sm" style={{ color: "#92400e" }}>Всего заявок: {bookings.length}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={refresh} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80" style={{ background: "#fde68a", color: "var(--warm-brown)" }}>
              <Icon name="RefreshCw" size={15} /> Обновить
            </button>
            <a href="/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: "white", color: "var(--warm-brown)", border: "2px solid #fde68a" }}>
              <Icon name="ArrowLeft" size={15} /> На сайт
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STATUS_OPTIONS.map(s => (
            <div key={s.value} className="rounded-2xl p-4 text-center cursor-pointer transition-all hover:shadow-md"
              style={{ background: filter === s.value ? s.color : "white", border: `2px solid ${s.color}` }}
              onClick={() => setFilter(filter === s.value ? "all" : s.value)}>
              <div className="text-2xl font-black" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)" }}>{counts[s.value] || 0}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: "#78350f" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-3xl" style={{ background: "white", border: "2px solid #fde68a" }}>
            <div className="text-5xl mb-3">📭</div>
            <p style={{ color: "var(--warm-brown)" }}>Заявок нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(b => {
              const st = STATUS_OPTIONS.find(s => s.value === b.status) || STATUS_OPTIONS[0];
              const dateFormatted = b.date ? new Date(b.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" }) : b.date;
              return (
                <div key={b.id} className="rounded-3xl p-5 shadow-sm" style={{ background: "white", border: "2px solid #fde68a" }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="font-bold" style={{ color: "var(--warm-brown)" }}>#{b.id} · {b.name}</span>
                        <span className="text-sm font-medium" style={{ color: "#92400e" }}>{b.phone}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-2" style={{ color: "#78350f" }}>
                        <span><b>Услуга:</b> {b.service}</span>
                        <span><b>Питомец:</b> {b.dog}</span>
                        <span><b>Дата:</b> {dateFormatted} в {b.time}</span>
                      </div>
                      <div className="text-xs" style={{ color: "#a16207" }}>
                        Заявка от {new Date(b.created_at).toLocaleString("ru-RU")}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: st.color, color: "var(--warm-brown)" }}>
                        {st.label}
                      </div>
                      <select
                        className="text-xs px-3 py-1.5 rounded-xl border-2 outline-none cursor-pointer"
                        style={{ borderColor: "#fde68a", background: "var(--warm-cream)", color: "var(--warm-brown)" }}
                        value={b.status}
                        onChange={e => updateStatus(b.id, e.target.value)}>
                        {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
