import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider, detectLang, loadDict } from './i18n'

/* Resolve the language and its dictionary before the first render. English
   rides in this chunk; FR, AR and ES arrive as their own small chunks, so the
   page never paints one locale's words and then swaps them for another's. */
const lang = detectLang()
const dict = await loadDict(lang)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider initialLang={lang} initialDict={dict}>
      <App />
    </I18nProvider>
  </StrictMode>,
)
