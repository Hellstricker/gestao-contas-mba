import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TransacaoFiltroModel, TransacaoModel, TransacaoResponseModel } from '@front/data';
import { environment } from '../configuration';

@Injectable()
export class TransacaoService {

  constructor(
    private httpCliente: HttpClient
  ) { }


  get(): Observable<TransacaoResponseModel[]> {
    return this.httpCliente.get<TransacaoResponseModel[]>(`${environment.apiBase}/transacoes`);
  }

  getByFilters(busca: TransacaoFiltroModel): Observable<TransacaoResponseModel[]> {
    let dataInicial = null;
    let dataFinal = null;
    if (busca.dataInicial != null) {
      dataInicial =`${busca.dataInicial.getFullYear()}-${busca.dataInicial.getMonth()}-${busca.dataInicial.getDay()}`;    
    }
    if (busca.dataFinal != null) {
      dataFinal =`${busca.dataFinal.getFullYear()}-${busca.dataFinal.getMonth()}-${busca.dataFinal.getDay()}`;    
    }    
    return this.httpCliente.get<TransacaoResponseModel[]>(`${environment.apiBase}/transacoes/filtro/?dataInicial=${dataInicial}&dataFinal=${dataFinal}&categoriaId=${busca.categoriaId}&tipo=${busca.tipo}`);
  }

  getById(transacoId: any): Observable<TransacaoResponseModel> {
    return this.httpCliente.get<TransacaoResponseModel>(`${environment.apiBase}/transacoes/${transacoId}`);
  }

  post(transacao: TransacaoModel): Observable<TransacaoResponseModel> {
    return this.httpCliente.post<TransacaoResponseModel>(`${environment.apiBase}/transacoes`, transacao);
  }

  put(transacoId: any, transacao: TransacaoModel): Observable<TransacaoResponseModel> {
    return this.httpCliente.put<TransacaoResponseModel>(`${environment.apiBase}/transacoes/${transacoId}`, transacao);
  }

  delete(transacoId: any): Observable<TransacaoResponseModel> {
    return this.httpCliente.delete<TransacaoResponseModel>(`${environment.apiBase}/transacoes/${transacoId}`);
  }
}
