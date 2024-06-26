import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import NavbarAfterLogin from '../NavbarAfterLogin/NavbarAfterLogin';
import { useEffect, useState } from 'react';
import { BookDto } from '../api/dto/book.dto';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

const BookTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<BookDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    apiClient.getBooks().then((response) => {
      if (response.success && response.data) {
        setBooks(
          Array.isArray(response.data) ? response.data : [response.data],
        );
      }
      setLoading(false);
    });
  }, [apiClient]);

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publishYear?.toString().includes(searchTerm) ||
      book.isbn?.toString().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TextField
        id="standard-basic"
        label={t('Search')}
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
              <TableCell>{t('Title')}</TableCell>
              <TableCell align="right">{t('Author')}</TableCell>
              <TableCell align="right">{t('Publisher')}</TableCell>
              <TableCell align="right">{t('Year of publication')}</TableCell>
              <TableCell align="right">{t('Available copies')}</TableCell>
              <TableCell align="right">{t('ISBN')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.publisher}</TableCell>
                <TableCell align="right">{book.publishYear}</TableCell>
                <TableCell align="right">{book.availableCopies}</TableCell>
                <TableCell align="right">{book.isbn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        onClick={() => navigate('/home')}
        color="secondary"
      >
        {t('Back')}
      </Button>
    </>
  );
};

export default BookTable;
