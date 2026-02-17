import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
// import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../ui/theme/Color";

const ProfileScreen = ({ route }) => {
  
  const router = useRouter();

  // If you're passing params through navigation
  const userData = route?.params?.userData;
  const onSignOut = route?.params?.onSignOut;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {userData?.profilePictureUrl && (
          <Image
            source={{ uri: userData.profilePictureUrl }}
            style={styles.profileImage}
          />
        )}

        {userData?.username && (
          <Text style={styles.username}>{userData.username}</Text>
        )}

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => onSignOut?.()}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AppBackgroundColor,
  },

  header: {
    height: 120,
    backgroundColor: Colors.SplashColor,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    color: "white",
    fontSize: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },

  username: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 16,
  },

  signOutButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
