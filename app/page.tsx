"use client";

import { useState } from "react";
import CSVUpload from "@/components/CSVUpload";

export default function Home() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const handleParsedData = (parsedHeaders: string[], parsedRows: any[]) => {
    setHeaders(parsedHeaders);
    setRows(parsedRows);
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Viewer</h1>

      <CSVUpload onDataParsed={handleParsedData} />

      {rows.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 font-medium">Parsed {rows.length} rows</p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(rows.slice(0, 2), null, 2)} {/* sample preview */}
          </pre>
        </div>
      )}
    </main>
  );
}
