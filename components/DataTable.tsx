'use client';

type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

export default function DataTable({ headers, rows }: Props) {
  if (!rows.length) return null;

  return (
    <div className="overflow-x-auto rounded border mt-4">
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
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 whitespace-nowrap text-gray-800">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
