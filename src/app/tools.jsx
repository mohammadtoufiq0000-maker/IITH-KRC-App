import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../constants/ThemeContext';

const tools = [
  {
    title: 'Turnitin',
    icon: 'fact-check',
    description: 'Check similarity and plagiarism in your thesis, journals, and assignments.',
    url: 'https://www.turnitin.com',
  },
  {
    title: 'Grammarly',
    icon: 'spellcheck',
    description: 'Improve your academic writing, grammar, vocabulary, and phrasing.',
    url: 'https://www.grammarly.com/',
  },
  {
    title: 'Reference Managers',
    icon: 'bookmark',
    description: 'Manage bibliography, citation library, and organize resources with Mendeley or Zotero.',
    url: 'https://identity.iith.ac.in/',
  },
  {
    title: 'Scientific Tools',
    icon: 'science',
    description: 'Access tools like Matlab, LaTeX, and other scientific computing utilities.',
    url: 'https://identity.iith.ac.in/',
  },
  {
    title: 'Citation Styles',
    icon: 'article',
    description: 'Access guides for formatting citations in IEEE, APA, Harvard, and MLA formats.',
    url: 'https://identity.iith.ac.in/',
  },
];

export default function ToolsScreen() {
  const { theme, activeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, activeTheme, insets);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        if (item.title === 'Turnitin') {
          router.push({ pathname: '/service-detail', params: { title: 'Similarity Checking Service' } });
        } else if (item.title === 'Grammarly') {
          router.push({ pathname: '/service-detail', params: { title: 'Grammarly' } });
        } else {
          router.push({ pathname: '/web-view', params: { url: item.url, title: item.title } });
        }
      }}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={36} color={theme.accent} />
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={3}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Research & Writing Tools</Text>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <FlatList
        data={tools}
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
      minHeight: 180,
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
    },
  });
};
