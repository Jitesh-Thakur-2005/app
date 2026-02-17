import React, { useState, useRef, useMemo } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";




const PlayersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  const from = route.params?.from || "nav_players";

  const [players, setPlayers] = useState([
    { id: 1, name: "John Doe", image: null },
    { id: 2, name: "Alex Smith", image: null },
  ]);

  const [searchText, setSearchText] = useState("");

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "60%"], []);

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const navigatePlayer = (player) => {
    if (from === "nav_players") {
      router.push({
        pathname: "/player-detail",
        params: {
          playerId: player.id,
          playerName: player.name,
        },
      });
    } else {
      router.push({
        pathname: "/quick-test",
        params: {
          playerId: player.id,
          playerName: player.name,
        },
      });
    }
  };

  // const navigatePlayer = (player) => {
  //   if (from === "nav_players") {
  //     navigation.navigate("PlayerDetailScreen", {
  //       playerId: player.id,
  //       playerName: player.name,
  //     });
  //   } else {
  //     navigation.navigate("QuickTest", {
  //       playerId: player.id,
  //       playerName: player.name,
  //     });
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          List of Players ({filteredPlayers.length})
        </Text>

        <TouchableOpacity style={styles.newPlayerBtn} onPress={openSheet}>
          <Text style={styles.newPlayerText}>New Player</Text>
          <Icon name="add" size={14} color="#6A5B26" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1 }}
        />
        <Icon name="search" size={20} color="#aaa" />
      </View>

      {/* Player List */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerItem player={item} onPress={() => navigatePlayer(item)} />
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={openSheet}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={styles.sheetContent}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Add New Player
          </Text>

          <TextInput placeholder="Player Name" style={styles.input} />

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={{ color: "white" }}>Save Player</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};
const PlayerItem = ({ player, onPress }) => {
  return (
    <>
      <TouchableOpacity style={styles.playerRow} onPress={onPress}>
        <Image
          source={
            player.image
              ? { uri: player.image }
              : require("../assets/ic_profile_img.png")
          }
          style={styles.avatar}
        />

        <Text style={styles.playerName}>{player.name}</Text>

        <Icon name="chevron-forward" size={20} />
      </TouchableOpacity>

      <View style={styles.divider} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F2E8",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
  },
  newPlayerBtn: {
    flexDirection: "row",
    backgroundColor: "#E1D5A9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  newPlayerText: {
    fontSize: 12,
    marginRight: 4,
    color: "#6A5B26",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#D4CBAC",
    paddingHorizontal: 10,
    borderRadius: 16,
    height: 50,
    alignItems: "center",
    marginVertical: 16,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  playerName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#D8CFAE",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#B89F4A",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetContent: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: "#B89F4A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});

export default PlayersScreen;
