export const components = [
  { id: 'radio-button', title: 'Radio Button', description: 'Choose one option at a time.' },
  { id: 'menu', title: 'Menu', description: 'Open a list of actions.' },
  { id: 'text-input', title: 'Text Input', description: 'Enter and edit a value.' },
  { id: 'helper-text', title: 'Helper Text', description: 'Give useful input guidance.' },
  { id: 'validation', title: 'Validation States', description: 'Show errors and success.' },
  { id: 'checkbox', title: 'Checkbox', description: 'Toggle an independent choice.' },
  { id: 'search-bar', title: 'Search Bar', description: 'Filter a list as you type.' },
] as const;

export type ComponentId = (typeof components)[number]['id'];
