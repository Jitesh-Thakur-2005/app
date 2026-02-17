import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import a from "../assets/images/logo.png"; 
 import { useRouter } from "expo-router";
 // replace with your logo path
const SplashScreen = ({ backgroundColor = "#FFFFFF" }) => {
  // const navigation = useNavigation();

// const SplashScreen = () => {
  const router = useRouter();


  useEffect(() => {
    const timer = setTimeout(() => {
  router.replace("/login");
}, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      /*<Image
        source={a} 
        // replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />*/
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
