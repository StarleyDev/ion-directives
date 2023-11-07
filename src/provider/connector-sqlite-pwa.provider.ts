import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ConnectorSqlitePwaProvider {
    result: any;
    userToken: any;

    public endpointServer = 'http://localhost:1255'
    public instanceDbServerName = 'sqlite';

    constructor(private httpCliente: HttpClient) {
    }

    /** Atualiza versao */
    async updateApp() {
        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.get(`${this.endpointServer}/api/updateApp`, {
                    params: { isHeader: 'no' },
                    headers: options.append("x-access-token", this.userToken)
                }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 28 ~ updateApp ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(() => {
        });
    }

    /** Retorna a url da imagem ou imagem padrao quando nao encontra
     * @param file
     * @param path
     * @param userIdentify
     * @returns
     */
    async getUrlImg(userIdentify: any, path: any, file: any): Promise<string> {
        return `${this.endpointServer}/api/files/getImg?img=arquivos_${userIdentify}/${path}/${file}`;
    }

    /**
     * Envia para o BackEnd informações para salvar as imagens localmente
     * @param folderName
     * @param fileName
     * @param selectedFile
     * @param isPrincipal
     * @param userIdentify
     * @returns
     */
    async arquivoImg(folderName: string, fileName: string, selectedFile: any, isPrincipal: boolean, userIdentify: string) {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${this.endpointServer}/api/files/saveImg`, {
                    params: { isHeader: 'no' },
                    folderName, fileName, selectedFile, isPrincipal, userIdentify,
                }, { headers: options.append("x-access-token", this.userToken) }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 64 ~ arquivoImg ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });

    }

    /**
     * Envia para o BackEnd informações para salvar as imagens localmente
     * @param folderName
     * @param fileName
     * @param selectedFile
     * @param operationType binary - utf8
     * @param userIdentify
     * @returns
     */
    async arquivoGeral(folderName: string, fileName: string, selectedFile: any, operationType: string, userIdentify: string) {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${this.endpointServer}/api/files/saveFile`, {
                    params: { isHeader: 'no' },
                    folderName, fileName, selectedFile, operationType, userIdentify,
                }, { headers: options.append("x-access-token", this.userToken) }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 98 ~ arquivoGeral ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });
    }

    /**
     * Pega a lista de arquivos disponiveis no servidor
     * @param url
     * @param endpoint
     * @param folderName
     * @returns
     */
    async getListArquivos(url?: string, endpoint?: string, folderName?: string) {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${url}/api/files/${endpoint}`, {
                    params: { isHeader: 'no' },
                    folderName
                }, { headers: options.append("x-access-token", this.userToken) }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 98 ~ arquivoGeral ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });
    }

    /**
     *  Envia para o BackEnd informações para salvar as imagens localmente
     * @param urlArquivo
     * @param fileName
     * @returns
     */
    async enviarUrlParaSalvar(urlArquivo: string, fileName: string) {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${this.endpointServer}/api/files/saveByUrl`, {
                    params: { isHeader: 'no' },
                    urlArquivo, fileName,
                }, { headers: options.append("x-access-token", this.userToken) }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 127 ~ enviarUrlParaSalvar ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });
    }

    /**
     *  Veririca se selectedFile existe
     * @param fileName
     * @returns
     */
    async checkFile(fileName: string) {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${this.endpointServer}/api/files/checkFile`, {
                    params: { isHeader: 'no' },
                    fileName,
                }, { headers: options.append("x-access-token", this.userToken) }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 127 ~ enviarUrlParaSalvar ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });
    }


    /**
     * Envia para o BackEnd informações para salvar as imagens localmente
     * @param filePath caminho da pasta
     * @param operationType - criarPasta - deletarPasta
     * @returns
     */
    async gerenciarPastas(filePath: string, operationType: string) {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${this.endpointServer}/api/files/updateFolder`, {
                    params: { isHeader: 'no' },
                    filePath, operationType,
                }, { headers: options.append("x-access-token", this.userToken) }).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 157 ~ gerenciarPastase ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });
    }

    /** Retorna a url da imagem ou imagem padrao quando nao encontra */
    async getUrlArquivoGeral(caminhoArquivo: any, userIdentify: any): Promise<string> {
        return `${this.endpointServer}/api/files/getFile?filePath=arquivos_${userIdentify}/${caminhoArquivo}`;
    }

    /** Retorna a url da imagem ou imagem padrao quando nao encontra */
    async getUrlArquivoGeralPath(endpointServidor: any, caminhoArquivo: any): Promise<string> {
        return `${endpointServidor}/api/files/getFile?filePath=${caminhoArquivo}`;
    }

    /**
     * Executa instruções dataSend
     * @param dataSend - Informacoes a ser enviada
     */
    async executePost(dataSend: any, dbForUse: string): Promise<any> {

        if (dataSend.length > 0 && dataSend !== null && dataSend !== undefined) {
            let novaString = String(dataSend);
            let existeInsert = novaString.toLowerCase().match('insert') || novaString.toLowerCase().match('create') || novaString.toLowerCase().match('alter') || false;

            if (existeInsert) {
                await this.sendToBackNodeJs(dataSend, 'insert', dbForUse);
            } else {
                await this.sendToBackNodeJs(dataSend, 'execute', dbForUse);
            }
        }

        return this.result;
    }

    async sendToBackNodeJs(dataSend: any, endpoint: string, dbForUse: string | null): Promise<any> {

        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.post(`${this.endpointServer}/api/executeDb/${endpoint}`, {
                    params: { isHeader: 'no' },
                    stringSql: dataSend, dbForUse: dbForUse, instanceDb: this.instanceDbServerName
                }, { headers: options.append("x-access-token", this.userToken) }
                ).subscribe(async (data) => {
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 205 ~ sendToBackNodeJs ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(res => {
            this.result = res;
        });
    }


    /**
   * Recuoerando selectedFile do servidor do tipo buffer
   * @param url
   * @param responseType - arraybuffer - blob
   * @returns buffer
   */
    async downloadFile(url: string, responseType: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                let options = new HttpHeaders();
                this.httpCliente.get(url, {
                    params: { isHeader: 'no' },
                    responseType: responseType,
                    headers: options.append("x-access-token", this.userToken)
                }).subscribe(async (data) => {
                    this.result = data;
                    resolve(data);
                }, async (err) => {
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 234 ~ downloadFile ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(() => {
        });
    }

    /** Atualiza versao */
    async authToken(userIdentify: any) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                let safeKey = "rit4lin4+dev-distr5c40";
                this.httpCliente.post(`${this.endpointServer}/authToken`, { params: { isHeader: 'no' }, userIdentify, safeKey }).subscribe(async (data) => {
                    this.userToken = `${data[0].token}`;
                    resolve(data);
                }, async (err) => {
                    /** Caso não consiga buscar a lista remota ira usar a lista de empresas local */
                    console.log('Erro:', err);
                    reject(err.error);
                });
            } catch (err) {
                // console.log("🚀 ~ file: connector.provider.ts ~ line 28 ~ authToken ~ err", err)
                reject(err.error);
            }
        });

        return promise.then(() => {
        });
    }
}
