import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { LoanData, Loan } from './Loans';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import NavbarAfterLogin from '../NavbarAfterLogin/NavbarAfterLogin';

const LoanTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState(''); // Stan dla przechowywania wartości wyszukiwania
  const loans: Loan[] = LoanData();

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Log out...');
    navigate('/login');
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.loanStartDate.toDateString().includes(searchTerm) ||
      loan.loanEndDate.toDateString().includes(searchTerm) ||
      loan.bookReturnDate.toDateString().includes(searchTerm) ||
      loan.userID.toString().includes(searchTerm) ||
      loan.bookID.toString().includes(searchTerm),
  );

  return (
    <>
      <NavbarAfterLogin />
      <TextField
        id="standard-basic"
        label="Search..."
        variant="standard"
        color="secondary"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="loan table">
          <TableHead>
            <TableRow>
              <TableCell>Loan Start Date</TableCell>
              <TableCell align="right">Loan End Date</TableCell>
              <TableCell align="right">Book Return Date</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Book ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLoans.map((loan) => (
              <TableRow
                key={loan.id.toString()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {loan.loanStartDate.toDateString()}
                </TableCell>
                <TableCell align="right">
                  {loan.loanEndDate.toDateString()}
                </TableCell>
                <TableCell align="right">
                  {loan.bookReturnDate.toDateString()}
                </TableCell>
                <TableCell align="right">{loan.userID.toString()}</TableCell>
                <TableCell align="right">{loan.bookID.toString()}</TableCell>
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

export default LoanTable;
