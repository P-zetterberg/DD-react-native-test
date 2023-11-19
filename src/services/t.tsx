import { getLocales } from 'expo-localization';

let trans:Record<string, Record<string, string>> = {
    sv: require('../translations/sv.json'),
    en: require('../translations/en.json')
   }

export function t(key:string) {
    let locale = getLocales()[0].languageCode
    return trans[locale][key]
   }