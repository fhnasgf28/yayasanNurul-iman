"use client";

import { Bell, User as UserIcon } from "lucide-react";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white h-20 px-8 border-b border-gray-100 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-xl font-serif font-bold text-primary">
          Selamat Datang, {user.name}
        </h2>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          Role: {user.role}
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-primary transition-colors relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-accent w-2 h-2 rounded-full border-2 border-white" />
        </button>
        
        <div className="flex items-center space-x-3 border-l pl-6 border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-primary">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <div className="w-10 h-10 bg-base rounded-full flex items-center justify-center text-primary border border-gray-100 shadow-sm">
            <UserIcon size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
