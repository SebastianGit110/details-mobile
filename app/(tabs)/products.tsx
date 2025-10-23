import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface Producto {
  id_producto: number;
  nombre: string;
  precio_unitario: number;
  stock: number;
}

export default function ProductsScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  // Modal para edición
  const [modalVisible, setModalVisible] = useState(false);
  const [productoEdit, setProductoEdit] = useState<Producto | null>(null);

  const agregarProducto = () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert("Error", "El nombre y el precio son obligatorios");
      return;
    }

    const nuevoProducto: Producto = {
      id_producto: productos.length + 1,
      nombre,
      precio_unitario: parseFloat(precio),
      stock: parseInt(stock) || 0,
    };

    setProductos([...productos, nuevoProducto]);
    setNombre("");
    setPrecio("");
    setStock("");
  };

  const eliminarProducto = (id: number) => {
    Alert.alert("Confirmar", "¿Deseas eliminar este producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setProductos(productos.filter((p) => p.id_producto !== id));
        },
      },
    ]);
  };

  const abrirModalEdicion = (producto: Producto) => {
    setProductoEdit(producto);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setProductoEdit(null);
  };

  const guardarCambios = () => {
    if (!productoEdit) return;

    if (!productoEdit.nombre.trim() || productoEdit.precio_unitario <= 0) {
      Alert.alert("Error", "Nombre y precio deben ser válidos");
      return;
    }

    const nuevos = productos.map((p) =>
      p.id_producto === productoEdit.id_producto ? productoEdit : p
    );
    setProductos(nuevos);
    cerrarModal();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Gestión de Productos
        </ThemedText>
        <ThemedText type="default">
          Agrega y administra tus productos fácilmente
        </ThemedText>
      </View>

      {/* Formulario de creación */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#777"
        />
        <TextInput
          style={styles.input}
          placeholder="Precio unitario"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
          placeholderTextColor="#777"
        />
        <TextInput
          style={styles.input}
          placeholder="Stock disponible"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
          placeholderTextColor="#777"
        />

        <TouchableOpacity style={styles.button} onPress={agregarProducto}>
          <Text style={styles.buttonText}>Agregar Producto</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de productos */}
      <View style={{ marginTop: 24 }}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Lista de Productos
        </ThemedText>

        {productos.length === 0 ? (
          <Text style={styles.emptyText}>No hay productos registrados.</Text>
        ) : (
          <FlatList
            data={productos}
            keyExtractor={(item) => item.id_producto.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <View style={styles.cardHeader}>
                  <IconSymbol name="cube.fill" size={22} color="#007AFF" />
                  <Text style={styles.productName}>{item.nombre}</Text>
                </View>
                <Text style={styles.cardText}>
                  💲 Precio: ${item.precio_unitario.toFixed(2)}
                </Text>
                <Text style={styles.cardText}>📦 Stock: {item.stock}</Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: "#007AFF" },
                    ]}
                    onPress={() => abrirModalEdicion(item)}
                  >
                    <Text style={styles.actionText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: "#FF3B30" },
                    ]}
                    onPress={() => eliminarProducto(item.id_producto)}
                  >
                    <Text style={styles.actionText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Modal de edición */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Producto</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={productoEdit?.nombre || ""}
              onChangeText={(text) =>
                setProductoEdit((prev) =>
                  prev ? { ...prev, nombre: text } : prev
                )
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Precio unitario"
              value={
                productoEdit?.precio_unitario
                  ? productoEdit.precio_unitario.toString()
                  : ""
              }
              onChangeText={(text) =>
                setProductoEdit((prev) =>
                  prev
                    ? { ...prev, precio_unitario: parseFloat(text) || 0 }
                    : prev
                )
              }
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Stock disponible"
              value={productoEdit?.stock ? productoEdit.stock.toString() : ""}
              onChangeText={(text) =>
                setProductoEdit((prev) =>
                  prev ? { ...prev, stock: parseInt(text) || 0 } : prev
                )
              }
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#007AFF" }]}
                onPress={guardarCambios}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#777" }]}
                onPress={cerrarModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F6F8FA",
    flex: 1,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  form: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  productName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  cardText: {
    color: "#555",
    marginTop: 4,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  btn: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
});
