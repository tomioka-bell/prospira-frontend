"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const req = (require as any).context("./", true, /\.json$/);

const resources: Record<string, { translation: Record<string, unknown> }> = {};

req.keys().forEach((path: string) => {
  const langMatch = path.match(/\.\/([^/]+)\//);
  if (!langMatch) return;

  const lang = langMatch[1];
  const data = req(path);

  if (!resources[lang]) resources[lang] = { translation: {} };

  Object.assign(resources[lang].translation, data);
});

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "th",
    fallbackLng: "th",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
