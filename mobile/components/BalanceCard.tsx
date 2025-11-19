import { View, Text } from "react-native";
import { styles } from "@/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }: { summary: { balance: number; income: number; expenses: number } }) => {
  const balance = (summary && typeof summary.balance === 'number') ? summary.balance : 0;
  const income = (summary && typeof summary.income === 'number') ? summary.income : 0;
  const expenses = (summary && typeof summary.expenses === 'number') ? summary.expenses : 0;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${income.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(expenses).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};