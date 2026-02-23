import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function CreateListModal({ visible, onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate(name.trim());
    setName("");
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#6d4fa3",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
            Nueva lista
          </Text>

          <TextInput
            placeholder="Nombre de la lista"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: "#5b3b8c",
              padding: 12,
              borderRadius: 12,
              color: "#fff",
              marginBottom: 15,
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#e6e9ef",
              padding: 12,
              borderRadius: 14,
            }}
            onPress={handleCreate}
          >
            <Text style={{ textAlign: "center", fontWeight: "600" }}>
              Crear
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ textAlign: "center", color: "#ddd" }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
