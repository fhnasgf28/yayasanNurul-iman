import { db } from "@/lib/db";
import MessageList from "@/components/admin/MessageList";

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

      <MessageList initialMessages={messages} />
    </div>
  );
}
