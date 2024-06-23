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
import { useTranslation } from 'react-i18next';

const LoanTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
          userLoan: loan.userLoan,
          bookLoan: loan.bookLoan,
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
    if (!timestamp) return '';

    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
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

  const handleDelete = async (loanId: number) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      setLoans(loans.filter((loan) => loan.id !== loanId));
    } else {
      alert(response.data || 'Failed to delete loan');
    }
  };

  const handleEditReturnDate = async (loanId: number) => {
    const newDate = prompt('Enter the new return date (YYYY-MM-DD):');
    if (!newDate) return;
    const formattedDate = formatTimestamp(new Date(newDate));
    const response = await apiClient.updateBookReturnDate(
      loanId,
      formattedDate,
    );
    if (response.success) {
      setLoans(
        loans.map((loan) =>
          loan.id === loanId
            ? { ...loan, bookReturnDate: new Date(newDate) }
            : loan,
        ),
      );
    } else {
      alert(response.data || 'Failed to update return date');
    }
  };

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
        <Table sx={{ minWidth: 650 }} aria-label="loan table">
          <TableHead>
            <TableRow>
              <TableCell>{t('Loan Start Date')}</TableCell>
              <TableCell align="right">{t('Loan End Date')}</TableCell>
              <TableCell align="right">{t('Book Return Date')}</TableCell>
              <TableCell align="right">{t('User ID')}</TableCell>
              <TableCell align="right">{t('Book ID')}</TableCell>
              <TableCell align="right" style={{ width: '150px' }}>
                {t('Action')}
              </TableCell>
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
                <TableCell align="right">{loan.bookLoan?.toString()}</TableCell>
                <TableCell align="right">
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(loan.id as number)}
                    >
                      {t('Delete')}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditReturnDate(loan.id as number)}
                    >
                      {t('Return Date')}
                    </Button>
                  </div>
                </TableCell>
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

export default LoanTable;
