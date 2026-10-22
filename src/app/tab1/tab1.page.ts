import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
  IonList, IonItem, IonAvatar, IonLabel, IonInfiniteScroll, 
  IonInfiniteScrollContent, IonSpinner, IonButton, IonIcon, IonBadge 
} from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { star, starOutline, reloadOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';
import { Character } from '../character/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonSearchbar, IonList, IonItem, IonAvatar, IonLabel, IonInfiniteScroll, 
    IonInfiniteScrollContent, IonSpinner, IonButton, IonIcon, IonBadge
  ]
})
export class Tab1Page implements OnInit {
  characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  
  isLoading: boolean = false;
  hasError: boolean = false;
  favorites: number[] = [];

  constructor(private apiService: ApiService) {
    addIcons({ star, starOutline, reloadOutline });
  }

  async ngOnInit() {
    await this.loadFavorites();
    this.loadData();
  }

  // R1 y R5: Carga de datos con manejo de estados
  loadData(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.hasError = false;

    this.apiService.getCharacters(this.currentPage, this.searchTerm).subscribe({
      next: (response) => {
        this.totalPages = response.info.pages;
        // R2: Anexar los datos sin duplicar
        this.characters = [...this.characters, ...response.results];
        this.isLoading = false;

        if (event) {
          event.target.complete();
          if (this.currentPage >= this.totalPages) {
            event.target.disabled = true; // Deshabilita infinite scroll al finalizar registros
          }
        }
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  // R2: Evento para infinite scroll
  loadMore(event: any) {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadData(event);
    } else {
      event.target.disabled = true;
    }
  }

  // R3: Búsqueda y reinicio de estado y paginación
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.currentPage = 1;
    this.characters = [];
    this.loadData();
  }

  // R6: Cargar y alternar favoritos con Capacitor Preferences
  async loadFavorites() {
    const { value } = await Preferences.get({ key: 'favorites' });
    this.favorites = value ? JSON.parse(value) : [];
  }

  async toggleFavorite(characterId: number, event: Event) {
    event.stopPropagation();
    if (this.isFavorite(characterId)) {
      this.favorites = this.favorites.filter(id => id !== characterId);
    } else {
      this.favorites.push(characterId);
    }
    await Preferences.set({ key: 'favorites', value: JSON.stringify(this.favorites) });
  }

  isFavorite(characterId: number): boolean {
    return this.favorites.includes(characterId);
  }
}