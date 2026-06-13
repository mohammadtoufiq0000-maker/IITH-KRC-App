import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/ThemeContext';

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightElement,
  titleStyle,
  subtitleStyle,
  headerStyle,
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBack = onBack ?? (() => router.back());
  const hasBack = onBack !== null;

  return (
    <View style={[styles.headerSafeArea, { backgroundColor: theme.primary, paddingTop: insets.top || 0 }]}> 
      <View style={[styles.header, { backgroundColor: theme.primary }, headerStyle]}>
        {hasBack ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={[styles.headerTitle, { color: theme.text }, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }, subtitleStyle]} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {rightElement ? <View style={styles.rightContainer}>{rightElement}</View> : <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSafeArea: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 44,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightContainer: {
    minWidth: 44,
    alignItems: 'flex-end',
  },
});
