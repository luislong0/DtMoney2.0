import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSummary } from "../hooks/useSummary";
import { api } from "../lib/axios";
import { auth } from "../services/firebase";
import { AuthContext } from "./AuthContext";

interface userProps {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface Transaction {
  id: string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({
  children,
}: TransactionsProviderProps) {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    if (query) {
      const transactionsResponse: any = await api.get(
        `/transactions/${user.id}?q=${query}`
      );

      setTransactions(transactionsResponse.data);
    } else {
      const transactionsResponse: any = await api.get(
        `/transactions/${user.id}`
      );

      setTransactions(transactionsResponse.data);
    }
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    const response = await api.post(`/transactions/${user.id}`, {
      description,
      price,
      category,
      type,
    });

    // setTransactions((state) => [response.data, ...state]);
    fetchTransactions();
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
