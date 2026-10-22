import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonAvatar, IonLabel, IonButton, IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { FavoritesService } from '../services/favorites.service';
import { Character } from '../character/models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon
  ]
})
export class Tab2Page implements OnInit {
  favoritesList: Character[] = [];

  constructor(public favService: FavoritesService) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.favService.favorites$.subscribe(list => {
      this.favoritesList = list;
    });
  }

  removeFavorite(character: Character) {
    this.favService.toggleFavorite(character);
  }
}