import { Injectable } from "@angular/core";

/**
 * Classe responsavel gerenciar os utils
 * @author Starley Cazorla
 */

@Injectable({ providedIn: 'root' })
export class IonValidateFilds {

    // Novo formato de validação de CNPJ
    private tamanhoCNPJSemDV = 12;
    private regexCNPJSemDV = /^([A-Z\d]){12}$/;
    private regexCNPJ = /^([A-Z\d]){12}(\d){2}$/;
    private regexCaracteresNaoPermitidos = /[^A-Z\d./-]/i;
    private regexCaracteresMascara = /[./-]/g;
    private cnpjZerado = "00000000000000";
    private pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    private valorBase: number = "0".charCodeAt(0);

    constructor() { }

    /**
    * Validar ddd de todos os estados brasileiros
    * @author Starley Cazorla
    * @param ddd
    * @returns true if ddd
    */
    private validarDDD(ddd: string): boolean {
        const dddsValidos = [
            '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
            '21', '22', '24', // RJ
            '27', '28', // ES
            '31', '32', '33', '34', '35', '37', '38', // MG
            '41', '42', '43', '44', '45', '46', // PR
            '47', '48', '49', // SC
            '51', '53', '54', '55', // RS
            '61', // DF e GO
            '62', '64', // GO
            '63', // TO
            '65', '66', // MT
            '67', // MS
            '68', // AC
            '69', // RO
            '71', '73', '74', '75', '77', // BA
            '79', // SE
            '81', '87', // PE
            '82', // AL
            '83', // PB
            '84', // RN
            '85', '88', // CE
            '86', '89', // PI
            '91', '93', '94', // PA
            '92', '97', // AM
            '95', // RR
            '96', // AP
            '98', '99', // MA
        ];

        return dddsValidos.includes(ddd);
    }

    private contemSequenciaRepetida(numero: string): boolean {
        const sequenciasRepetidas = [
            '00000000',
            '11111111',
            '22222222',
            '33333333',
            '44444444',
            '55555555',
            '66666666',
            '77777777',
            '88888888',
            '99999999'
        ];

        return sequenciasRepetidas.some(sequencia => numero.includes(sequencia));
    }

    /**
     * Validar numero telefone
     * @author Starley Cazorla
     * @param telefone
     * @returns true if numero telefone
     */
    public validarNumeroTelefone(telefone: string): boolean {
        // Remover caracteres não numéricos
        telefone = telefone.replace(/\D/g, '');

        // Verificar o formato do número de telefone fixo (10 dígitos) com DDD
        // const formatoFixo = /^\d{10}$/;

        const numero = telefone.substring(2);
        if (this.contemSequenciaRepetida(numero)) {
            return false;
        }

        // if (formatoFixo.test(telefone)) {
        //     const ddd = telefone.substring(0, 2);
        //     const numero = telefone.substring(2);
        //     return this.validarDDD(ddd) && numero.length === 8;
        // }

        // Verificar o formato do número de telefone celular (11 dígitos) com DDD
        const formatoCelular = /^\d{11}$/;

        if (formatoCelular.test(telefone)) {
            const ddd = telefone.substring(0, 2);
            const numero = telefone.substring(2);
            const dig = telefone[2];
            if (dig !== '9') return false;
            return this.validarDDD(ddd) && numero.length === 9;
        }

        // Número de telefone inválido
        return false;
    }

    /**
     * Validar cpf
     * @author Starley Cazorla
     * @param cpf
     * @returns true if cpf
     */
    validarCPF(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, '');

        // CPF precisa ter 11 dígitos
        if (cpf.length !== 11) return false;

        // Elimina CPFs inválidos conhecidos (sequências repetidas)
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        // Valida primeiro dígito
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

        // Valida segundo dígito
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;

        return true;
    }

    /**
     * Validar cnpj
     * @author Starley Cazorla
     * @param cnpj
     * @returns true if cnpj
     */
    validarCNPJ(cnpj: string): boolean {

        // Novo formato de validação do CNPJ - 2026
        let newCnpj = /[A-Za-z]/;
        if (newCnpj.test(cnpj)) {
            return this.validaNovoFormatoCNPJ(cnpj);
        }

        // Remover caracteres não numéricos
        cnpj = cnpj.replace(/[^\d]/g, '');

        // Verificar se o CNPJ possui 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }

        // Verificar se todos os dígitos são iguais (CNPJ inválido)
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Calcular os dígitos verificadores
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        // Verificar o primeiro dígito verificador
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return false;
        }

        tamanho++;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        // Verificar o segundo dígito verificador
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return false;
        }

        // CNPJ válido
        return true;
    }

    /**
     * Validas novo formato cnpj
     * @author Starley Cazorla
     * @param cnpj
     * @returns
     */
    validaNovoFormatoCNPJ(cnpj: string) {
        cnpj = cnpj.toUpperCase();
        if (!this.regexCaracteresNaoPermitidos.test(cnpj)) {
            let cnpjSemMascara = this.removeMascaraNovoFormatoCNPJ(cnpj);
            if (this.regexCNPJ.test(cnpjSemMascara) && cnpjSemMascara !== this.cnpjZerado) {
                const dvInformado = cnpjSemMascara.substring(this.tamanhoCNPJSemDV);
                const dvCalculado = this.calculaDvNovoFormatoCNPJ(cnpjSemMascara.substring(0, this.tamanhoCNPJSemDV));
                return dvInformado === dvCalculado;
            }
        }
        return false;
    }

    /**
     * Calculas dv novo formato cnpj
     * @author Starley Cazorla
     * @param cnpj
     * @returns
     */
    calculaDvNovoFormatoCNPJ(cnpj: string) {
        cnpj = cnpj.toUpperCase();
        if (!this.regexCaracteresNaoPermitidos.test(cnpj)) {
            let cnpjSemMascara = cnpj.replace(this.regexCaracteresMascara, '');
            if (this.regexCNPJSemDV.test(cnpjSemMascara) && cnpjSemMascara !== this.cnpjZerado.substring(0, this.tamanhoCNPJSemDV)) {
                let somatorioDV1 = 0;
                let somatorioDV2 = 0;
                for (let i = 0; i < this.tamanhoCNPJSemDV; i++) {
                    const asciiDigito = cnpjSemMascara.charCodeAt(i) - this.valorBase;
                    somatorioDV1 += asciiDigito * this.pesosDV[i + 1];
                    somatorioDV2 += asciiDigito * this.pesosDV[i];
                }
                const dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
                somatorioDV2 += dv1 * this.pesosDV[this.tamanhoCNPJSemDV];
                const dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);
                return `${dv1}${dv2}`;
            }
        }
    }

    removeMascaraNovoFormatoCNPJ(cnpj: string): string {
        return cnpj.replace(this.regexCaracteresMascara, "");
    }

    /**
     * Formats fild
     * @author Starley Cazorla
     * @param inputFildValue
     * @param [tipoChave] - celular - cpf - cnpj
     * @returns fild
     */
    formatFild(inputFildValue: string, tipoChave?: string): any {
        const regexCPF = /^\d{11}$/;
        const regexCNPJ = /^\d{14}$/;
        const regexCelular = /^\d{10,11}$/;

        const chaveSemMascara = inputFildValue.replace(/\W/g, '');

        let fildFormated = {
            fild: '',
            tipoChave: '',
            isValid: false
        };

        if ((tipoChave !== undefined && tipoChave === 'celular' || (tipoChave === undefined && regexCelular.test(chaveSemMascara)) && this.validarNumeroTelefone(chaveSemMascara)) && !this.validarCPF(chaveSemMascara)) {
            // Chave é um número de celular válido
            fildFormated.fild = `(${chaveSemMascara.substr(0, 2)}) ${chaveSemMascara.substr(2, 5)}-${chaveSemMascara.substr(7)}`;
            fildFormated.tipoChave = 'TELEFONE';
        } else if (tipoChave !== undefined && tipoChave === 'cpf' || (tipoChave === undefined && regexCPF.test(chaveSemMascara)) && this.validarCPF(chaveSemMascara)) {
            // Chave é um CPF válido
            fildFormated.fild = `${chaveSemMascara.substr(0, 3)}.${chaveSemMascara.substr(3, 3)}.${chaveSemMascara.substr(6, 3)}-${chaveSemMascara.substr(9)}`;
            fildFormated.tipoChave = 'CPF';
        } else if (tipoChave !== undefined && tipoChave === 'cnpj' || (tipoChave === undefined && regexCNPJ.test(chaveSemMascara)) && this.validarCNPJ(chaveSemMascara)) {
            // Chave é um CNPJ válido
            fildFormated.fild = `${chaveSemMascara.substr(0, 2)}.${chaveSemMascara.substr(2, 3)}.${chaveSemMascara.substr(5, 3)}/${chaveSemMascara.substr(8, 4)}-${chaveSemMascara.substr(12)}`;
            fildFormated.tipoChave = 'CNPJ';
        } else {
            // Chave não corresponde a nenhum formato válido
            fildFormated.fild = inputFildValue;
            fildFormated.tipoChave = 'INVÁLIDA';
        }

        fildFormated.isValid = fildFormated.tipoChave !== 'INVÁLIDA';

        return fildFormated;
    }

}
