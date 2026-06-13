import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../constants/ThemeContext';

const ONOS_JOURNALS = [
  { name: "AAAS – Science",                  url: "https://www.science.org" },
  { name: "ACM Digital Library",             url: "https://dl.acm.org" },
  { name: "American Chemical Society",       url: "https://pubs.acs.org" },
  { name: "AIAA Journals",                   url: "https://arc.aiaa.org" },
  { name: "American Institute of Physics",   url: "https://aip.scitation.org" },
  { name: "American Mathematical Society",   url: "http://www.ams.org/journals" },
  { name: "American Physical Society",       url: "https://journals.aps.org" },
  { name: "Annual Reviews",                  url: "https://www.annualreviews.org" },
  { name: "ASCE Journals Online",            url: "https://ascelibrary.org" },
  { name: "ASME Journals Online",            url: "https://asmedigitalcollection.asme.org" },
  { name: "Bentham Science Journals",        url: "https://www.eurekaselect.com" },
  { name: "BMJ Journals",                    url: "https://www.bmj.com" },
  { name: "Cambridge University Press",      url: "https://www.cambridge.org/core" },
  { name: "Cold Spring Harbor Press",        url: "https://cshprotocols.cshlp.org" },
  { name: "Elsevier ScienceDirect",          url: "https://www.sciencedirect.com" },
  { name: "Emerald Publishing",              url: "https://www.emerald.com" },
  { name: "ICE Publishing",                  url: "https://www.icevirtuallibrary.com" },
  { name: "IEEE Xplore",                     url: "https://ieeexplore.ieee.org" },
  { name: "IndianJournals.com",              url: "https://www.indianjournals.com" },
  { name: "Institute of Physics (IOP)",      url: "https://iopscience.iop.org" },
  { name: "Oxford University Press",         url: "https://academic.oup.com" },
  { name: "Royal Society of Chemistry",      url: "https://pubs.rsc.org" },
  { name: "SAGE Publishing",                 url: "https://journals.sagepub.com" },
  { name: "SPIE Digital Library",            url: "https://www.spiedigitallibrary.org" },
  { name: "Springer Nature Journals",        url: "https://link.springer.com" },
  { name: "Taylor & Francis",                url: "https://www.tandfonline.com" },
  { name: "Wiley Online Library",            url: "https://onlinelibrary.wiley.com" },
  { name: "World Scientific Publishing",     url: "https://www.worldscientific.com" },
];

const SELF_SUBSCRIBED = [
  { name: "ASTM COMPASS",                     url: "https://compass.astm.org/" },
  { name: "American Concrete Institute (ACI)",url: "https://www.concrete.org/",         tag: "Contact KRC" },
  { name: "Begell House – Atomization",       url: "https://www.dl.begellhouse.com" },
  { name: "Current Science",                  url: "https://www.currentscience.ac.in" },
  { name: "JSTOR",                            url: "https://www.jstor.org" },
  { name: "OPTICA Publishing Group",          url: "https://opg.optica.org" },
  { name: "ProQuest (PQDT) Global",           url: "https://www.proquest.com/pqdtglobal" },
  { name: "SIAM Journals",                    url: "https://epubs.siam.org" },
];

const EBOOKS = [
  { name: "Cambridge Core e-Books",      url: "https://www.cambridge.org/core/" },
  { name: "IET Digital Library",         url: "https://digital-library.theiet.org",                    note: "Coverage: 1979–2016" },
  { name: "McGraw Hill Access Engg.",    url: "https://www.accessengineeringlibrary.com" },
  { name: "McGraw Hill Access Science",  url: "https://www.accessscience.com" },
  { name: "O'Reilly Learning",           url: "https://www.oreilly.com/library-access/" },
  { name: "ProQuest Ebook Central",      url: "https://ebookcentral.proquest.com/lib/iith/home.action" },
  { name: "Springer e-Books",            url: "https://link.springer.com/search" },
];

const BIBLIO_DBS = [
  { name: "MathSciNet",  url: "https://mathscinet.ams.org/mathscinet" },
  { name: "SciFinder-n", url: "https://scifinder.cas.org",              note: "Registration required on-campus" },
  { name: "SCOPUS",      url: "https://www.scopus.com" },
];

const RESEARCH_DATA = [
  { name: "CEIC Data",              url: "https://insights.ceicdata.com/login",    note: "Register with institute email" },
  { name: "CMIE Prowess",           url: "https://prowess.cmie.com/" },
  { name: "CMIE States of India",   url: "https://statesofindia.cmie.com/" },
  { name: "EPWRF India Time Series",url: "http://epwrfits.in/",                    note: "IP access only" },
  { name: "IndiaStat",              url: "https://www.indiastat.com/",             note: "Single user, IP access" },
];

const NEWSPAPERS = [
  { name: "EDZTER (Digital Magazines)",    url: "https://www.edzter.com/" },
  { name: "Economic & Political Weekly",   url: "https://www.epw.in/",                          note: "Current + 5 yrs archive" },
  { name: "Science India Magazine 🆕",     url: "https://scienceindiamag.in/apr-2026-edition-magazine/" },
];

const ACADEMIC_TOOLS = [
  { name: "Grammarly",                   url: "https://www.grammarly.com/",   tag: "Contact KRC" },
  { name: "Overleaf (LaTeX Editor)",     url: "https://www.overleaf.com/",    tag: "Contact KRC" },
  { name: "Turnitin (Plagiarism Check)", url: "https://www.turnitin.com/",    tag: "Contact KRC" },
];

const TRIAL = [
  { name: "LeapSpace (ScienceDirect) 🆕", url: "https://www.sciencedirect.com/leapspace/", note: "Trial ends 16 May 2026" },
  { name: "LENS.ORG 🆕",                  url: "https://www.lens.org",                    note: "Free patent & research DB" },
];

function Tag({ label, theme, styles }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

function LinkRow({ label, url, note, tag, theme, styles }) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={() => router.push({ pathname: '/web-view', params: { url, title: label } })}
      style={styles.linkRow}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Text style={styles.linkLabel}>{label}</Text>
          {tag && <Tag label={tag} theme={theme} styles={styles} />}
        </View>
        {note && <Text style={styles.linkNote}>{note}</Text>}
      </View>
      <MaterialIcons name="open-in-new" size={16} color={theme.accent} style={{ marginTop: 2, marginLeft: 8 }} />
    </TouchableOpacity>
  );
}

function CollapsibleSection({ title, count, isOpen, onPress, children, theme, styles }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPress} 
        style={[
          styles.sectionHeader,
          isOpen ? styles.sectionHeaderOpen : null
        ]}
      >
        <Text style={[styles.sectionTitleText, isOpen ? { color: theme.accent } : null]}>
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {count != null && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
          <MaterialIcons 
            name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            size={20} 
            color={isOpen ? theme.accent : theme.textSecondary} 
          />
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

export default function DatabasesScreen() {
  const { theme, activeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, activeTheme, insets);

  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({
    onos: true,
    subscribed: false,
    ebooks: false,
    biblio: false,
    research: false,
    newspapers: false,
    tools: false,
    trial: false,
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Flatten all items for search
  const allItems = [
    ...ONOS_JOURNALS.map(j => ({ ...j, section: "ONOS E-Journals" })),
    ...SELF_SUBSCRIBED.map(j => ({ ...j, section: "Self-Subscribed" })),
    ...EBOOKS.map(j => ({ ...j, section: "e-Books" })),
    ...BIBLIO_DBS.map(j => ({ ...j, section: "Bibliographic DBs" })),
    ...RESEARCH_DATA.map(j => ({ ...j, section: "Research Databases" })),
    ...NEWSPAPERS.map(j => ({ ...j, section: "Newspapers & Magazines" })),
    ...ACADEMIC_TOOLS.map(j => ({ ...j, section: "Academic Tools" })),
    ...TRIAL.map(j => ({ ...j, section: "Trial Resources" })),
  ];

  const q = search.trim().toLowerCase();
  const results = q ? allItems.filter(i => i.name.toLowerCase().includes(q)) : [];

  const handleIdentityPortalPress = () => {
    router.push({ pathname: '/web-view', params: { url: 'https://identity.iith.ac.in', title: 'Remote Access Portal' } });
  };

  return (
    <View style={styles.container}>
      {/* Search and Identity bar at top */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.ssoLink}
          activeOpacity={0.7}
          onPress={handleIdentityPortalPress}
        >
          <Text style={styles.ssoText}>identity.iith.ac.in (Off-Campus SSO)</Text>
          <MaterialIcons name="open-in-new" size={12} color={theme.accent} />
        </TouchableOpacity>

        {/* Search bar */}
        <View style={styles.searchBarContainer}>
          <MaterialIcons name="search" size={20} color={theme.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search databases, journals, tools…"
            placeholderTextColor={theme.textSecondary}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} style={{ padding: 4 }}>
              <MaterialIcons name="close" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Body */}
      <ScrollView 
        style={styles.body} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search results */}
        {q ? (
          <View>
            <Text style={styles.resultsCount}>
              {`${results.length} result${results.length !== 1 ? 's' : ''} for "${search}"`}
            </Text>
            {results.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <MaterialIcons name="search-off" size={48} color={theme.textSecondary} />
                <Text style={styles.noResultsText}>{`No databases found for "${search}"`}</Text>
              </View>
            ) : (
              results.map((r, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={styles.searchSectionLabel}>{r.section}</Text>
                  <LinkRow label={r.name} url={r.url} note={r.note} tag={r.tag} theme={theme} styles={styles} />
                </View>
              ))
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.introText}>
              IITH is an <Text style={{ fontWeight: 'bold', color: theme.text }}>ONOS member</Text> — 30+ major international publishers accessible 24/7 via AIMS/OpenLDAP credentials.
            </Text>

            <CollapsibleSection 
              title="ONOS E-Journals" 
              count={ONOS_JOURNALS.length} 
              isOpen={openSections.onos} 
              onPress={() => toggleSection('onos')} 
              theme={theme} 
              styles={styles}
            >
              {ONOS_JOURNALS.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Self-Subscribed Resources" 
              count={SELF_SUBSCRIBED.length} 
              isOpen={openSections.subscribed} 
              onPress={() => toggleSection('subscribed')} 
              theme={theme} 
              styles={styles}
            >
              {SELF_SUBSCRIBED.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} tag={j.tag} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Subscribed e-Books" 
              count={EBOOKS.length} 
              isOpen={openSections.ebooks} 
              onPress={() => toggleSection('ebooks')} 
              theme={theme} 
              styles={styles}
            >
              {EBOOKS.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} note={j.note} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Bibliographic Databases" 
              count={BIBLIO_DBS.length} 
              isOpen={openSections.biblio} 
              onPress={() => toggleSection('biblio')} 
              theme={theme} 
              styles={styles}
            >
              {BIBLIO_DBS.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} note={j.note} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Research Databases (Economics / Data)" 
              count={RESEARCH_DATA.length} 
              isOpen={openSections.research} 
              onPress={() => toggleSection('research')} 
              theme={theme} 
              styles={styles}
            >
              {RESEARCH_DATA.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} note={j.note} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Online Newspapers & Magazines" 
              count={NEWSPAPERS.length} 
              isOpen={openSections.newspapers} 
              onPress={() => toggleSection('newspapers')} 
              theme={theme} 
              styles={styles}
            >
              {NEWSPAPERS.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} note={j.note} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Academic Tools" 
              count={ACADEMIC_TOOLS.length} 
              isOpen={openSections.tools} 
              onPress={() => toggleSection('tools')} 
              theme={theme} 
              styles={styles}
            >
              {ACADEMIC_TOOLS.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} tag={j.tag} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            <CollapsibleSection 
              title="Trial Resources 🆕" 
              count={TRIAL.length} 
              isOpen={openSections.trial} 
              onPress={() => toggleSection('trial')} 
              theme={theme} 
              styles={styles}
            >
              {TRIAL.map((j, index) => <LinkRow key={index} label={j.name} url={j.url} note={j.note} theme={theme} styles={styles} />)}
            </CollapsibleSection>

            {/* Off-campus note card */}
            <View style={styles.noteCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 }}>
                <MaterialIcons name="vpn-key" size={18} color={theme.accent} />
                <Text style={styles.noteTitle}>Off-Campus Access</Text>
              </View>
              <Text style={styles.noteText}>
                Use your <Text style={{ fontWeight: 'bold', color: theme.text }}>AIMS (OpenLDAP) username & password</Text> to access all resources 24/7 from outside campus via <Text style={{ color: theme.accent, textDecorationLine: 'underline' }} onPress={handleIdentityPortalPress}>identity.iith.ac.in</Text>. Contact CC for credentials.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme, activeTheme, insets) => {
  const isDark = activeTheme === 'dark';
  return StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: theme.background 
    },
    topBar: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      backgroundColor: theme.primary,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    ssoLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 12,
      alignSelf: 'flex-start',
    },
    ssoText: {
      fontSize: 12,
      color: theme.accent,
      fontWeight: '600',
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundElement,
      borderWidth: 1,
      borderColor: theme.backgroundSelected,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 44,
      marginBottom: 6,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: theme.text,
      height: '100%',
    },
    body: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 40 + (insets?.bottom || 0),
    },
    introText: {
      fontSize: 12,
      color: theme.textSecondary,
      lineHeight: 18,
      marginBottom: 16,
    },
    resultsCount: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 12,
      fontWeight: '500',
    },
    searchSectionLabel: {
      fontSize: 9,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      color: theme.textSecondary,
      marginBottom: 4,
      fontWeight: '600',
    },
    noResultsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    noResultsText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 12,
      textAlign: 'center',
    },
    sectionHeader: {
      width: '100%',
      backgroundColor: isDark ? 'rgba(212, 160, 23, 0.08)' : 'rgba(212, 160, 23, 0.04)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(212, 160, 23, 0.2)' : 'rgba(212, 160, 23, 0.1)',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    sectionHeaderOpen: {
      backgroundColor: isDark ? 'rgba(212, 160, 23, 0.15)' : 'rgba(212, 160, 23, 0.08)',
      borderColor: 'rgba(212, 160, 23, 0.35)',
      marginBottom: 8,
    },
    sectionTitleText: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.text,
    },
    badge: {
      backgroundColor: isDark ? 'rgba(212, 160, 23, 0.2)' : 'rgba(212, 160, 23, 0.1)',
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    badgeText: {
      color: theme.accent,
      fontSize: 10,
      fontWeight: '700',
    },
    sectionContent: {
      paddingLeft: 4,
      marginBottom: 8,
    },
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundElement,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.backgroundSelected,
      padding: 12,
      marginBottom: 6,
    },
    linkLabel: {
      color: theme.text,
      fontSize: 13,
      fontWeight: '500',
    },
    linkNote: {
      color: theme.textSecondary,
      fontSize: 11,
      marginTop: 4,
    },
    tag: {
      fontSize: 9,
      fontWeight: '700',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 8,
      backgroundColor: 'rgba(212, 160, 23, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(212, 160, 23, 0.3)',
    },
    tagText: {
      fontSize: 9,
      fontWeight: '700',
      color: theme.accent,
      textTransform: 'uppercase',
    },
    noteCard: {
      marginTop: 16,
      backgroundColor: isDark ? 'rgba(212, 160, 23, 0.05)' : 'rgba(212, 160, 23, 0.03)',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'rgba(212, 160, 23, 0.22)',
      padding: 14,
    },
    noteTitle: {
      color: theme.accent,
      fontSize: 12,
      fontWeight: '700',
    },
    noteText: {
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 16,
    },
  });
};
