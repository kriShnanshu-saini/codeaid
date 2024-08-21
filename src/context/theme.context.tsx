import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
	theme: string;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<string>('dark');

	useEffect(() => {
		const savedTheme = localStorage.getItem('app-theme');
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('app-theme', newTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	// if (!context) {
	// 	throw new Error('useTheme must be used within a ThemeProvider');
	// }
	return context;
};
