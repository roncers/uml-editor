import i18n from '@/i18n/config';
 
export function getRandomName(): string {
    const randomIndex = Math.floor(Math.random() * 50) + 1;
    return i18n.t(`random-words.${randomIndex}`);
}