// screens/VideoPlayer.js
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { Video } from "expo-av";

export default function VideoPlayer({ route, navigation }) {
  const { video } = route.params;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: video.title }); // poner título en header
  }, []);

  const { width } = Dimensions.get("window");
  const videoHeight = (width * 9) / 16; // proporción 16:9

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}
      <Video
        ref={videoRef}
        source={{ uri: video.url }} // debe tener video.url
        style={{ width: "100%", height: videoHeight }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onReadyForDisplay={() => setLoading(false)}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <Text style={styles.title}>{video.title}</Text>
      {video.createdAt && <Text style={styles.date}>Añadido: {new Date(video.createdAt?.seconds * 1000).toLocaleDateString()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5b3b8c",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -18,
    marginTop: -18,
    zIndex: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  date: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },
});
