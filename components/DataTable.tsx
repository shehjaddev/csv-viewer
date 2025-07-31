"use client";

import { saveAs } from "file-saver";
import { useMemo, useState } from "react";

type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc" | null;
};

export default function DataTable({ headers, rows }: Props) {
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleSort = (header: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== header)
        return { key: header, direction: "asc" };
      if (prev.direction === "asc") return { key: header, direction: "desc" };
      return null; // reset sort
    });
  };

  const filteredRows = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    let result = rows.filter((row) =>
      headers.some((header) =>
        String(row[header] || "")
          .toLowerCase()
          .includes(lowerQuery)
      )
    );

    if (sortConfig?.direction && sortConfig.key) {
      const { key, direction } = sortConfig;

      result = [...result].sort((a, b) => {
        const valA = a[key] ?? "";
        const valB = b[key] ?? "";

        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        const isNumeric = !isNaN(numA) && !isNaN(numB);

        const cmp = isNumeric
          ? numA - numB
          : String(valA).localeCompare(String(valB), undefined, {
              numeric: true,
            });

        return direction === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [query, rows, headers, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, currentPage, rowsPerPage]);

  const getSortIndicator = (header: string) => {
    if (!sortConfig || sortConfig.key !== header) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const downloadCSV = (data: Record<string, string>[]) => {
    if (!data.length) return;

    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  const downloadJSON = (data: Record<string, string>[]) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    saveAs(blob, "data.json");
  };

  return (
    <div className="mt-4">
      {/* Global Search */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Global search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          className="w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
        />

        <div className="space-x-2">
          <button
            onClick={() => downloadCSV(filteredRows)}
            className="px-3 py-1 border rounded"
          >
            Export CSV
          </button>
          <button
            onClick={() => downloadJSON(filteredRows)}
            className="px-3 py-1 border rounded"
          >
            Export JSON
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="perPage" className="text-gray-600">
            Rows per page:
          </label>
          <select
            id="perPage"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer select-none whitespace-nowrap"
                >
                  {header}
                  <span>{getSortIndicator(header)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-2 whitespace-nowrap text-gray-800"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center text-gray-500 px-4 py-6"
                >
                  No matching rows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
