import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/profileStyles';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const [photo, setPhoto] = useState(user?.photoURL);

  useEffect(() => {
    if (!user) {
      navigation.replace('AuthChoice');
    }
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      await updateProfile(user, { photoURL: uri });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('AuthChoice');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            photo
              ? { uri: photo }
              : { uri: 'https://i.imgur.com/8RKXAIV.png' } // imagen remota temporal
          }
          style={styles.avatar}
        />
        <Text style={styles.editText}>Editar foto</Text>
      </TouchableOpacity>

      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
