export interface Book {
  id: bigint;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearOfPublish: number;
  availableCopies: number;
}

function createBook(
  id: bigint,
  isbn: string,
  title: string,
  author: string,
  publisher: string,
  yearOfPublish: number,
  availableCopies: number,
) {
  return { id, isbn, title, author, publisher, yearOfPublish, availableCopies };
}

export function BookData(): Book[] {
  const books: Book[] = [
    {
      id: BigInt(1),
      isbn: '978-3-16-148410-0',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: 'J.B. Lippincott & Co.',
      yearOfPublish: 1960,
      availableCopies: 50,
    },
    {
      id: BigInt(2),
      isbn: '978-0-330-25864-5',
      title: '1984',
      author: 'George Orwell',
      publisher: 'Secker & Warburg',
      yearOfPublish: 1949,
      availableCopies: 30,
    },
    {
      id: BigInt(3),
      isbn: '978-1-56619-909-4',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publisher: "Charles Scribner's Sons",
      yearOfPublish: 1925,
      availableCopies: 20,
    },
    {
      id: BigInt(4),
      isbn: '978-0-385-14663-6',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publisher: 'Little, Brown and Company',
      yearOfPublish: 1951,
      availableCopies: 40,
    },
    {
      id: BigInt(5),
      isbn: '978-0-14-243724-4',
      title: 'Moby-Dick',
      author: 'Herman Melville',
      publisher: 'Richard Bentley',
      yearOfPublish: 1851,
      availableCopies: 15,
    },
    {
      id: BigInt(6),
      isbn: '978-0-15-662870-9',
      title: 'To the Lighthouse',
      author: 'Virginia Woolf',
      publisher: 'The Hogarth Press',
      yearOfPublish: 1927,
      availableCopies: 25,
    },
    {
      id: BigInt(7),
      isbn: '978-0-8129-7047-2',
      title: 'The Grapes of Wrath',
      author: 'John Steinbeck',
      publisher: 'The Viking Press',
      yearOfPublish: 1939,
      availableCopies: 35,
    },
    {
      id: BigInt(8),
      isbn: '978-1-57049-703-6',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publisher: 'T. Egerton, Whitehall',
      yearOfPublish: 1813,
      availableCopies: 45,
    },
    {
      id: BigInt(9),
      isbn: '978-1-85326-120-9',
      title: 'Animal Farm',
      author: 'George Orwell',
      publisher: 'Secker & Warburg',
      yearOfPublish: 1945,
      availableCopies: 55,
    },
    {
      id: BigInt(10),
      isbn: '978-0-385-52634-3',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      publisher: 'Chatto & Windus',
      yearOfPublish: 1932,
      availableCopies: 60,
    },
  ];

  return books;
}
