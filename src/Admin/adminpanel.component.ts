import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'admin-panel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'], // Corrección del nombre de la propiedad
  providers: [ConfirmationService, MessageService],
})
export class AdminPanel implements OnInit {
  autores: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    
  }

  
}
