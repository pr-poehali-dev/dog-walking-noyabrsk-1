import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/6d7ec3e8-2a56-4129-9405-e672f040587d";

function getClientId(): string {
  let id = localStorage.getItem("dog_client_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("dog_client_id", id);
  }
  return id;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new:       { label: "Новая",      color: "#fde68a" },
  confirmed: { label: "Подтверждена", color: "#bbf7d0" },
  done:      { label: "Выполнена",  color: "#d1fae5" },
  cancelled: { label: "Отменена",   color: "#fee2e2" },
};

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

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientId = getClientId();
    fetch(`${API}?mode=my`, { headers: { "X-Client-Id": clientId } })
      .then(r => r.json())
      .then(data => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "var(--warm-cream)" }}>
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--warm-amber)" }}>
          <Icon name="ArrowLeft" size={16} /> На главную
        </a>

        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Caveat, cursive", color: "var(--warm-brown)" }}>
          Мои брони 🐾
        </h1>
        <p className="mb-8 text-sm" style={{ color: "#92400e" }}>Все ваши заявки на прогулку</p>

        {loading ? (
          <div className="text-center py-20" style={{ color: "#92400e" }}>Загружаем ваши брони...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 rounded-3xl" style={{ background: "white", border: "2px solid #fde68a" }}>
            <div className="text-6xl mb-4">🐶</div>
            <p className="font-semibold" style={{ color: "var(--warm-brown)" }}>Броней пока нет</p>
            <p className="text-sm mt-2 mb-6" style={{ color: "#92400e" }}>Забронируйте первую прогулку!</p>
            <a href="/#booking" className="btn-primary rounded-2xl">Забронировать</a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => {
              const st = STATUS_LABELS[b.status] || { label: b.status, color: "#fde68a" };
              const dateFormatted = b.date ? new Date(b.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }) : b.date;
              return (
                <div key={b.id} className="rounded-3xl p-6 shadow-sm" style={{ background: "white", border: "2px solid #fde68a" }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-bold text-lg mb-1" style={{ color: "var(--warm-brown)" }}>{b.service}</div>
                      <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "#92400e" }}>
                        <Icon name="Calendar" size={14} />
                        <span>{dateFormatted}</span>
                        <span>·</span>
                        <Icon name="Clock" size={14} />
                        <span>{b.time}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#78350f" }}>
                        <span><b>Питомец:</b> {b.dog}</span>
                        <span><b>Телефон:</b> {b.phone}</span>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: st.color, color: "var(--warm-brown)" }}>
                      {st.label}
                    </div>
                  </div>
                  <div className="mt-3 text-xs" style={{ color: "#a16207" }}>
                    Заявка #{b.id} · {new Date(b.created_at).toLocaleDateString("ru-RU")}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/#booking" className="btn-primary rounded-2xl">+ Забронировать ещё</a>
        </div>
      </div>
    </div>
  );
}
