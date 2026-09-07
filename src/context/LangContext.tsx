import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '@/data/content';

type LangContextType = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
   
export function useLang() {
  return useContext(LangContext);
}
