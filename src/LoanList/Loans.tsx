export interface Loan {
  id: bigint;
  loanStartDate: Date;
  loanEndDate: Date;
  bookReturnDate: Date;
  userID: bigint;
  bookID: bigint;
}

function createLoan(
  id: bigint,
  loanStartDate: Date,
  loanEndDate: Date,
  bookReturnDate: Date,
  userID: bigint,
  bookID: bigint,
) {
  return {
    id,
    loanStartDate: loanStartDate,
    loanEndDate: loanEndDate,
    bookReturnDate: bookReturnDate,
    userID: userID,
    bookID: bookID,
  };
}

export function LoanData(): Loan[] {
  const loans: Loan[] = [
    {
      id: BigInt(1),
      loanStartDate: new Date('2024-01-01'),
      loanEndDate: new Date('2024-02-01'),
      bookReturnDate: new Date('2024-01-28'),
      userID: BigInt(101),
      bookID: BigInt(1),
    },
    {
      id: BigInt(2),
      loanStartDate: new Date('2024-03-01'),
      loanEndDate: new Date('2024-04-01'),
      bookReturnDate: new Date('2024-03-25'),
      userID: BigInt(102),
      bookID: BigInt(2),
    },
    {
      id: BigInt(3),
      loanStartDate: new Date('2024-05-01'),
      loanEndDate: new Date('2024-06-01'),
      bookReturnDate: new Date('2024-05-30'),
      userID: BigInt(103),
      bookID: BigInt(3),
    },
    {
      id: BigInt(4),
      loanStartDate: new Date('2024-07-01'),
      loanEndDate: new Date('2024-08-01'),
      bookReturnDate: new Date('2024-07-29'),
      userID: BigInt(104),
      bookID: BigInt(4),
    },
    {
      id: BigInt(5),
      loanStartDate: new Date('2024-09-01'),
      loanEndDate: new Date('2024-10-01'),
      bookReturnDate: new Date('2024-09-28'),
      userID: BigInt(105),
      bookID: BigInt(5),
    },
    {
      id: BigInt(6),
      loanStartDate: new Date('2024-11-01'),
      loanEndDate: new Date('2024-12-01'),
      bookReturnDate: new Date('2024-11-25'),
      userID: BigInt(106),
      bookID: BigInt(6),
    },
    {
      id: BigInt(7),
      loanStartDate: new Date('2024-01-15'),
      loanEndDate: new Date('2024-02-15'),
      bookReturnDate: new Date('2024-02-10'),
      userID: BigInt(107),
      bookID: BigInt(7),
    },
    {
      id: BigInt(8),
      loanStartDate: new Date('2024-03-15'),
      loanEndDate: new Date('2024-04-15'),
      bookReturnDate: new Date('2024-04-10'),
      userID: BigInt(108),
      bookID: BigInt(8),
    },
    {
      id: BigInt(9),
      loanStartDate: new Date('2024-05-15'),
      loanEndDate: new Date('2024-06-15'),
      bookReturnDate: new Date('2024-06-10'),
      userID: BigInt(109),
      bookID: BigInt(9),
    },
    {
      id: BigInt(10),
      loanStartDate: new Date('2024-07-15'),
      loanEndDate: new Date('2024-08-15'),
      bookReturnDate: new Date('2024-08-10'),
      userID: BigInt(110),
      bookID: BigInt(10),
    },
  ];

  return loans;
}
