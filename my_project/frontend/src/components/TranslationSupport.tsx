import React, { useState, useEffect } from 'react';

interface TranslationSupportProps {
  children: React.ReactNode;
  originalText: string;
}

const TranslationSupport: React.FC<TranslationSupportProps> = ({ children, originalText }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  // Mock translation function - in a real implementation, this would call a translation API
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock translations for demonstration
    const mockTranslations: Record<string, string> = {
      'en': originalText,
      'ur': 'یہ اردو میں ترجمہ ہے۔ یہاں اصل متن کا ترجمہ ہوگا۔' // This is the Urdu translation. The translation of the original text will be here.
    };

    setIsLoading(false);
    return mockTranslations[targetLang] || originalText;
  };

  useEffect(() => {
    if (currentLanguage !== 'en') {
      translateText(originalText, currentLanguage)
        .then(setTranslatedText)
        .catch(() => setTranslatedText(originalText));
    } else {
      setTranslatedText(originalText);
    }
  }, [currentLanguage, originalText]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setShowTranslation(lang !== 'en');
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Language selector */}
      <div style={{
        position: 'absolute',
        top: '-35px',
        right: '0',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        <button
          onClick={() => handleLanguageChange('en')}
          style={{
            padding: '4px 8px',
            backgroundColor: currentLanguage === 'en' ? '#3498db' : '#ecf0f1',
            color: currentLanguage === 'en' ? 'white' : '#2c3e50',
            border: '1px solid #bdc3c7',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('ur')}
          style={{
            padding: '4px 8px',
            backgroundColor: currentLanguage === 'ur' ? '#3498db' : '#ecf0f1',
            color: currentLanguage === 'ur' ? 'white' : '#2c3e50',
            border: '1px solid #bdc3c7',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          UR
        </button>
      </div>

      {/* Content with translation toggle */}
      <div>
        {showTranslation && (
          <div style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            marginBottom: '10px',
            direction: currentLanguage === 'ur' ? 'rtl' : 'ltr'
          }}>
            <div style={{
              fontStyle: 'italic',
              fontSize: '14px',
              color: '#7f8c8d',
              marginBottom: '5px'
            }}>
              {currentLanguage === 'ur' ? 'اردو ترجمہ' : 'Urdu Translation'}
            </div>
            <div style={{ fontSize: '15px' }}>
              {isLoading ? 'Translating...' : translatedText}
            </div>
          </div>
        )}

        <div style={{ direction: currentLanguage === 'ur' ? 'rtl' : 'ltr' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TranslationSupport;