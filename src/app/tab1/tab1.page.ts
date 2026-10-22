import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
  IonList, IonItem, IonAvatar, IonLabel, IonInfiniteScroll, 
  IonInfiniteScrollContent, IonSpinner, IonButton, IonIcon, IonBadge 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { star, starOutline, reloadOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';
import { FavoritesService } from '../services/favorites.service';
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
  @ViewChild(IonInfiniteScroll) infiniteScroll?: IonInfiniteScroll;

  characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(
    private apiService: ApiService,
    public favService: FavoritesService
  ) {
    addIcons({ star, starOutline, reloadOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.hasError = false;

    this.apiService.getCharacters(this.currentPage, this.searchTerm).subscribe({
      next: (response) => {
        this.totalPages = response.info.pages;
        this.characters = [...this.characters, ...response.results];
        this.isLoading = false;

        if (event) {
          event.target.complete();
          if (this.currentPage >= this.totalPages) {
            event.target.disabled = true;
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status !== 404) {
          this.hasError = true;
        }
        if (event) {
          event.target.complete();
          event.target.disabled = true;
        }
      }
    });
  }

  loadMore(event: any) {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadData(event);
    } else {
      event.target.complete();
      event.target.disabled = true;
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value ? event.detail.value.trim() : '';
    this.currentPage = 1;
    this.characters = [];
    this.isLoading = false;

    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    this.loadData();
  }

  toggleFavorite(character: Character, event: Event) {
    event.stopPropagation();
    this.favService.toggleFavorite(character);
  }
}