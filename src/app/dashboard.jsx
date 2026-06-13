import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';
import ProfileScreen from './profile'; // Import ProfileScreen to embed in Account tab

const { width: screenWidth  } = Dimensions.get('window');

// Updated Mock data based on the user's provided images
const newsItems = [
  {
    id: '1',
    title: 'AIDL 2026 - Symposium',
    date: 'March 6-7, 2026',
    description: 'Join us for the AIDL 2026 - Symposium on Accessible and Inclusive Digital Library. AIDL-2026 will provide a platform to discuss on the above themes along with related issues and challenges and probable solutions to overcome risks associated with the future of different types of libraries to make it inclusive for all communities.',
    bgColor: '#4e4ef9', // Styled purple-blue gradient representation
    textColor: '#070707',
    accentColor: '#4A4ED4',
  },
  {
    id: '2',
    title: 'Book Exhibition - 2026',
    date: 'January 23-24, 2026',
    description: 'Explore a wide selection of academic, technical, and popular titles at the Book Exhibition — discover new releases, monographs, and course texts. Meet exhibiting publishers and vendors. Venue: KRC, IIT Hyderabad. Dates : January 23-24,2026.',
    bgColor: '#FF5B7F', // Styled pink-red gradient representation
    textColor: '#FFFFFF',
    accentColor: '#E0486C',
  },
];

const digitalBooks = [
  {
    id: '1',
    title: 'I like the sun',
    author: 'Nelson, Sarah,',
    image: 'https://picsum.photos/seed/qebook1/120/180',
  },
  {
    id: '2',
    title: 'كل المسوفين يكذبون ( سيرة قصصية )',
    author: 'جولادين، سيت',
    image: 'https://picsum.photos/seed/qebook2/120/180',
  },
  {
    id: '3',
    title: 'Earth song',
    author: 'Reed, Susan,',
    image: 'https://picsum.photos/seed/qebook3/120/180',
  },
  {
    id: '4',
    title: 'Changing Affinities',
    author: 'Sarma, Abhishruti',
    image: 'https://picsum.photos/seed/qebook4/120/180',
  },
];

const bestBooks = [
  {
    id: '1',
    title: 'Hair dos and hair don\'ts',
    author: 'O\'Connor, Jane.',
    image: 'https://picsum.photos/seed/qaudio1/120/180',
  },
  {
    id: '2',
    title: 'His dark materials',
    author: 'Pullman, Philip,',
    image: 'https://picsum.photos/seed/qaudio2/120/180',
  },
  {
    id: '3',
    title: 'The republic',
    author: 'Plato,',
    image: 'https://picsum.photos/seed/qaudio3/120/180',
  },
  {
    id: '4',
    title: 'Design your thinking',
    author: 'Soni, Pavan',
    image: 'https://picsum.photos/seed/qaudio4/120/180',
  },
];

const historicalFictionImages = [
  'https://picsum.photos/seed/hist1/60/90',
  'https://picsum.photos/seed/hist2/60/90',
  'https://picsum.photos/seed/hist3/60/90',
  'https://picsum.photos/seed/hist4/60/90',
];

const mentalHealthImages = [
  'https://picsum.photos/seed/ment1/60/90',
  'https://picsum.photos/seed/ment2/60/90',
  'https://picsum.photos/seed/ment3/60/90',
  'https://picsum.photos/seed/ment4/60/90',
];

// Events use the same updated data
const events = [...newsItems];

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);

  const handleNewsScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(contentOffset / (viewSize - 40));
    if (index >= 0 && index < newsItems.length) {
      setActiveNewsIndex(index);
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'menu': return 'Library Menu';
      case 'search': return 'Search Catalog';
      case 'events': return 'Library Events';
      case 'account': return 'My Account';
      default: return '';
    }
  };

  const handleMenuPress = (path) => {
    router.push(path);
  };

  const renderCard = (item, isHorizontal = false) => (
    <View 
      key={item.id} 
      style={[
        isHorizontal ? styles.horizontalEventCard : styles.eventVerticalCard, 
        { backgroundColor: item.bgColor }
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardDateRow}>
          <MaterialIcons name="date-range" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </View>
      <Text 
        style={styles.cardDescription} 
        numberOfLines={isHorizontal ? 4 : undefined}
      >
        {item.description}
      </Text>
      <TouchableOpacity 
        style={styles.learnMoreBtn} 
        onPress={() => Linking.openURL('https://iith.ac.in')}
      >
        <Text style={[styles.learnMoreBtnText, { color: item.accentColor }]}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  // 1. HOME TAB VIEW
  const renderHomeTab = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Search Bar Preview -> switches to search tab */}
      <TouchableOpacity style={styles.searchContainer} onPress={() => setActiveTab('search')} activeOpacity={0.9}>
        <View pointerEvents="none" style={styles.searchInner}>
          <MaterialIcons name="search" size={24} color={Colors.light.textSecondary} style={{ marginRight: 10 }} />
          <Text style={styles.searchText}>Search catalog (OPAC)...</Text>
        </View>
      </TouchableOpacity>

      {/* News Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>News</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>More</Text>
          <MaterialIcons name="arrow-forward" size={16} color={Colors.light.accent} />
        </TouchableOpacity>
      </View>
      
      <View>
        <ScrollView 
          horizontal 
          pagingEnabled
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.newsScroll}
          onScroll={handleNewsScroll}
          scrollEventThrottle={16}
        >
          {newsItems.map((item) => renderCard(item, true))}
        </ScrollView>
        {/* Dot Indicators */}
        <View style={styles.dotContainer}>
          {newsItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeNewsIndex === index ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>
      </View>

      {/* New Arrivals */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity style={styles.moreButton} onPress={() => setActiveTab('search')}>
          <Text style={styles.moreText}>More</Text>
          <MaterialIcons name="arrow-forward" size={16} color={Colors.light.accent} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {digitalBooks.map((item) => (
          <View key={item.id} style={styles.bookCard}>
            <Image source={{ uri: item.image }} style={styles.bookCover} />
            <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Best Books of the Week */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Books of the Week</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>More</Text>
          <MaterialIcons name="arrow-forward" size={16} color={Colors.light.accent} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {bestBooks.map((item) => (
          <View key={item.id} style={styles.bookCard}>
            <Image source={{ uri: item.image }} style={styles.bookCover} />
            <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Featured Collections */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Collections</Text>
      </View>
      <View style={styles.featuredCollectionsRow}>
        <View style={styles.featuredCard}>
          <Text style={styles.featuredCardTitle}>Historical Fiction</Text>
          <View style={styles.featuredGrid}>
            {historicalFictionImages.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.featuredGridImage} />
            ))}
          </View>
        </View>
        <View style={styles.featuredCard}>
          <Text style={styles.featuredCardTitle}>Mental Health</Text>
          <View style={styles.featuredGrid}>
            {mentalHealthImages.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.featuredGridImage} />
            ))}
          </View>
        </View>
      </View>

      {/* Events */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Events</Text>
        <TouchableOpacity style={styles.moreButton} onPress={() => setActiveTab('events')}>
          <Text style={styles.moreText}>More</Text>
          <MaterialIcons name="arrow-forward" size={16} color={Colors.light.accent} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {events.map((item) => renderCard(item, true))}
      </ScrollView>

      {/* Social Media Row */}
      <View style={styles.socialsContainer}>
        <Text style={styles.socialsTitle}>Follow us on</Text>
        <View style={styles.socialsRow}>
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://www.youtube.com/@IITHKRC')}>
            <FontAwesome name="youtube-play" size={20} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://twitter.com')}>
            <FontAwesome name="twitter" size={20} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://www.instagram.com/iithkrc/')}>
            <FontAwesome name="instagram" size={20} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://facebook.com')}>
            <FontAwesome name="facebook" size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mada Certification Seal */}
      <View style={styles.madaContainer}>
        <View style={styles.madaBadge}>
          <View style={styles.madaBadgeInner}>
            <Text style={styles.madaText}>mada</Text>
            <View style={styles.madaCertifiedBlock}>
              <Text style={styles.madaCertifiedText}>Access Certified</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // 2. MENU TAB VIEW
  const renderMenuTab = () => (
    <ScrollView contentContainerStyle={styles.tabContentContainer}>
      <Text style={styles.tabHeading}>Library Services & Access</Text>
      <Text style={styles.tabSubheading}>Quick access to essential library operations and support systems.</Text>
      
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuCard} onPress={() => handleMenuPress('/library-hours')}>
          <View style={styles.menuIconWrap}>
            <MaterialIcons name="access-time" size={32} color={Colors.light.accent} />
          </View>
          <Text style={styles.menuCardTitle}>Library Hours</Text>
          <Text style={styles.menuCardDesc}>View current KRC opening hours & session timings.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={() => handleMenuPress('/library-services')}>
          <View style={styles.menuIconWrap}>
            <MaterialIcons name="menu-book" size={32} color={Colors.light.accent} />
          </View>
          <Text style={styles.menuCardTitle}>Library Services</Text>
          <Text style={styles.menuCardDesc}>Similarity checks, delivery services, and discussion rooms.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={() => handleMenuPress('/off-campus-access')}>
          <View style={styles.menuIconWrap}>
            <MaterialIcons name="vpn-lock" size={32} color={Colors.light.accent} />
          </View>
          <Text style={styles.menuCardTitle}>Off-Campus Access</Text>
          <Text style={styles.menuCardDesc}>Access database and digital journals from home securely.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={() => handleMenuPress('/institutional-resources')}>
          <View style={styles.menuIconWrap}>
            <MaterialIcons name="dns" size={32} color={Colors.light.accent} />
          </View>
          <Text style={styles.menuCardTitle}>Institutional Resources</Text>
          <Text style={styles.menuCardDesc}>Browse local repositories, publications, and papers.</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // 3. SEARCH TAB VIEW
  const renderSearchTab = () => (
    <ScrollView contentContainerStyle={styles.tabContentContainer}>
      <Text style={styles.tabHeading}>Search Catalog</Text>
      <Text style={styles.tabSubheading}>Find physical books, journals, or search research papers using DOI codes.</Text>
      
      <View style={styles.searchPageCard}>
        <View style={styles.searchPageIconWrap}>
          <MaterialIcons name="account-balance" size={48} color={Colors.light.accent} />
        </View>
        <Text style={styles.searchPageCardTitle}>KRC OPAC Search</Text>
        <Text style={styles.searchPageCardDesc}>
          Browse the complete library catalog for printed books, journals, reference items, and multimedia databases available at IITH.
        </Text>
        <TouchableOpacity style={styles.searchPageButton} onPress={() => Linking.openURL('https://opac.krc.iith.ac.in/')}>
          <MaterialIcons name="open-in-new" size={18} color={Colors.light.primary} style={{ marginRight: 8 }} />
          <Text style={styles.searchPageButtonText}>LAUNCH OPAC CATALOG</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchPageCard}>
        <View style={styles.searchPageIconWrap}>
          <MaterialIcons name="science" size={48} color={Colors.light.accent} />
        </View>
        <Text style={styles.searchPageCardTitle}>DOI Document Search</Text>
        <Text style={styles.searchPageCardDesc}>
          Directly resolve digital documents, journals, and preprints using standard DOI codes and download copies instantly.
        </Text>
        <TouchableOpacity style={[styles.searchPageButton, { backgroundColor: Colors.light.accent }]} onPress={() => handleMenuPress('/doi-search')}>
          <MaterialIcons name="manage-search" size={18} color={Colors.light.primary} style={{ marginRight: 8 }} />
          <Text style={styles.searchPageButtonText}>SEARCH BY DOI CODE</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // 4. EVENTS TAB VIEW
  const renderEventsTab = () => (
    <ScrollView contentContainerStyle={styles.tabContentContainer}>
      <Text style={styles.tabHeading}>Library Events</Text>
      <Text style={styles.tabSubheading}>Stay updated with webinars, book fairs, and academic workshops at the library.</Text>
      
      <View style={styles.eventsList}>
        {events.map((item) => renderCard(item, false))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.backgroundStyle} />
      
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {activeTab !== 'home' && (
              <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.light.text} />
              </TouchableOpacity>
            )}
          </View>
          {activeTab === 'home' ? (
            <Image 
              source={require('../../assets/images/download.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          ) : (
            <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
          )}
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={28} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.contentContainer}>
        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'menu' && renderMenuTab()}
        {activeTab === 'search' && renderSearchTab()}
        {activeTab === 'events' && renderEventsTab()}
        {activeTab === 'account' && <ProfileScreen />}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'home' && styles.activeTabButton]} 
          onPress={() => setActiveTab('home')}
        >
          <MaterialIcons 
            name="home" 
            size={24} 
            color={activeTab === 'home' ? Colors.light.accent : Colors.light.textSecondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'menu' && styles.activeTabButton]} 
          onPress={() => setActiveTab('menu')}
        >
          <MaterialIcons 
            name="grid-view" 
            size={24} 
            color={activeTab === 'menu' ? Colors.light.accent : Colors.light.textSecondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'menu' && styles.activeTabLabel]}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'search' && styles.activeTabButton]} 
          onPress={() => setActiveTab('search')}
        >
          <MaterialIcons 
            name="search" 
            size={24} 
            color={activeTab === 'search' ? Colors.light.accent : Colors.light.textSecondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'search' && styles.activeTabLabel]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'events' && styles.activeTabButton]} 
          onPress={() => setActiveTab('events')}
        >
          <MaterialIcons 
            name="event" 
            size={24} 
            color={activeTab === 'events' ? Colors.light.accent : Colors.light.textSecondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'events' && styles.activeTabLabel]}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'account' && styles.activeTabButton]} 
          onPress={() => setActiveTab('account')}
        >
          <MaterialIcons 
            name="person" 
            size={24} 
            color={activeTab === 'account' ? Colors.light.accent : Colors.light.textSecondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'account' && styles.activeTabLabel]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.light.primary 
  },
  backgroundStyle: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: Colors.light.primary 
  },
  headerSafeArea: { 
    backgroundColor: Colors.light.primary,
    zIndex: 10
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    height: 60, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.05)' 
  },
  headerLeft: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButton: { 
    padding: 8 
  },
  logo: { 
    width: 100, 
    height: 40 
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: { 
    paddingTop: 20 
  },
  searchContainer: { 
    backgroundColor: Colors.light.backgroundElement, 
    marginHorizontal: 20, 
    borderRadius: 16, 
    paddingHorizontal: 20, 
    paddingVertical: 14, 
    borderWidth: 1, 
    borderColor: Colors.light.backgroundSelected, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 8, 
    elevation: 4,
    marginBottom: 20,
  },
  searchInner: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  searchText: { 
    color: Colors.light.textSecondary, 
    fontSize: 16 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginTop: 25, 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: Colors.light.text 
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.accent,
  },
  
  // Custom Card Styling matching user upload
  horizontalEventCard: {
    width: screenWidth - 40,
    height: 250,
    marginRight: 15,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  eventVerticalCard: {
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
    justifyContent: 'space-between',
    minHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  learnMoreBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  learnMoreBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  newsScroll: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.light.accent,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: Colors.light.backgroundSelected,
  },

  // Ebooks & Audiobooks styling
  horizontalScroll: { 
    paddingHorizontal: 16 
  },
  bookCard: { 
    width: 130, 
    marginRight: 16, 
    borderRadius: 16, 
    backgroundColor: 'rgba(30, 41, 59, 0.3)', 
    padding: 10,
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.03)',
  },
  bookCover: { 
    width: '100%', 
    height: 160, 
    borderRadius: 12, 
    marginBottom: 8 
  },
  bookTitle: { 
    fontWeight: 'bold', 
    fontSize: 13, 
    color: Colors.light.text, 
    marginBottom: 4,
    height: 36,
    lineHeight: 18,
  },
  bookAuthor: { 
    color: Colors.light.textSecondary, 
    fontStyle: 'italic', 
    fontSize: 11 
  },

  // Featured Collections Grid
  featuredCollectionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 16,
  },
  featuredCard: {
    flex: 1,
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  featuredCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    height: 180,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  featuredGridImage: {
    width: 56,
    height: 84,
    borderRadius: 4,
  },

  // Socials Styling
  socialsContainer: {
    alignItems: 'center',
    marginTop: 35,
    paddingHorizontal: 20,
  },
  socialsTitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: '600',
    marginBottom: 15,
  },
  socialsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.backgroundSelected,
  },

  // Mada Seal CSS
  madaContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  madaBadge: {
    borderWidth: 1.5,
    borderColor: '#0E7490', // Teal certification color
    borderRadius: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: 130,
  },
  madaBadgeInner: {
    alignItems: 'center',
    paddingTop: 8,
  },
  madaText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0E7490',
    fontStyle: 'italic',
    letterSpacing: -1,
    marginBottom: 6,
  },
  madaCertifiedBlock: {
    backgroundColor: '#0E7490',
    width: '100%',
    paddingVertical: 5,
    alignItems: 'center',
  },
  madaCertifiedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Generic tab contents
  tabContentContainer: {
    padding: 24,
    paddingTop: 20,
  },
  tabHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 6,
  },
  tabSubheading: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 25,
  },

  // Menu Grid Layout
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuCard: {
    width: (screenWidth - 64) / 2,
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 180,
  },
  menuIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 160, 23, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  menuCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 6,
  },
  menuCardDesc: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    lineHeight: 16,
  },

  // Search Tab Cards
  searchPageCard: {
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchPageIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(212, 160, 23, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchPageCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  searchPageCardDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  searchPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
  },
  searchPageButtonText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Events List Tab
  eventsList: {
    gap: 20,
  },

  // Bottom Navigation Bar
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 88 : 72,
    backgroundColor: '#0B0F19',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: Colors.light.backgroundSelected,
  },
  tabLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  activeTabLabel: {
    color: Colors.light.accent,
    fontWeight: 'bold',
  },
});
