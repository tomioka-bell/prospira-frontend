"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const req = (require as any).context("./", true, /\.json$/);

const resources: Record<string, { translation: any }> = {};

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
    lng: "en",
    fallbackLng: "th",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
