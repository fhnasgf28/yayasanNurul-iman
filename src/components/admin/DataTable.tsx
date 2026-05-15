"use client";

import { Edit, Trash2, Search, Plus, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

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

export default function DataTable({ columns, data, onDelete, createHref, title }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const q = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) => String(val ?? "").toLowerCase().includes(q))
    );
  }, [data, searchTerm]);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      onDelete?.(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle size={22} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-primary">Hapus Data?</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-semibold text-gray-700">&ldquo;{deleteTarget.label}&rdquo;</span> akan dihapus
                  permanen dan tidak dapat dikembalikan.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-serif font-bold text-primary">{title}</h2>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none focus:border-primary/40 transition-colors shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {createHref && (
            <Link
              href={`${createHref}/new`}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-primary/90 transition-all shadow-md shrink-0"
            >
              <Plus size={16} />
              <span>Tambah Baru</span>
            </Link>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {columns.map((col) => (
                  <th key={col.header} className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/60 transition-colors group">
                  {columns.map((col) => (
                    <td key={col.header} className="px-6 py-4 text-sm text-gray-700">
                      {col.render ? col.render(row[col.accessor], row) : (
                        <span className="line-clamp-1">{row[col.accessor]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-1">
                      <Link
                        href={`${createHref}/${row.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget({ id: row.id, label: row.title || row.caption || row.id })}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Search size={22} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium text-sm">
              {searchTerm ? `Tidak ada hasil untuk "${searchTerm}"` : "Belum ada data tersedia."}
            </p>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-primary text-xs font-bold hover:underline">
                Hapus pencarian
              </button>
            )}
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Menampilkan{" "}
            <span className="font-semibold text-gray-600">{filteredData.length}</span>
            {searchTerm && <> dari <span className="font-semibold text-gray-600">{data.length}</span></>}{" "}
            data
          </p>
        </div>
      </div>
    </div>
  );
}
