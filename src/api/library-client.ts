import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookDto } from './dto/book.dto';
import { LoanDto } from './dto/loan.dto';
import { UserDto } from './dto/user.dto';

type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081',
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/login',
        data,
      );
      this.client.defaults.headers.common['Authorization'] =
        'Bearer ' + response.data.token;

      if (typeof response.data.role === 'string') {
        localStorage.setItem('role', response.data.role);
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public static getLoggedInUserRole(): string | null {
    return localStorage.getItem('role');
  }

  public async getBooks(): Promise<ClientResponse<BookDto | null>> {
    try {
      const response: AxiosResponse<BookDto> =
        await this.client.get('/book/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(data: BookDto): Promise<ClientResponse<BookDto | null>> {
    try {
      const response: AxiosResponse<BookDto> = await this.client.post(
        '/book/add',
        data,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBookById(
    bookId: number,
  ): Promise<ClientResponse<BookDto | null>> {
    try {
      const response: AxiosResponse<BookDto> = await this.client.get(
        `/book/getBook/${bookId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(bookId: number): Promise<ClientResponse<string>> {
    try {
      const response: AxiosResponse<string> = await this.client.delete(
        `/book/delete/${bookId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: axiosError.response?.data.message || 'Failed to delete book',
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<LoanDto | null>> {
    try {
      const response: AxiosResponse<LoanDto> =
        await this.client.get('/loan/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addLoan(
    loanData: LoanDto,
  ): Promise<ClientResponse<LoanDto | null>> {
    try {
      const response: AxiosResponse<LoanDto> = await this.client.post(
        '/loan/add',
        loanData,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addUser(
    userData: UserDto,
  ): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> = await this.client.post(
        '/user/add',
        userData,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUsers(): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> =
        await this.client.get('/user/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(
    userId: number,
  ): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> = await this.client.delete(
        `/user/delete/${userId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
