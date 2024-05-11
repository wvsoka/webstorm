import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

class Book extends React.Component<{ book: any }> {
  render() {
    let { book } = this.props;
    return (
      <Card variant="outlined" style={{ marginBottom: '10px' }}>
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {book.author}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const BookList = () => {
  return (
    <List>
      {books.map((book) => (
        <ListItem key={book.id}>
          <ListItemText>
            <Book book={book} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
