import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export type Transaction = {
  id: number;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  created_at: string; 
};

export type Summary = {
  balance: number;
  income: number;
  expenses: number;
};

export const useTransactions = (userId: string | null | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await fetch(`${API_URL}/transactions/${userId}`);
      const data: Transaction[] = await res.json();
      setTransactions(data);
    } catch (e: unknown) {
      console.error("Error fetching transactions:", e);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data: Summary = await res.json();
      setSummary({
        balance: typeof data.balance === 'number' ? data.balance : 0,
        income: typeof data.income === 'number' ? data.income : 0,
        expenses: typeof data.expenses === 'number' ? data.expenses : 0,
      });
    } catch (e: unknown) {
      console.error("Error fetching summary:", e);
      setSummary({ balance: 0, income: 0, expenses: 0 });
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (e: unknown) {
      console.error("Error loading data:", e);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete transaction");

      await loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Unknown error occurred";
      console.error("Error deleting transaction:", e);
      Alert.alert("Error", message);
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
