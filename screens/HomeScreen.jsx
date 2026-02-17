import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from "expo-router";



import ia from '../assets/ic_profile_img.png';
import ib from '../assets/ic_profile_img.png';
// import { LinearGradient } from 'expo-linear-gradientr';

const { width, height } = Dimensions.get('window');

// Colors
const COLORS = {
  splashColor: '#6C63FF',
  appBackground: '#FFFFFF',
  bottomNavBar: '#1C1C1C',
  cardBackground: '#EFE9D3',
  white: '#FFFFFF',
  black: '#1C1C1C',
  gray: '#4F4F4F',
  lightGray: '#EAEAEA',
  red: '#FF0000',
  blue: '#0066CC',
};

// Home Screen Component
export default function HomeScreen({ navigation, userData }) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('home');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState(1);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (showBottomSheet) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showBottomSheet]);

  const openBottomSheet = () => setShowBottomSheet(true);
  const closeBottomSheet = () => setShowBottomSheet(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerText}>
                Hello{userData?.username ? `, ${userData.username}` : ''}
              </Text>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}> */}
            <TouchableOpacity onPress={() => router.replace("/profile")}>
              <Image
                source={
                  userData?.profilePictureUrl
                    ? { uri: userData.profilePictureUrl }
                    : ia
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Section */}
        <View style={styles.resultsSection}>
          <View style={styles.dragHandle} />

          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Results</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortText}>Sort</Text>
              <Text style={styles.sortIcon}>⇅</Text>
            </TouchableOpacity>
          </View>

          {/* Switch */}
          <TextSwitch
            selectedIndex={selectedSwitch}
            items={['Group', 'Solo']}
            onSelectionChange={setSelectedSwitch}
          />

          {/* Results List */}
          <FlatList
            data={selectedSwitch === 0 ? getGroupResultList() : getSoloResultList()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ResultItem {...item} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          // onPress={() => navigation.navigate('PlayerScreen', { from: 'nav_players' })}
          onPress={() =>
            router.push({
              pathname: "/player-screen",
              params: { from: "nav_players" },
            })
          }

        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Players</Text>
        </TouchableOpacity>

        <View style={styles.navItem} />

        <TouchableOpacity style={styles.fabButton} onPress={openBottomSheet}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      <CustomBottomSheet
        visible={showBottomSheet}
        onClose={closeBottomSheet}
        navigation={navigation}
        slideAnim={slideAnim}
      />
    </SafeAreaView>
  );
}

// Custom Bottom Sheet Component
function CustomBottomSheet({ visible, onClose, navigation, slideAnim }) {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sheetHandle} />

          <TouchableOpacity
            style={styles.sheetItem}
            onPress={() => {
              router.push({
                pathname: "/player-screen",
                params: { from: "from_solo" },
              });
              onClose();
            }}

          // onPress={() => {
          //   navigation.navigate('PlayerScreen', { from: 'from_solo' });
          //   onClose();
          // }}
          >
            <Text style={styles.sheetItemText}>Solo Test</Text>
          </TouchableOpacity>

          <View style={styles.sheetDivider} />

          <TouchableOpacity
            style={styles.sheetItem}
            onPress={() => {
              router.push({
                pathname: "/quick-test",
                params: {
                  heading: "Quick Test",
                  playerId: -1,
                  playerName: "a",
                },
              });
              onClose();
            }}

          // onPress={() => {
          //   navigation.navigate('QuickTest', {
          //     heading: 'Quick Test',
          //     playerId: -1,
          //     playerName: 'a',
          //   });
          //   onClose();
          // }}
          >
            <Text style={styles.sheetItemText}>Quick Test (No Record)</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

// Text Switch Component
function TextSwitch({ selectedIndex, items, onSelectionChange }) {
  const switchAnim = useRef(new Animated.Value(selectedIndex)).current;

  useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: selectedIndex,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [selectedIndex]);

  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (width - 48) / 2],
  });

  return (
    <View style={styles.switchContainer}>
      <Animated.View
        style={[
          styles.switchIndicator,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.switchItem}
          onPress={() => onSelectionChange(index)}
        >
          <Text
            style={[
              styles.switchText,
              selectedIndex === index && styles.switchTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Result Item Component
function ResultItem({ testName, date, time, groupName, count }) {
  return (
    <View style={styles.resultCard}>
      <View style={styles.resultLeft}>
        <Text style={styles.resultTitle}>{testName}</Text>
        <View style={styles.resultTags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{date}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.resultRight}>
        <Text style={styles.arrowIcon}>→</Text>
        <View style={styles.resultTags}>
          <View style={[styles.tag, styles.tagPurple]}>
            <Text style={styles.tagTextPurple}>{groupName}</Text>
          </View>
          <View style={[styles.tag, styles.tagBlue]}>
            <Text style={styles.tagTextBlue}>{count}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Quick Test Screen Component
export function QuickTestScreen({ route, navigation }) {
  const { heading, playerId, playerName } = route.params;

  const [timeLeft, setTimeLeft] = useState(14039);
  const [initialTime] = useState(14039);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [shuttleCount, setShuttleCount] = useState(0);
  const [cumulativeDistance, setCumulativeDistance] = useState(0);
  const [speed, setSpeed] = useState(10.0);
  const [level, setLevel] = useState(1);
  const [levelToSave, setLevelToSave] = useState(1);
  const [buttonText, setButtonText] = useState('Start');
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(10000);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cumulativeTime, setCumulativeTime] = useState(0);

  const cumulativeDistanceMap = {
    1: 40, 2: 80, 3: 120, 4: 200, 5: 240,
    6: 320, 7: 440, 8: 560, 9: 680, 10: 800,
    11: 960, 12: 1080, 13: 1240, 14: 1440, 15: 1680,
    16: 1960, 17: 2280, 18: 2520, 19: 2680, 20: 2880,
    21: 3120, 22: 3320, 23: 3640, 24: 2880, 25: 3120,
  };

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const handleButtonPress = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      setIsCompleted(true);
      setButtonText('Play Again');
      // Save record logic here
    } else if (isCompleted) {
      // Reset
      setTimeLeft(14039);
      setShuttleCount(0);
      setLevel(1);
      setCumulativeDistance(0);
      setIsCompleted(false);
      setIsTimerRunning(true);
      setButtonText('End & View Results');
    } else {
      setIsTimerRunning(true);
      setButtonText('End & View Results');
    }
  };

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const milliseconds = Math.floor((timeLeft % 1000) / 100);

  return (
    <SafeAreaView style={styles.testContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{heading}</Text>
          <View style={styles.backButton} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.testContent}>
        {/* Player Info */}
        {heading === 'Solo Test' && (
          <View style={styles.playerInfo}>
            <Image
              source={ib}
              style={styles.playerImage}
            />
            <Text style={styles.playerName}>{playerName}</Text>
          </View>
        )}

        {/* Timer Display */}
        {!isCompleted && (
          <>
            <Text style={styles.timerText}>
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}:
              {milliseconds}
            </Text>

            {isResting && (
              <Text style={styles.restText}>
                Rest: {Math.floor(restTimeLeft / 1000)}
              </Text>
            )}

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((initialTime - timeLeft) / initialTime) * 100}%` },
                ]}
              />
            </View>

            {/* Stats Card */}
            <View style={styles.statsCard}>
              <StatItem label="Level" value={level.toString()} />
              <View style={styles.verticalDivider} />
              <StatItem label="Shuttle" value={shuttleCount.toString()} />
              <View style={styles.verticalDivider} />
              <StatItem label="Distance" value={`${shuttleCount * 20} m`} />
              <View style={styles.verticalDivider} />
              <StatItem label="Speed(km/hr)" value={speed.toFixed(1)} />
            </View>

            <Text style={styles.cumulativeText}>
              Cumulative Distance: {cumulativeDistance} m
            </Text>
          </>
        )}

        {/* Completed State */}
        {isCompleted && (
          <>
            <View style={styles.levelButtons}>
              <TouchableOpacity style={styles.levelButton}>
                <Text style={styles.levelButtonText}>
                  L {Object.entries(cumulativeDistanceMap).find(
                    ([k, v]) => v >= cumulativeDistance
                  )?.[0] || 1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.levelButton}>
                <Text style={styles.levelButtonText}>
                  Shuttles {Math.floor(cumulativeDistance / 20)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsCard}>
              <StatItem label="Cum Dist (m)" value={cumulativeDistance.toString()} />
              <View style={styles.verticalDivider} />
              <StatItem label="Cum Time (Sec)" value={cumulativeTime.toFixed(2)} />
              <View style={styles.verticalDivider} />
              <StatItem label="Shuttle Time (Sec)" value={(20 / (cumulativeDistance / cumulativeTime)).toFixed(2)} />
              <View style={styles.verticalDivider} />
              <StatItem label="Speed (km/h)" value={(cumulativeDistance / cumulativeTime).toFixed(2)} />
            </View>
          </>
        )}
      </ScrollView>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          buttonText === 'End & View Results' && styles.actionButtonRed,
        ]}
        onPress={handleButtonPress}
      >
        <Text style={styles.actionButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Stat Item Component
function StatItem({ label, value }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

// Data Functions
function getGroupResultList() {
  return [];
}

function getSoloResultList() {
  return [
    {
      testName: 'Evening Test',
      date: '13 Jun 2024',
      time: '10:25 pm',
      groupName: 'Rajeev',
      count: 12,
    },
    {
      testName: 'Afternoon Test',
      date: '13 Jun 2024',
      time: '2:33 pm',
      groupName: 'Rajeev',
      count: 12,
    },
    {
      testName: 'Morning Test',
      date: '13 Jun 2024',
      time: '6:30 am',
      groupName: 'Rajeev',
      count: 12,
    },
  ];
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.splashColor,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 120,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.white,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  resultsSection: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10,
    padding: 16,
  },
  dragHandle: {
    width: 53,
    height: 3,
    backgroundColor: COLORS.black,
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 8,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: '400',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    marginRight: 4,
  },
  sortIcon: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6DEBF',
    borderRadius: 8,
    padding: 5,
    marginVertical: 8,
    position: 'relative',
  },
  switchIndicator: {
    position: 'absolute',
    left: 5,
    top: 5,
    bottom: 5,
    width: (width - 48) / 2,
    backgroundColor: '#F7F3E4',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  switchItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#261F00',
  },
  switchTextSelected: {
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultLeft: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12,
  },
  resultTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 10,
    color: COLORS.gray,
  },
  tagPurple: {
    backgroundColor: '#D5D5FF',
  },
  tagTextPurple: {
    fontSize: 10,
    color: '#2C2C7E',
  },
  tagBlue: {
    backgroundColor: '#D5E8FF',
  },
  tagTextBlue: {
    fontSize: 10,
    color: COLORS.black,
  },
  resultRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  arrowIcon: {
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.bottomNavBar,
    height: 85,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: COLORS.white,
  },
  fabButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.splashColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetItem: {
    paddingVertical: 16,
  },
  sheetItemText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  sheetDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  testContainer: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  testContent: {
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.27)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  playerInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  playerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  playerName: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 8,
    color: '#3D3D3D',
  },
  timerText: {
    fontSize: 44,
    fontWeight: '400',
    marginVertical: 20,
  },
  restText: {
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.red,
    marginBottom: 10,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.splashColor,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  cumulativeText: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 16,
  },
  levelButtons: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 16,
  },
  levelButton: {
    backgroundColor: '#E3D7FF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  levelButtonText: {
    fontSize: 16,
    color: '#5A4FCF',
  },
  actionButton: {
    backgroundColor: COLORS.blue,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonRed: {
    backgroundColor: COLORS.red,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
});