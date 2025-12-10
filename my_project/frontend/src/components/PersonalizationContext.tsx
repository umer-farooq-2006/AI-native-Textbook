import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalizationPreferences {
  language: string;
  theme: 'light' | 'dark';
  learningPace: 'beginner' | 'intermediate' | 'advanced';
  preferredModules: string[];
  completedChapters: string[];
  bookmarks: string[];
}

interface PersonalizationContextType {
  preferences: PersonalizationPreferences;
  updatePreferences: (newPrefs: Partial<PersonalizationPreferences>) => void;
  addCompletedChapter: (chapterId: string) => void;
  addBookmark: (bookmarkId: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  isChapterCompleted: (chapterId: string) => boolean;
  isBookmarked: (bookmarkId: string) => boolean;
}

const defaultPreferences: PersonalizationPreferences = {
  language: 'en',
  theme: 'light',
  learningPace: 'intermediate',
  preferredModules: ['ROS 2', 'Gazebo & Unity', 'NVIDIA Isaac', 'VLA + GPT'],
  completedChapters: [],
  bookmarks: [],
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<PersonalizationPreferences>(() => {
    // Check if we're in browser environment before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPrefs = localStorage.getItem('textbookPreferences');
      return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
    }
    return defaultPreferences;
  });

  // Save preferences to localStorage whenever they change (only in browser)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('textbookPreferences', JSON.stringify(preferences));
    }
  }, [preferences]);

  const updatePreferences = (newPrefs: Partial<PersonalizationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  const addCompletedChapter = (chapterId: string) => {
    setPreferences(prev => {
      if (!prev.completedChapters.includes(chapterId)) {
        return {
          ...prev,
          completedChapters: [...prev.completedChapters, chapterId]
        };
      }
      return prev;
    });
  };

  const addBookmark = (bookmarkId: string) => {
    setPreferences(prev => {
      if (!prev.bookmarks.includes(bookmarkId)) {
        return {
          ...prev,
          bookmarks: [...prev.bookmarks, bookmarkId]
        };
      }
      return prev;
    });
  };

  const removeBookmark = (bookmarkId: string) => {
    setPreferences(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(id => id !== bookmarkId)
    }));
  };

  const isChapterCompleted = (chapterId: string) => {
    return preferences.completedChapters.includes(chapterId);
  };

  const isBookmarked = (bookmarkId: string) => {
    return preferences.bookmarks.includes(bookmarkId);
  };

  const contextValue: PersonalizationContextType = {
    preferences,
    updatePreferences,
    addCompletedChapter,
    addBookmark,
    removeBookmark,
    isChapterCompleted,
    isBookmarked,
  };

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};