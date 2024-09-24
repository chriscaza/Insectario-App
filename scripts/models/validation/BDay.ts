export default class BDay {
    static formatDate(bDay: string): string {
        const [d, m, a] = bDay.split('/');

        const day = d.padStart(2, '0');
        const month = m.padStart(2, '0');
        
        return new Date(`${a}-${month}-${day}`).toISOString().split('T')[0];
    }

    static isBDayEmpty(bDay: string): boolean {
        return bDay === null || bDay === ''
    }
}