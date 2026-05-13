"use client";

import { Edit, Trash2, Search, Plus } from "lucide-react";
import Link from "next/link";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onDelete?: (id: string) => void;
  createHref?: string;
  title: string;
}

export default function DataTable({
  columns,
  data,
  onDelete,
  createHref,
  title,
}: DataTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:row justify-between items-center gap-4">
        <h2 className="text-xl font-serif font-bold text-primary">{title}</h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari..."
              className="w-full bg-white border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent transition-colors shadow-sm"
            />
          </div>
          {createHref && (
            <Link
              href={createHref}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-opacity-90 transition-all shadow-md shrink-0"
            >
              <Plus size={18} />
              <span>Tambah Baru</span>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.header}
                    className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest"
                  >
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.header} className="px-6 py-4">
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`${createHref}/${row.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => onDelete?.(row.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {data.length === 0 && (
          <div className="py-20 text-center space-y-4">
             <div className="w-16 h-16 bg-base rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Search size={32} />
             </div>
             <p className="text-gray-400 font-medium">Belum ada data tersedia.</p>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
           <p className="text-xs text-gray-400">Menampilkan {data.length} data</p>
           <div className="flex space-x-2">
              <button className="px-4 py-1 bg-white border border-gray-200 rounded text-xs font-bold disabled:opacity-50">Prev</button>
              <button className="px-4 py-1 bg-white border border-gray-200 rounded text-xs font-bold disabled:opacity-50">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
