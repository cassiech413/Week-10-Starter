import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Checkbox, HelperText, MD3LightTheme, Menu, RadioButton, Searchbar, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { components, type ComponentId } from '../../data/components';

type Choice = 'checked' | 'unchecked';

function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <View style={styles.optionRow}><Text style={styles.optionLabel}>{label}</Text><View style={styles.optionControl}>{children}</View></View>;
}

function OptionButtons({ value, onValueChange, options }: { value: string; onValueChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return <SegmentedButtons value={value} onValueChange={onValueChange} buttons={options.map((option) => ({ ...option, showSelectedCheck: true }))} />;
}

function RadioChoices({ value, onValueChange, options }: { value: string; onValueChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return <RadioButton.Group value={value} onValueChange={onValueChange}>{options.map((option) => <RadioButton.Item key={option.value} value={option.value} label={option.label} style={styles.radioChoice} />)}</RadioButton.Group>;
}

function RadioDemo() {
  const [value, setValue] = useState('normal');
  const [status, setStatus] = useState<Choice>('checked');
  const [pressAction, setPressAction] = useState('nothing');
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('Any helper text for event listened');
  const handlePress = () => {
    if (disabled) return;
    setStatus('checked');
    setMessage('onPressed event listened');
    if (pressAction === 'alert') Alert.alert('Radio Button', 'onPressed event listened');
  };

  return <>
    <Card mode="outlined"><RadioButton.Item label={disabled && status === 'checked' ? 'Checked (Disabled)' : value || 'Normal'} value={value || 'normal'} status={status} onPress={handlePress} disabled={disabled} /></Card>
    <HelperText type="info" visible style={styles.centerHelper}>{disabled ? 'Helper text' : message}</HelperText>
    <Text variant="titleMedium" style={styles.sectionTitle}>Options</Text>
    <OptionRow label="Value"><TextInput mode="outlined" dense value={value} onChangeText={setValue} placeholder="Default Input" accessibilityLabel="Radio button value" /></OptionRow>
    <OptionRow label="Status"><RadioChoices value={status} onValueChange={(next) => setStatus(next as Choice)} options={[{ value: 'checked', label: 'Checked' }, { value: 'unchecked', label: 'Unchecked' }]} /></OptionRow>
    <OptionRow label="onPress"><RadioChoices value={pressAction} onValueChange={setPressAction} options={[{ value: 'nothing', label: 'Nothing' }, { value: 'alert', label: 'Put Alert' }]} /></OptionRow>
    <OptionRow label="disabled"><RadioChoices value={String(disabled)} onValueChange={(next) => setDisabled(next === 'true')} options={[{ value: 'true', label: 'True' }, { value: 'false', label: 'False' }]} /></OptionRow>
  </>;
}

function TextInputDemo() {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState('outlined');
  const [disabled, setDisabled] = useState(false);
  return <>
    <TextInput label="Your name" mode={mode as 'outlined' | 'flat'} value={value} onChangeText={setValue} disabled={disabled} accessibilityLabel="Your name" />
    <HelperText type="info" visible>Enter a name to see the input update.</HelperText>
    <Text variant="titleMedium" style={styles.sectionTitle}>Options</Text>
    <OptionRow label="Style"><OptionButtons value={mode} onValueChange={setMode} options={[{ value: 'outlined', label: 'Outlined' }, { value: 'flat', label: 'Flat' }]} /></OptionRow>
    <OptionRow label="disabled"><OptionButtons value={String(disabled)} onValueChange={(next) => setDisabled(next === 'true')} options={[{ value: 'true', label: 'True' }, { value: 'false', label: 'False' }]} /></OptionRow>
  </>;
}

function HelperTextDemo() {
  const [value, setValue] = useState('');
  const [type, setType] = useState('info');
  return <>
    <TextInput label="Username" mode="outlined" value={value} onChangeText={setValue} accessibilityLabel="Username" />
    <HelperText type={type as 'info' | 'error'} visible>{type === 'error' ? 'This username needs at least 3 characters.' : 'Use at least 3 characters for your username.'}</HelperText>
    <Text variant="titleMedium" style={styles.sectionTitle}>Options</Text>
    <OptionRow label="Type"><OptionButtons value={type} onValueChange={setType} options={[{ value: 'info', label: 'Info' }, { value: 'error', label: 'Error' }]} /></OptionRow>
  </>;
}

function ValidationDemo() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const error = touched && !valid;
  return <>
    <TextInput label="Email address" mode="outlined" value={email} onChangeText={(text) => { setEmail(text); setTouched(true); }} onBlur={() => setTouched(true)} keyboardType="email-address" autoCapitalize="none" autoComplete="email" error={error} accessibilityLabel="Email address" />
    <HelperText type={error ? 'error' : 'info'} visible>{error ? 'Enter a valid email address.' : valid ? 'Looks good! Your email is valid.' : 'Try an address like name@example.com.'}</HelperText>
    <Text style={styles.supportingText}>The field changes state as you type.</Text>
  </>;
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return <>
    <Checkbox.Item label="Send me updates" status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} disabled={disabled} mode="android" style={styles.demoBox} />
    <HelperText type="info" visible>{checked ? 'Updates are selected.' : 'Updates are not selected.'}</HelperText>
    <Text variant="titleMedium" style={styles.sectionTitle}>Options</Text>
    <OptionRow label="Status"><OptionButtons value={String(checked)} onValueChange={(next) => setChecked(next === 'true')} options={[{ value: 'true', label: 'Checked' }, { value: 'false', label: 'Unchecked' }]} /></OptionRow>
    <OptionRow label="disabled"><OptionButtons value={String(disabled)} onValueChange={(next) => setDisabled(next === 'true')} options={[{ value: 'true', label: 'True' }, { value: 'false', label: 'False' }]} /></OptionRow>
  </>;
}

function MenuDemo() {
  const [visible, setVisible] = useState(false);
  const [selection, setSelection] = useState('Nothing selected');
  const choose = (value: string) => { setSelection(value); setVisible(false); };
  return <>
    <View style={styles.menuAnchor}><Menu visible={visible} onDismiss={() => setVisible(false)} anchor={<Button mode="outlined" icon="chevron-down" onPress={() => setVisible(true)}>Open menu</Button>}><Menu.Item onPress={() => choose('Edit')} title="Edit" leadingIcon="pencil" /><Menu.Item onPress={() => choose('Share')} title="Share" leadingIcon="share-variant" /><Menu.Item onPress={() => choose('Delete')} title="Delete" leadingIcon="delete" /></Menu></View>
    <HelperText type="info" visible>Selected action: {selection}</HelperText>
  </>;
}

function SearchDemo() {
  const [query, setQuery] = useState('');
  const results = components.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <Searchbar placeholder="Search components" value={query} onChangeText={setQuery} accessibilityLabel="Search component examples" />
    <HelperText type="info" visible>{results.length} {results.length === 1 ? 'result' : 'results'}</HelperText>
    <View style={styles.results}>{results.map((item) => <Text key={item.id} style={styles.result}>{item.title}</Text>)}</View>
  </>;
}

export default function ComponentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const component = components.find((item) => item.id === id);
  if (!component) return <SafeAreaView style={styles.screen}><Appbar.Header><Appbar.BackAction onPress={() => router.back()} /><Appbar.Content title="Not found" /></Appbar.Header><Text style={styles.content}>This component does not exist.</Text></SafeAreaView>;

  const demos: Record<ComponentId, React.ReactNode> = {
    'radio-button': <RadioDemo />,
    'menu': <MenuDemo />,
    'text-input': <TextInputDemo />,
    'helper-text': <HelperTextDemo />,
    'validation': <ValidationDemo />,
    'checkbox': <CheckboxDemo />,
    'search-bar': <SearchDemo />,
  };

  return <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}><Appbar.Header style={styles.appbar}><Appbar.BackAction onPress={() => router.back()} accessibilityLabel="Back to components" /><Appbar.Content title={component.title} titleStyle={styles.appbarTitle} /></Appbar.Header><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><Text style={styles.intro}>{component.description}</Text>{demos[component.id]}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: MD3LightTheme.colors.background },
  appbar: { backgroundColor: MD3LightTheme.colors.surface },
  appbarTitle: { fontWeight: '700' },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 },
  intro: { color: MD3LightTheme.colors.onSurfaceVariant, marginBottom: 24 },
  demoBox: { borderWidth: 1, borderColor: MD3LightTheme.colors.outline, borderRadius: 4, minHeight: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 8 },
  radioChoice: { paddingHorizontal: 4 },
  centerHelper: { textAlign: 'center', marginTop: 18, marginBottom: 28 },
  sectionTitle: { fontWeight: '700', marginTop: 28, marginBottom: 16 },
  optionRow: { marginBottom: 20 },
  optionLabel: { marginBottom: 8, color: MD3LightTheme.colors.onSurfaceVariant },
  optionControl: { width: '100%' },
  supportingText: { color: MD3LightTheme.colors.onSurfaceVariant, marginTop: 16 },
  menuAnchor: { alignItems: 'flex-start', marginBottom: 16 },
  results: { marginTop: 16, gap: 8 },
  result: { padding: 14, backgroundColor: MD3LightTheme.colors.surfaceVariant, borderRadius: 8 },
});
