import { View, Text, FlatList, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import VideoCard from '../components/VideoCard';
import styles from '../styles/homeStyles';

const DATA = [
  {
    videoId: 'v1',
    title: 'Video 1',
    thumbnail: 'https://i.imgur.com/8RKXAIV.png',
  },
  {
    videoId: 'v2',
    title: 'Video 2',
    thumbnail: 'https://i.imgur.com/8RKXAIV.png',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <Text style={styles.title}>Preferits</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.videoId}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <VideoCard video={item} />}
      />
    </SafeAreaView>
  );
}
