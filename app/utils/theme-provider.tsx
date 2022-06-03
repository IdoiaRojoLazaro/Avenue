import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

enum Theme {
	DARK = 'dark',
	LIGHT = 'light'
}

const ThemeContext = createContext<[Theme | null, React.Dispatch<React.SetStateAction<Theme | null>>] | undefined>(undefined);

const prefersMediaCS = '(prefers-color-scheme: dark)';
const getPreferredTheme = () => (window.matchMedia(prefersMediaCS).matches ? Theme.DARK : Theme.LIGHT);

function ThemeProvider({ specifiedTheme, children }: { specifiedTheme: Theme | null, children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme | null>(() => {
		if (specifiedTheme) return themes.includes(specifiedTheme) ? specifiedTheme : null;

		// if window global variable is defined we're on the client and get user's media preferences
		if (typeof window !== 'object') return null; // server side
		return getPreferredTheme(); // client side
	});

	const persistTheme = useFetcher();
	const persistThemeRef = useRef(persistTheme);

	useEffect(() => {
		persistThemeRef.current = persistTheme;
	}, [persistTheme])

	const mountRun = useRef(false);

	useEffect(() => {
		if (!mountRun.current) {
			mountRun.current = true;
			return;
		}
		if (!theme) return;

		persistThemeRef.current.submit({ theme }, { action: 'action/set-theme', method: 'post' })
	}, [theme])


	return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
}

function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw Error('useTheme must be used inside a ThemeProvider');
	}
	return context;
}

const clientThemeCode = `
	;(() => {
		const theme = window.matchMedia(${JSON.stringify(prefersMediaCS)}).matches ? 'dark' : 'light';
		const cl = document.documentElement.classList;
		const themeAlreadyApplied = cl.contains('dark') || cl.contains('light');
		if(themeAlreadyApplied){
			console.warn("There was an error, please contact the administrator");
		}else{
			console.log('Adding theme', theme);
			cl.add(theme);
		}
	})();
`;

function ScriptToCheckThemeAlreadyApplied({ ssrTheme }: { ssrTheme: boolean }) {
	return <>{ssrTheme ? null : <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />}</>;
}

const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
	return typeof value === 'string' && themes.includes(value as Theme);
}

export { Theme, ThemeProvider, useTheme, ScriptToCheckThemeAlreadyApplied, isTheme }