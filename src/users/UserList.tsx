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
import { useEffect, useState } from 'react';
import { UserDto } from '../api/dto/user.dto';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    apiClient.getUsers().then((response) => {
      if (response.success && response.data) {
        setUsers(
          Array.isArray(response.data) ? response.data : [response.data],
        );
      }
      setLoading(false);
    });
  }, [apiClient]);

  const filteredUsers = users.filter(
    (user) =>
      user.id?.toString().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.eMail?.toString().includes(searchTerm) ||
      user.fullName?.toString().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (userId: number) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      alert(response.data || 'Failed to delete user');
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
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell align="right">{'ID'}</TableCell>
              <TableCell align="right">{t('Role')}</TableCell>
              <TableCell align="right">{t('eMail')}</TableCell>
              <TableCell align="right">{t('Full name')}</TableCell>
              <TableCell align="right" style={{ width: '150px' }}>
                {t('Action')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">{user.eMail}</TableCell>
                <TableCell align="right">{user.fullName} </TableCell>
                <TableCell align="right">
                  {user.id !== undefined && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user.id as number)}
                    >
                      {t('Delete')}
                    </Button>
                  )}
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

export default UserList;
