import { createContext, useContext, useState, useEffect } from 'react';
import { useTheme as useAppTheme } from '../../context/ThemeContext';

const WorkflowThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

const noop = () => {};

export const WorkflowThemeProvider = ({ children }) => {
  let appTheme = 'dark';
  let appToggleTheme = noop;

  try {
    const context = useAppTheme();
    if (context) {
      appTheme = context.theme;
      appToggleTheme = context.toggleTheme;
    }
  } catch (e) {
    // Standalone fallback if used outside main App ThemeProvider
  }

  const [localTheme, setLocalTheme] = useState(appTheme);

  useEffect(() => {
    setLocalTheme(appTheme);
  }, [appTheme]);

  const toggleTheme = () => {
    if (appToggleTheme && appToggleTheme !== noop) {
      appToggleTheme();
    } else {
      setLocalTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  return (
    <WorkflowThemeContext.Provider value={{ theme: localTheme, toggleTheme }}>
      {children}
    </WorkflowThemeContext.Provider>
  );
};

export const useWorkflowTheme = () => useContext(WorkflowThemeContext);
