import {Component, OnInit} from '@angular/core';
import {AddCapteur} from '../../add-capteur';

@Component({
  selector: 'app-add-capteur',
  templateUrl: './add-capteur.component.html',
  styleUrls: ['./add-capteur.component.css']
})
export class AddCapteurComponent implements OnInit {
  formGroup: any;
  AddCapteurService: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  addCap() {
    let addCapteur = new AddCapteur(this.formGroup.value.name);
    this.AddCapteurService.addCap(addCapteur);

  }

}
