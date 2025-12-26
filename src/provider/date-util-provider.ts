import { Injectable } from "@angular/core";
import moment from 'moment';

/**
 * Date utils
 * @author Starley Cazorla
 */

@Injectable()
export class DateUtilProvider {
    newDate = new Date();

    constructor() { }

    /**
    * Veifica se a data e valida
    * @param date
    * @returns
    */
    isValidDate(date: string) {
        if (!date) return false;
        // Regex format: DD/MM/YYYY | DD-MM-YYYY | DD.MM.YYYY
        const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        return re.test(date);
    }

    /**
   * Converts date to int
   * @author Starley Cazorla
   * @param data
   * @returns date to int
   */
    convertDateToInt(data: string): number {
        let temp: any;

        if (data === null || data === undefined || data.length <= 0) {
            return 0;
        }
        data = data.substring(0, 10);

        if (data.includes('/')) {
            temp = data.split('/');
        } else if (data.includes('-')) {
            temp = data.split('-');
        }

        if (temp === undefined) {
            return 0;
        } else if (temp[0].length > 2) {
            return temp[0] + temp[1] + temp[2];
        } else {
            return temp[2] + temp[1] + temp[0];
        }
    }

    /**
     * Determines whether today is
     * @author Starley Cazorla
     * @param dateInput
     * @returns true if today
     */
    isToday(dateInput: any): boolean {
        if (dateInput && this.convertDateToInt(dateInput) === this.convertDateToInt(new Date().toLocaleDateString('pt-Br'))) return true;
        return false;
    }

    /**
     * Determines whether date is bigger today is
     * @author Starley Cazorla
     * @param dateInput
     * @returns true if date is bigger today
     */
    isDateIsSmallerToday(dateInput: any): boolean {
        if (dateInput === null || dateInput === undefined) return false;
        if (this.convertDateToInt(dateInput) < this.convertDateToInt(new Date().toLocaleDateString('pt-Br'))) return true;
        return false;
    }

    /**
     * Firsts bigger than second
     * @author Starley Cazorla
     * @param firstDate
     * @param lastDate
     * @returns true if bigger than second
     */
    firstBiggerThanSecond(firstDate: any, lastDate: any): boolean {
        if (this.convertDateToInt(firstDate) < this.convertDateToInt(lastDate)) return true;
        return false;
    }

    /**
     * Gets diff days by today
     * @author Starley Cazorla
     * @param date1
     * @deprecated
     * @returns
     */
    getDiffDaysByToday(date1: any) {
        var momentA = moment(date1, 'DD/MM/YYYY');
        var momentB = moment(new Intl.DateTimeFormat('pt-BR').format(this.newDate), 'DD/MM/YYYY');
        var diff = momentB.valueOf() - momentA.valueOf();
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays;
    }

    /**
     * Gets name day
     * @author Starley Cazorla
     * @param date
     * @param nmDays
     * @returns
     */
    getNameDay(date: any, nmDays: any) {
        var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
        var d = new Date(date);
        d.setDate(d.getDate() + nmDays)
        return {
            'dayName': days[d.getDay()],
            'dayNumber': d.getDate()
        };
    }

    /**
     * Gets diff days by date
     * @author Starley Cazorla
     * @param date
     * @returns
     */
    getDiffDaysByDate(date: Date) {
        if (!date) return 0;

        this.newDate.setHours(0, 0, 0, 0); // opcional: ignora hora
        date.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((date.getTime() - this.newDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays; // positivo = dias restantes, negativo = dias vencidos (-4 = 4 dias atrasado)
    }

    getDiffYearsByToday(date: Date) {
        if (!date) return false;

        const hoje = new Date();
        const dataLimite = new Date(
            hoje.getFullYear() - 18,
            hoje.getMonth(),
            hoje.getDate()
        );

        return date <= dataLimite;
    }

    /**
     * Format date to DD/MM/YYYY
     * @author Starley Cazorla
     * @param date
     * @returns formatted date
     */
    returnFormatBrDate(date: Date | string) {
        const d = date instanceof Date ? date : new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    /**
     * Convert DD/MM/YYYY to Date
     * @author Starley Cazorla
     * @param dateBr
     * @returns Date object
     */
    convertBrDateToDate(dateBr: string): Date {
        if (!dateBr) {
            throw new Error('Data não informada');
        }

        const [day, month, year] = dateBr.split('/').map(Number);

        if (!day || !month || !year) {
            throw new Error('Data inválida');
        }

        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }


}
