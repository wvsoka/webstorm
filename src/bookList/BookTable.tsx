import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'; // Dodanie importu TextField dla searchbara
import { BookData, Book } from './Books';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const BookTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState(''); // Stan dla przechowywania wartości wyszukiwania
  const books: Book[] = BookData(); // Pobieranie danych książek

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Wylogowywanie...');
    navigate('/login');
  };

  // Filtracja książek na podstawie wyszukiwanej frazy
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <TextField
        id="standard-basic"
        label="Wyszukaj książkę..."
        variant="standard"
        color="secondary"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="book table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Publisher</TableCell>
              <TableCell align="right">Year of Publication</TableCell>
              <TableCell align="right">Available Copies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow
                key={book.id.toString()}
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
      <Button variant="contained" onClick={handleLogout} color="secondary">
        Wyloguj
      </Button>
    </>
  );
};

export default BookTable;
