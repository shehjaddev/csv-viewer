'use client';

import React, { useState, useMemo } from 'react';

type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};

export default function DataTable({ headers, rows }: Props) {
  const [query, setQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (header: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== header) return { key: header, direction: 'asc' };
      if (prev.direction === 'asc') return { key: header, direction: 'desc' };
      return null; // reset sort
    });
  };

  const filteredRows = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    let result = rows.filter((row) =>
      headers.some((header) =>
        String(row[header] || '').toLowerCase().includes(lowerQuery)
      )
    );

    if (sortConfig?.direction && sortConfig.key) {
      const { key, direction } = sortConfig;

      result = [...result].sort((a, b) => {
        const valA = a[key] ?? '';
        const valB = b[key] ?? '';

        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        const isNumeric = !isNaN(numA) && !isNaN(numB);

        const cmp = isNumeric
          ? numA - numB
          : String(valA).localeCompare(String(valB), undefined, { numeric: true });

        return direction === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [query, rows, headers, sortConfig]);

  const getSortIndicator = (header: string) => {
    if (!sortConfig || sortConfig.key !== header) return '';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="mt-4">
      {/* Global Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Global search..."
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
            {filteredRows.map((row, rowIndex) => (
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
    </div>
  );
}
