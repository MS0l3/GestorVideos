import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/homeStyles";
import { extractYouTubeID } from "../firebase/firestore";

export default function VideoPlayerScreen({ route }) {
  const { video } = route.params;
  const normalizedIdFromField = String(video?.videoId || "").match(/[\w-]{11}/)?.[0] || "";
  const videoId = normalizedIdFromField || extractYouTubeID(video?.url);

  if (!videoId) {
    return (
      <View style={{ flex: 1, backgroundColor: "#5b3b8c", justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={styles.title}>No se puede reproducir este vídeo</Text>
      </View>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={{ flex: 1, backgroundColor: "#5b3b8c" }}>
      <Text style={styles.title}>{video?.title || "Vídeo"}</Text>
      <WebView source={{ uri: embedUrl }} style={{ flex: 1 }} />
    </View>
  );
}
