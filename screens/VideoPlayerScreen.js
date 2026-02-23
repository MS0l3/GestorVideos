import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/homeStyles";

export default function VideoPlayerScreen({ route }) {
  const { video } = route.params;
  const embedUrl = `https://www.youtube.com/embed/${video.videoId}`;

  return (
    <View style={{ flex: 1, backgroundColor: "#5b3b8c" }}>
      <Text style={styles.title}>{video.title}</Text>
      <WebView source={{ uri: embedUrl }} style={{ flex: 1 }} />
    </View>
  );
}
