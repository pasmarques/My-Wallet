import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { formatDate } from "../lib/utils";

const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

type TransactionItemProps = {
  item: {
    id: string | number;
    amount: string | number;
    title: string;
    category: keyof typeof CATEGORY_ICONS | string;
    created_at: string | Date;
  };
  onDelete: (id: string | number) => void;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ item, onDelete }) => {
  const isIncome = parseFloat(String(item.amount)) > 0;
  const iconName =
    (CATEGORY_ICONS[(item.category as keyof typeof CATEGORY_ICONS)] || "pricetag-outline") as keyof typeof Ionicons.glyphMap;

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
          >
            {isIncome ? "+" : "-"}${Math.abs(parseFloat(String(item.amount))).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(typeof item.created_at === 'string' ? item.created_at : item.created_at.toISOString())}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};