# CSV Viewer

A simple web application for viewing, searching, sorting, and exporting CSV data. Built with Next.js 15.

## Features

- **Drag & Drop CSV Upload**: Simple file upload interface with drag-and-drop support
- **Interactive Data Table**: View your CSV data in a clean, organized table format
- **Sorting**: Sort any column in ascending or descending order
- **Global Search**: Quickly filter data across all columns
- **Pagination**: Navigate through large datasets with ease
- **Export Options**: Download your data (filtered or complete) as CSV or JSON
- **No Server Required**: All processing happens in the browser

## Technology Stack

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: Frontend UI library
- **TypeScript**: Type-safe JavaScript
- **PapaParse**: CSV parsing library
- **React-Dropzone**: File upload component
- **File-Saver**: Client-side file saving

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/csv-viewer.git
   cd csv-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload a CSV file**: Drag and drop a CSV file onto the upload area or click to select a file
2. **View and analyze data**: Once uploaded, your data will be displayed in a table
3. **Sort data**: Click on any column header to sort by that column
4. **Search**: Use the global search box to filter data across all columns
5. **Navigate**: Use pagination controls to move through large datasets
6. **Export**: Download your data as CSV or JSON using the export buttons

## Deployment

This application can be easily deployed to Vercel, Netlify, or any static hosting service.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
