import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../constants/ThemeContext';

const bookingFacilities = [
  {
    title: 'Group Discussion Rooms',
    icon: 'groups',
    description: '11 Rooms with 4 to 14 seating capacity. Ideal for study groups and collaborative projects.',
    url: 'https://rb.krc.iith.ac.in/',
  },
  {
    title: 'Virtual Classroom',
    icon: 'personal-video',
    description: 'Ground Floor, 81 seating capacity. Equipped with high-definition audio/video systems.',
    url: 'https://rb.krc.iith.ac.in/',
  },
  {
    title: 'Seminar Room',
    icon: 'co-present',
    description: 'Ground Floor, 56 seating capacity. Perfect for academic seminars and expert lectures.',
    url: 'https://rb.krc.iith.ac.in/',
  },
  {
    title: 'Video Conference Room',
    icon: 'video-call',
    description: 'First Floor, 35 seating capacity. Faculty discussion room and virtual board room.',
    url: 'https://rb.krc.iith.ac.in/',
  },
];

export default function BookingsScreen() {
  const { theme, activeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, activeTheme, insets);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        router.push({ pathname: '/web-view', params: { url: item.url, title: item.title } });
      }}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={36} color={theme.accent} />
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={4}>{item.description}</Text>
      <View style={{ flex: 1 }} />
      <View style={styles.bookNowButton}>
        <Text style={styles.bookNowText}>Book Online</Text>
        <MaterialIcons name="open-in-new" size={14} color={theme.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Room & Hall Bookings</Text>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <FlatList
        data={bookingFacilities}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        style={styles.list}
      />
    </View>
  );
}

const createStyles = (theme, activeTheme, insets) => {
  const isDark = activeTheme === 'dark';
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    headerSafeArea: { 
      backgroundColor: theme.primary, 
      paddingTop: insets?.top || 0,
      borderBottomWidth: 2, 
      borderBottomColor: theme.accent 
    },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60 },
    backButton: { padding: 8 },
    headerTitle: { color: theme.text, fontSize: 18, fontWeight: 'bold' },
    list: { flex: 1, backgroundColor: theme.background },
    listContainer: { padding: 12 },
    card: {
      flex: 1,
      backgroundColor: theme.backgroundElement,
      padding: 16,
      borderRadius: 16,
      margin: 8,
      alignItems: 'center',
      minHeight: 220,
      maxWidth: '46%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.05,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: isDark ? 1 : 0,
      borderColor: theme.backgroundSelected,
    },
    iconContainer: {
      backgroundColor: isDark ? 'rgba(212, 160, 23, 0.1)' : 'rgba(212, 160, 23, 0.08)',
      padding: 14,
      borderRadius: 50,
      marginBottom: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 15,
      color: theme.text,
      textAlign: 'center',
      marginBottom: 6,
    },
    cardDesc: {
      fontSize: 11,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 15,
      marginBottom: 12,
    },
    bookNowButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: theme.accent,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginTop: 8,
    },
    bookNowText: {
      color: theme.primary,
      fontSize: 11,
      fontWeight: 'bold',
    },
  });
};
