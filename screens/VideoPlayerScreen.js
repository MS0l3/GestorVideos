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

  const playbackUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <View style={{ flex: 1, backgroundColor: "#5b3b8c" }}>
      <Text style={styles.title}>{video?.title || "Vídeo"}</Text>
      <WebView
        source={{ uri: playbackUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}
