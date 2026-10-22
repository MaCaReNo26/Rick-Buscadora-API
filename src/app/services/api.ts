import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Character } from '../character/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  // R1, R2 y R3: Obtiene los personajes con soporte de paginación y filtro por nombre
  getCharacters(page: number = 1, name: string = ''): Observable<ApiResponse> {
    const url = `${this.baseUrl}/?page=${page}&name=${encodeURIComponent(name)}`;
    return this.http.get<ApiResponse>(url);
  }

  // R4: Obtiene el detalle de un personaje por ID
  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`);
  }
}