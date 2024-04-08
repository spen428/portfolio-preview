import { useI18n } from "vue-i18n";
import type { WritableComputedRef } from "vue";
import enGbGlobal from "@/i18n/en-GB/global.json";
import enGbRoutes from "@/i18n/en-GB/routes.json";
import jaJpGlobal from "@/i18n/ja-JP/global.json";
import jaJpRoutes from "@/i18n/ja-JP/routes.json";

export const messages = {
  "en-GB": { ...enGbGlobal, routes: enGbRoutes },
  "ja-JP": { ...jaJpGlobal, routes: jaJpRoutes },
};

const LOCAL_STORAGE_DEFAULT_LOCALE_KEY = "defaultLocale";

interface LocaleMetadata {
  locale: string;
  name: string;
  icon: string;
}

export default new (class LocaleService {
  public getCurrentLocale(): WritableComputedRef<string> {
    const { locale } = useI18n();
    return locale;
  }

  public setCurrentLocale(value: string) {
    this.getCurrentLocale().value = value;
  }

  public getDefaultLocaleFromLocalStorage(): string {
    const locale = localStorage.getItem(LOCAL_STORAGE_DEFAULT_LOCALE_KEY) ?? "";
    const { availableLocales } = useI18n();
    if (!availableLocales.includes(locale)) {
      localStorage.removeItem(LOCAL_STORAGE_DEFAULT_LOCALE_KEY);
      return "en-GB";
    }
    return locale;
  }

  public saveDefaultLocaleToLocalStorage(locale: string) {
    localStorage.setItem(LOCAL_STORAGE_DEFAULT_LOCALE_KEY, locale);
  }

  public getLocaleMetadata(): LocaleMetadata[] {
    return [
      {
        locale: "en-GB",
        name: "English (United Kingdom)",
        icon: "/icons/circle-en-GB.svg",
      },
      { locale: "ja-JP", name: "日本語", icon: "/icons/circle-ja-JP.svg" },
    ];
  }
})();
