"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Inbox, Menu, RefreshCw, UserPlus, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  onMenuClick?: () => void;
}

type NotificationItem = {
  id: string;
  type: "MESSAGE" | "REGISTRATION";
  title: string;
  description: string;
  href: string;
  createdAt: string;
};

type NotificationResponse = {
  total: number;
  unreadMessageCount: number;
  newRegistrationCount: number;
  items: NotificationItem[];
};

function formatNotificationTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Baru saja";
  if (diffMs < hour) return `${Math.max(1, Math.floor(diffMs / minute))} menit lalu`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} jam lalu`;

  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const displayName = user.name || "Admin";
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationResponse>({
    total: 0,
    unreadMessageCount: 0,
    newRegistrationCount: 0,
    items: [],
  });
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notificationCountLabel = useMemo(() => {
    if (notifications.total > 99) return "99+";
    return String(notifications.total);
  }, [notifications.total]);

  const fetchNotifications = async () => {
    setNotificationError(null);

    try {
      const response = await fetch("/api/admin/notifications", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil notifikasi");
      }

      const result = (await response.json()) as NotificationResponse;
      setNotifications(result);
    } catch (error) {
      setNotificationError(error instanceof Error ? error.message : "Gagal mengambil notifikasi");
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = window.setInterval(fetchNotifications, 30000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-gray-100 bg-white/92 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-light text-primary shadow-sm transition-colors hover:bg-accent/60 md:hidden"
            aria-label="Buka menu admin"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400 md:hidden">
              Admin Panel
            </p>
            <h2 className="truncate text-base font-serif font-bold text-primary sm:text-xl">
              Selamat Datang, {displayName}
            </h2>
            <p className="truncate text-xs font-medium uppercase tracking-wider text-gray-400">
              Role: {user.role || "Admin"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotificationOpen((value) => !value);
                if (!isNotificationOpen) fetchNotifications();
              }}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 shadow-sm transition-colors hover:text-primary",
                isNotificationOpen && "text-primary"
              )}
              aria-label="Buka notifikasi"
              aria-expanded={isNotificationOpen}
            >
              <Bell size={19} />
              {notifications.total > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-secondary px-1 text-[10px] font-bold leading-none text-white">
                  {notificationCountLabel}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-primary/10">
                <div className="border-b border-gray-100 bg-light/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-primary">Notifikasi</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {notifications.total > 0
                          ? `${notifications.total} data perlu ditinjau`
                          : "Tidak ada data baru"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={fetchNotifications}
                      className="flex h-9 w-9 items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 transition-colors hover:text-primary"
                      aria-label="Muat ulang notifikasi"
                    >
                      <RefreshCw size={15} className={isLoadingNotifications ? "animate-spin" : ""} />
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href="/dashboard/messages"
                      onClick={() => setIsNotificationOpen(false)}
                      className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-gray-500 shadow-sm transition-colors hover:text-primary"
                    >
                      <span className="block text-lg font-bold text-primary">{notifications.unreadMessageCount}</span>
                      Pesan baru
                    </Link>
                    <Link
                      href="/dashboard/registrations"
                      onClick={() => setIsNotificationOpen(false)}
                      className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-gray-500 shadow-sm transition-colors hover:text-primary"
                    >
                      <span className="block text-lg font-bold text-primary">{notifications.newRegistrationCount}</span>
                      Pendaftar baru
                    </Link>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto p-2">
                  {notificationError && (
                    <div className="m-2 rounded-2xl bg-red-50 p-3 text-xs font-medium text-red-600">
                      {notificationError}
                    </div>
                  )}

                  {!notificationError && notifications.items.length === 0 && !isLoadingNotifications && (
                    <div className="p-8 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-300">
                        <Bell size={22} />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-primary">Semua sudah tertangani</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Pesan dan pendaftaran baru akan muncul di sini.
                      </p>
                    </div>
                  )}

                  {notifications.items.map((item) => {
                    const Icon = item.type === "MESSAGE" ? Inbox : UserPlus;

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsNotificationOpen(false)}
                        className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-light"
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                            item.type === "MESSAGE"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-amber-50 text-amber-600"
                          )}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-bold text-primary">{item.title}</p>
                            <span className="shrink-0 text-[11px] font-medium text-gray-400">
                              {formatNotificationTime(item.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 border-l border-gray-100 pl-3 sm:pl-5">
            <div className="hidden text-right sm:block">
              <p className="max-w-36 truncate text-sm font-bold text-primary lg:max-w-56">{displayName}</p>
              <p className="max-w-36 truncate text-xs text-gray-400 lg:max-w-56">{user.email}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-light text-primary shadow-sm">
              <UserIcon size={19} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
