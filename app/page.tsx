"use client";

import CSVUpload from "@/components/CSVUpload";
import DataTable from "@/components/DataTable";
import { useState } from "react";

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

      {rows.length > 0 && <DataTable headers={headers} rows={rows} />}
    </main>
  );
}
