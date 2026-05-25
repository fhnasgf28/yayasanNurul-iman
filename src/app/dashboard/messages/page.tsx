import { db } from "@/lib/db";
import { Mail, User, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function MessagesPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Pesan Masuk</h1>
        <p className="text-gray-500">Lihat dan kelola pesan dari pengunjung website.</p>
      </div>

      <div className="grid gap-6">
        {messages.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-secondary/10 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto">
              <Mail size={32} />
            </div>
            <p className="text-gray-500 font-medium">Belum ada pesan masuk.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-6 md:p-8 rounded-3xl border border-secondary/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {!msg.isRead && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
              )}
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap gap-4 items-center text-sm">
                    <div className="flex items-center space-x-2 text-primary font-bold">
                      <User size={16} className="text-secondary" />
                      <span>{msg.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Mail size={16} />
                      <span>{msg.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock size={16} />
                      <span>
                        {format(new Date(msg.createdAt), "PPP p", { locale: id })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">{msg.subject}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap italic">
                      "{msg.message}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {/* Di sini bisa ditambahkan tombol aksi seperti hapus atau tandai telah dibaca */}
                  {/* Untuk sekarang kita buat tampilannya dulu */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
