import { Injectable } from "@angular/core";

/**
 * Classe responsavel gerenciar os utils
 * @author Starley Cazorla
 */

@Injectable({ providedIn: 'root' })
export class IonUtilsProvider {

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
     * Verifica se o email e vaido
     * @param email 
     * @returns 
     */
    isEmailValid(email: string) {
        if (!email) return false;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.trim().toLowerCase());
    }

    /**
     * Converte JSON em Array
     * @param data 
     * @returns 
     */
    convertJsonToArray(data: any): Promise<[]> {
        let jsonData = data.map((val: any) => { return JSON.stringify(val) });
        return jsonData.filter((value: any, ind: any) => jsonData.indexOf(value) == ind).map((val: string) => { return JSON.parse(val) });
    }

}