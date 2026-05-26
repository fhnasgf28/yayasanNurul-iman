"use client";

import { Mail, User, Clock, Trash2, CheckCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string | Date;
}

export default function MessageList({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentStatus }),
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, isRead: !currentStatus } : msg
        ));
      }
    } catch (error) {
      console.error("Gagal memperbarui status pesan:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== id));
      }
    } catch (error) {
      console.error("Gagal menghapus pesan:", error);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-secondary/10 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto">
          <Mail size={32} />
        </div>
        <p className="text-gray-500 font-medium">Belum ada pesan masuk.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          onClick={() => !msg.isRead && toggleRead(msg.id, false)}
          className={cn(
            "bg-white p-6 md:p-8 rounded-3xl border transition-all relative overflow-hidden group cursor-pointer",
            msg.isRead ? "border-secondary/10 opacity-75" : "border-secondary/30 shadow-md ring-1 ring-secondary/5"
          )}
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
                {!msg.isRead && (
                  <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Baru
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">{msg.subject}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap italic">
                  "{msg.message}"
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRead(msg.id, msg.isRead);
                }}
                className={cn(
                  "p-3 rounded-xl transition-colors",
                  msg.isRead ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                )}
                title={msg.isRead ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
              >
                {msg.isRead ? <Eye size={18} /> : <CheckCircle size={18} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMessage(msg.id);
                }}
                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                title="Hapus pesan"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
