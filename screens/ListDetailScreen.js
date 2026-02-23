import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import VideoCard from "../components/VideoCard";
import styles from "../styles/homeStyles";
import { getVideosFromList } from "../firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListDetailScreen({ route, navigation }) {
  const { listId, name: listName } = route.params;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const data = await getVideosFromList(listId);
    setVideos(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{listName}</Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onPress={() => navigation.navigate("VideoPlayerScreen", { video: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}
