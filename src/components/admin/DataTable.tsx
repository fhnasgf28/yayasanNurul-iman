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
  const baseHref = createHref?.replace(/\/new$/, "");
  const createUrl = createHref ? (createHref.endsWith("/new") ? createHref : `${createHref}/new`) : undefined;
  const mediaColumn = columns.find((col) => ["thumbnail", "imageUrl"].includes(col.accessor));
  const primaryColumn = columns.find((col) => col.accessor !== mediaColumn?.accessor) ?? columns[0];

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

  const renderCell = (row: any, col: Column) =>
    col.render ? col.render(row[col.accessor], row) : (
      <span className="line-clamp-2 break-words">{row[col.accessor]}</span>
    );

  const getRowLabel = (row: any) => row.title || row.caption || row.name || row.subject || row.id;

  return (
    <div className="space-y-5 sm:space-y-6">
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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-serif font-bold text-primary">{title}</h2>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative w-full sm:flex-1 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm shadow-sm outline-none transition-colors focus:border-primary/40"
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
          {createUrl && (
            <Link
              href={createUrl}
              className="flex shrink-0 items-center justify-center space-x-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90"
            >
              <Plus size={16} />
              <span>Tambah Baru</span>
            </Link>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:block">
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
                      {renderCell(row, col)}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-1">
                      {baseHref && (
                        <Link
                          href={`${baseHref}/${row.id}/edit`}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                      )}
                      <button
                        onClick={() => setDeleteTarget({ id: row.id, label: getRowLabel(row) })}
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
      </div>

      <div className="space-y-3 md:hidden">
        {filteredData.map((row) => (
          <article key={row.id} className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              {mediaColumn && (
                <div className="shrink-0 overflow-hidden rounded-2xl">
                  {renderCell(row, mediaColumn)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {primaryColumn.header}
                </p>
                <div className="mt-1 text-sm font-bold text-primary">
                  {renderCell(row, primaryColumn)}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4">
              {columns
                .filter((col) => col.accessor !== mediaColumn?.accessor && col.accessor !== primaryColumn.accessor)
                .map((col) => (
                  <div key={col.header} className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-400">{col.header}</span>
                    <div className="max-w-[65%] text-right text-sm text-gray-700">
                      {renderCell(row, col)}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-4 flex gap-2">
              {baseHref && (
                <Link
                  href={`${baseHref}/${row.id}/edit`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600"
                >
                  <Edit size={16} />
                  Edit
                </Link>
              )}
              <button
                type="button"
                onClick={() => setDeleteTarget({ id: row.id, label: getRowLabel(row) })}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-500"
              >
                <Trash2 size={16} />
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="rounded-3xl border border-gray-100 bg-white py-14 text-center shadow-sm md:rounded-none md:border-0 md:shadow-none">
          <div className="space-y-3">
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
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 md:rounded-none md:border-x-0 md:border-b-0 md:bg-gray-50/80 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
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
