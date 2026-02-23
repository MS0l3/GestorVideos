import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/listsStyles";
import { getLists, createList, deleteList } from "../firebase/firestore";
import CreateListModal from "../components/CreateListModal";


export default function ListsScreen({ navigation }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    loadLists();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);


  const loadLists = async () => {
    const data = await getLists();
    setLists(data);
  };

  const handleDeleteList = (list) => {
    Alert.alert(
      "Eliminar lista",
      `¿Seguro que quieres borrar "${list.name}"? También se borrarán sus vídeos.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteList(list.id);
            loadLists();
          },
        },
      ]
    );
  };

  // ✅ Pedir nombre al usuario
  const addNewList = () => {
    Alert.prompt(
      "Nueva lista",
      "Escribe el nombre de la lista:",
      async (text) => {
        if (!text || text.trim() === "") {
          Alert.alert("Error", "El nombre no puede estar vacío");
          return;
        }

        await createList(text.trim());
        loadLists();
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis listas</Text>

      {/* ✅ Botón crear lista */}
      <TouchableOpacity
  style={styles.addButton}
  onPress={() => setModalVisible(true)}
>
  <Text style={styles.addText}>+ Nueva lista</Text>
</TouchableOpacity>


      {/* ✅ Mostrar listas */}
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItemRow}>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate("ListDetail", {
                  listId: item.id,
                  name: item.name,
                })
              }
            >
              <Text style={styles.listName}>{item.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteList(item)}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
      <CreateListModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onCreate={async (name) => {
    await createList(name);
    loadLists();
  }}
/>

    </View>
  );
}
