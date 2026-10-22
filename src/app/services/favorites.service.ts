import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../character/models';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private STORAGE_KEY = 'rick_favorites';
  private favoritesSubject = new BehaviorSubject<Character[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    const favorites: Character[] = value ? JSON.parse(value) : [];
    this.favoritesSubject.next(favorites);
  }

  async toggleFavorite(character: Character) {
    let current = this.favoritesSubject.value;
    const exists = current.some(fav => fav.id === character.id);

    if (exists) {
      current = current.filter(fav => fav.id !== character.id);
    } else {
      current.push(character);
    }

    this.favoritesSubject.next(current);
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(current)
    });
  }

  isFavorite(characterId: number): boolean {
    return this.favoritesSubject.value.some(fav => fav.id === characterId);
  }
}