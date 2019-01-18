import {TranslateConfiguratorInterface} from './TranslateConfiguratorInterface';
import i18n from 'i18n-js';
import {Platform, NativeModules} from "react-native";

import en from '../../../files/translations/en.json';
import ru from '../../../files/translations/ru.json';

export class TranslateConfigurator implements TranslateConfiguratorInterface {

    private readonly defaultLanguage = 'en';
    private static translateConfigurator?: TranslateConfiguratorInterface;

    private constructor() {

        i18n.defaultLocale = this.defaultLanguage;
        i18n.fallbacks = true;

        this.changeLanguage(this.getDeviceLanguage());

        i18n.translations = { en, ru };
    }

    static getInstance(): TranslateConfiguratorInterface {

        if (this.translateConfigurator === undefined) {
            this.translateConfigurator = new TranslateConfigurator();
        }

        return this.translateConfigurator;
    }

    private getDeviceLanguage() {
        let langRegionLocale = this.defaultLanguage;

        if (Platform.OS === "android") {
            langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
        } else if (Platform.OS === "ios") {
            langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
        }

        return langRegionLocale.substring(0, 2);
    }

    public changeLanguage(language: string): void {
        i18n.locale = language;
    }

    public getLocale(): string {
        return i18n.locale;
    }
}

