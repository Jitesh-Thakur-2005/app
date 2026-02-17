import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";

const PlayerDetailScreen = ({ navigation, route }) => {
  const { playerId } = route.params;

  const [player, setPlayer] = useState(null);
  const [records, setRecords] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Male");
  const [height, setHeight] = useState(5.5);
  const [weight, setWeight] = useState(60);
  const [image, setImage] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "85%"], []);

  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = () => {
    setPlayer({
      name: "John Doe",
      age: "12/6/2004",
      height: 5.8,
      weight: 70,
    });

    setRecords([
      {
        id: 1,
        level: 10,
        shuttles: 5,
        cumulativeDistance: 400,
        cumulativeTime: 120,
      },
    ]);
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  // ✅ Expo Image Picker Version
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required to access gallery");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Image pick error:", error);
    }
  };

  const deletePlayer = () => {
    Alert.alert("Delete Player", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" },
    ]);
  };

  if (!player) {
    return <Text style={{ marginTop: 50 }}>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openBottomSheet}>
          <Text style={styles.menu}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/ic_profile_img.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.age}>{player.age}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Stat label="Height" value={`${height} ft`} />
        <Stat label="Weight" value={`${weight} kg`} />
      </View>

      {/* Results */}
      <Text style={styles.resultsTitle}>Results</Text>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ResultCard item={item} />}
      />

      {/* Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <ScrollView style={{ padding: 20 }}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../assets/ic_profile_img.png")
              }
              style={styles.editImage}
            />
          </TouchableOpacity>

          {/* Date Picker */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <Text>{player.age}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              maximumDate={new Date()}
              onChange={() => setShowDatePicker(false)}
            />
          )}

          {/* Height Slider */}
          <Text>Height: {height.toFixed(1)} ft</Text>
          <Slider
            minimumValue={2.5}
            maximumValue={8.5}
            step={0.1}
            value={height}
            onValueChange={setHeight}
          />

          {/* Weight Slider */}
          <Text>Weight: {weight} kg</Text>
          <Slider
            minimumValue={15}
            maximumValue={200}
            step={1}
            value={weight}
            onValueChange={setWeight}
          />

          {/* Gender */}
          <View style={styles.genderRow}>
            <GenderButton
              label="Male"
              selected={selectedGender === "Male"}
              onPress={() => setSelectedGender("Male")}
            />
            <GenderButton
              label="Female"
              selected={selectedGender === "Female"}
              onPress={() => setSelectedGender("Female")}
            />
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={{ color: "white" }}>Save Player</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={deletePlayer}>
            <Text style={{ color: "red", marginTop: 20 }}>
              Delete Player
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const Stat = ({ label, value }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={{ fontSize: 12, color: "#777" }}>{label}</Text>
    <Text style={{ fontSize: 16 }}>{value}</Text>
  </View>
);

const ResultCard = ({ item }) => {
  const avgSpeed =
    item.cumulativeDistance / item.cumulativeTime;

  return (
    <View style={styles.card}>
      <Text>Level {item.level}</Text>
      <Text>Shuttles: {item.shuttles}</Text>
      <Text>Speed: {avgSpeed.toFixed(2)}</Text>
    </View>
  );
};

const GenderButton = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.genderBtn,
      { backgroundColor: selected ? "#DDEEFF" : "#fff" },
    ]}
  >
    <Text>{label}</Text>
  </TouchableOpacity>
);

export default PlayerDetailScreen;
