"use client";

import { Bell, Menu, User as UserIcon } from "lucide-react";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  onMenuClick?: () => void;
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const displayName = user.name || "Admin";

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
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 shadow-sm transition-colors hover:text-primary">
            <Bell size={19} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-secondary" />
          </button>

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
