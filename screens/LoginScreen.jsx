import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "YOUR_WEB_CLIENT_ID_FROM_FIREBASE",
    });

    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const user = await GoogleSignin.getCurrentUser();
    if (user) {
      navigation.replace("/home");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);

      navigation.replace("/home");
    } catch (error) {
      console.log("Sign In Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Content */}
      <View style={styles.topContainer}>
        <Image
          source={require("../assets/ic_login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Test your endurance with the Yo-Yo and Beep Test app—track VO2 max and
          fitness levels easily.
        </Text>
      </View>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        >
          <Image
            source={require("../assets/ic_google_logo.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.buttonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  topContainer: {
    alignItems: "center",
    marginTop: 120,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  description: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  bottomCard: {
    backgroundColor: "#EFE9D3",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  googleButton: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
