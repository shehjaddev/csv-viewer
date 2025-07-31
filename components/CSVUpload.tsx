'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

type CSVUploadProps = {
  onDataParsed: (headers: string[], rows: any[]) => void;
};

export default function CSVUpload({ onDataParsed }: CSVUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as any[];
        const headers = results.meta.fields || [];
        onDataParsed(headers, parsedData);
      },
      error: (err) => {
        alert('Error parsing file: ' + err.message);
      },
    });
  }, [onDataParsed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer
        ${isDragActive ? 'bg-blue-100 border-blue-400' : 'bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? 'Drop the CSV file here...'
          : 'Drag & drop a CSV file here, or click to select'}
      </p>
    </div>
  );
}
