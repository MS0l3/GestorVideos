import { useEffect, useState } from "react";
import { Text, FlatList, SafeAreaView, View, TouchableOpacity, Ionicons } from "react-native";
import VideoCard from "../components/VideoCard";
import styles from "../styles/homeStyles";
import { getFavorites, removeFavoriteByVideoId } from "../firebase/firestore";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleRemove = async (videoId) => {
    await removeFavoriteByVideoId(videoId);
    loadFavorites();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={styles.title}>Favoritos</Text>

        <TouchableOpacity onPress={() => navigation.navigate("AddVideo")}>
          <Ionicons name="add-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            forceFavorite={true}
            navigation={navigation}
            onRemoveFavorite={() => handleRemove(item.videoId)}
          />
        )}
      />
    </SafeAreaView>
  );
}