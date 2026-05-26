import { db } from "@/lib/db";
import MessageList from "@/components/admin/MessageList";

export default async function MessagesPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">Pesan Masuk</h1>
        <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">Lihat dan kelola pesan dari pengunjung website.</p>
      </div>

      <MessageList initialMessages={messages} />
    </div>
  );
}
