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
      <div className="space-y-4 rounded-3xl border border-secondary/10 bg-white p-8 text-center sm:p-12">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto">
          <Mail size={32} />
        </div>
        <p className="text-gray-500 font-medium">Belum ada pesan masuk.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          onClick={() => !msg.isRead && toggleRead(msg.id, false)}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-3xl border bg-white p-5 transition-all sm:p-6 md:p-8",
            msg.isRead ? "border-secondary/10 opacity-75" : "border-secondary/30 shadow-md ring-1 ring-secondary/5"
          )}
        >
          {!msg.isRead && (
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
          )}
          
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="grid gap-2 text-sm sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                <div className="flex items-center space-x-2 text-primary font-bold">
                  <User size={16} className="text-secondary" />
                  <span className="truncate">{msg.name}</span>
                </div>
                <div className="flex min-w-0 items-center space-x-2 text-gray-400">
                  <Mail size={16} />
                  <span className="truncate">{msg.email}</span>
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
                <p className="whitespace-pre-wrap break-words text-sm italic leading-relaxed text-gray-600 sm:text-base">
                  "{msg.message}"
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRead(msg.id, msg.isRead);
                }}
                className={cn(
                  "flex flex-1 items-center justify-center rounded-2xl p-3 transition-colors md:flex-none",
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
                className="flex flex-1 items-center justify-center rounded-2xl bg-red-50 p-3 text-red-500 transition-colors hover:bg-red-100 md:flex-none"
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
