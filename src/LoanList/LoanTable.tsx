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
import { useApi } from '../api/ApiProvider';
import { LoanDto } from '../api/dto/loan.dto';
import PageWithNavbar from '../NavbarAfterLogin/PageWithNavbar';

const LoanTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiClient = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.getLoans().then((response) => {
      if (response.success && response.data) {
        const loansData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        const convertedLoans = loansData.map((loan) => ({
          ...loan,
          loanStartDate: loan.loanStartDate
            ? new Date(loan.loanStartDate)
            : undefined,
          loanEndDate: loan.loanEndDate
            ? new Date(loan.loanEndDate)
            : undefined,
          bookReturnDate: loan.bookReturnDate
            ? new Date(loan.bookReturnDate)
            : undefined,
          userLoan: loan.userLoan?.id,
          bookLoan: loan.bookLoan?.id,
        }));
        console.log(convertedLoans);
        setLoans(convertedLoans);
      }
      setLoading(false);
    });
  }, [apiClient]);

  const handleLogout = () => {
    console.log('Log out...');
    navigate('/login');
  };

  const formatTimestamp = (timestamp: Date | undefined): string => {
    if (!timestamp) return ''; // Handle undefined case

    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0'); // +1, bo getMonth() zwraca indeks miesiąca, a nie numer miesiąca
    const day = String(timestamp.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const filteredLoans = loans.filter(
    (loan) =>
      formatTimestamp(loan.loanStartDate).includes(searchTerm) ||
      formatTimestamp(loan.loanEndDate).includes(searchTerm) ||
      formatTimestamp(loan.bookReturnDate).includes(searchTerm) ||
      loan.userLoan?.toString().includes(searchTerm) ||
      loan.bookLoan?.toString().includes(searchTerm),
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
                key={loan.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {formatTimestamp(loan.loanStartDate)}
                </TableCell>
                <TableCell align="right">
                  {formatTimestamp(loan.loanEndDate)}
                </TableCell>
                <TableCell align="right">
                  {formatTimestamp(loan.bookReturnDate)}
                </TableCell>
                <TableCell align="right">{loan.userLoan?.toString()}</TableCell>
                <TableCell align="right">{loan.bookLoan?.id}</TableCell>
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
        Back
      </Button>
    </>
  );
};

export default LoanTable;