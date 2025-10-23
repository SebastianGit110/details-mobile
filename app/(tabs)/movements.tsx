import { StyleSheet, FlatList, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Movement = {
  id: number;
  client: string;
  product: string;
  quantity: number;
  total: number;
};

// 🔹 Movimientos predefinidos simulando compras
const movements: Movement[] = [
  {
    id: 1,
    client: "Juan Pérez",
    product: "Café 500g",
    quantity: 2,
    total: 24000,
  },
  {
    id: 2,
    client: "Juan Pérez",
    product: "Azúcar 1kg",
    quantity: 1,
    total: 3500,
  },
  {
    id: 3,
    client: "María López",
    product: "Aceite 1L",
    quantity: 3,
    total: 29400,
  },
  {
    id: 4,
    client: "María López",
    product: "Arroz 5kg",
    quantity: 1,
    total: 18000,
  },
  {
    id: 5,
    client: "Carlos Gómez",
    product: "Sal 500g",
    quantity: 5,
    total: 7500,
  },
];

export default function MovementsScreen() {
  const renderMovement = ({ item }: { item: Movement }) => (
    <ThemedView style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <IconSymbol name="cart.fill" size={24} color="#4A90E2" />
        </View>

        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle" style={{ fontFamily: Fonts.rounded }}>
            {item.client}
          </ThemedText>
          <ThemedText style={styles.detailText}>
            Compró {item.quantity} × {item.product}
          </ThemedText>
        </View>

        <ThemedText type="defaultSemiBold" style={styles.amountText}>
          ${item.total.toLocaleString()}
        </ThemedText>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Movimientos
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Consulta los movimientos de compra de los clientes.
        </ThemedText>
      </View>

      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovement}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  detailText: {
    color: "#6B7280",
    fontSize: 13,
  },
  amountText: {
    color: "#4A90E2",
    fontSize: 15,
  },
});
