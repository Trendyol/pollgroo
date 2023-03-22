import translation from './translation.json';

type Language = keyof typeof translation;

function translate(key: string, lang?: Language): string {
  const language = lang || 'en';
  return translation[language][key as keyof (typeof translation)[Language]] || key;
}

export default translate;