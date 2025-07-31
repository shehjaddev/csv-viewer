'use client';

import React, { useState, useMemo } from 'react';

type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

export default function DataTable({ headers, rows }: Props) {
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    if (!query) return rows;

    return rows.filter((row) =>
      headers.some((header) =>
        String(row[header] || '')
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  }, [query, rows, headers]);

  if (!rows.length) return null;

  return (
    <div className="mt-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search all fields..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={header} className="px-4 py-2 whitespace-nowrap text-gray-800">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="text-center text-gray-500 px-4 py-6">
                  No matching rows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
