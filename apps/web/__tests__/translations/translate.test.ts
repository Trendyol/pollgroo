import translate from '../../translations/translate';

describe('translate', () => {
  it('should translate a key from the default language', () => {
    expect(translate('LANDING_GREETING')).toBe('Coming Soon');
    expect(translate('LANDING_DESCRIPTION')).toBe('A new perspective on driving business');
  });

  it('should translate a key from a specific language', () => {
    expect(translate('LANDING_GREETING', 'tr')).toBe('Çok Yakında');
    expect(translate('LANDING_DESCRIPTION', 'tr')).toBe('İşi yönlendirmeye yeni bir bakış açısı');
  });

  it('should return the key if it does not exist in the translation object', () => {
    expect(translate('NON_EXISTENT_KEY')).toBe('NON_EXISTENT_KEY');
  });

  it('should set the default language to "en" if no language is provided', () => {
    expect(translate('LANDING_GREETING')).toBe('Coming Soon');
    expect(translate('LANDING_GREETING', undefined)).toBe('Coming Soon');
    expect(translate('LANDING_GREETING', null)).toBe('Coming Soon');
    expect(translate('LANDING_GREETING', '')).toBe('Coming Soon');
  });
});
