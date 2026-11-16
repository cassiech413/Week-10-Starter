import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, RadioButton, Searchbar, Text, TextInput, Checkbox, MD3LightTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { components, type ComponentId } from '../data/components';

function Preview({ id }: { id: ComponentId }) {
  if (id === 'radio-button') return <View style={styles.previewRow}><Text>Normal</Text><RadioButton value="normal" status="checked" /></View>;
  if (id === 'checkbox') return <View style={styles.previewRow}><Text>Checked</Text><Checkbox status="checked" /></View>;
  if (id === 'text-input' || id === 'validation' || id === 'helper-text') return <TextInput mode="outlined" label={id === 'validation' ? 'Email address' : 'Your name'} value="" editable={false} style={styles.previewInput} />;
  if (id === 'search-bar') return <Searchbar placeholder="Search components" value="" editable={false} style={styles.previewSearch} />;
  return <View style={styles.previewRow}><Text>Choose an option</Text><Text variant="titleMedium">⌄</Text></View>;
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => components.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase())), [query]);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={<View style={styles.header}><Text variant="headlineSmall" style={styles.heading}>React Native Paper Showcase</Text><Text style={styles.subtitle}>Explore the components and try their states.</Text><Searchbar placeholder="Search components" value={query} onChangeText={setQuery} style={styles.search} accessibilityLabel="Search components" /></View>}
        ListEmptyComponent={<Text style={styles.empty}>No components found.</Text>}
        renderItem={({ item }) => <Card style={styles.card} onPress={() => router.push({ pathname: '/component/[id]', params: { id: item.id } })} accessibilityLabel={`Open ${item.title} example`}><Card.Content><Preview id={item.id} /><Text variant="titleMedium" style={styles.cardTitle}>{item.title}</Text><Text variant="bodySmall" style={styles.description}>{item.description}</Text></Card.Content></Card>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: MD3LightTheme.colors.background },
  list: { paddingHorizontal: 20, paddingBottom: 32 },
  header: { paddingTop: 20, paddingBottom: 12 },
  heading: { fontWeight: '700', color: MD3LightTheme.colors.onSurface },
  subtitle: { marginTop: 6, marginBottom: 20, color: MD3LightTheme.colors.onSurfaceVariant },
  search: { marginBottom: 8 },
  card: { marginBottom: 16, borderRadius: 18 },
  cardTitle: { marginTop: 14, fontWeight: '700' },
  description: { color: MD3LightTheme.colors.onSurfaceVariant, marginTop: 3 },
  previewRow: { borderWidth: 1, borderColor: MD3LightTheme.colors.outline, minHeight: 56, borderRadius: 4, paddingLeft: 16, paddingRight: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  previewInput: { backgroundColor: MD3LightTheme.colors.surface, height: 56 },
  previewSearch: { backgroundColor: MD3LightTheme.colors.surfaceVariant },
  empty: { textAlign: 'center', marginTop: 32, color: MD3LightTheme.colors.onSurfaceVariant },
});
