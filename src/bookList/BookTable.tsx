import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BookData, Book } from './Books'; // Poprawienie ścieżki importu

const BookTable: React.FC = () => {
  const books: Book[] = BookData(); // Pobieranie danych książek

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="book table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell> {/* Zmiana etykiet kolumn */}
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Publisher</TableCell>
            <TableCell align="right">Year of Publication</TableCell>
            <TableCell align="right">Available Copies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.id.toString()} // Ustawienie unikalnego klucza na podstawie ID książki
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.title}
              </TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.publisher}</TableCell>
              <TableCell align="right">{book.yearOfPublish}</TableCell>
              <TableCell align="right">{book.availableCopies}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
