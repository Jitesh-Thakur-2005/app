import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const SignInScreen = ({ state = {}, onSignInClick }) => {
  useEffect(() => {
    if (state.signInError) {
      Alert.alert("Sign In Error", state.signInError);
    }
  }, [state.signInError]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onSignInClick}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0054F7",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
