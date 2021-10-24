import { OyasData } from './../register/model/OyasData';
import { UserInfo } from './../register/model/UserInfo';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { MessageService } from './message-service.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  public ChartLabels = ["Niveau d'eau"];
  public ChartLabels1 = ["Niveau de batterie"];

  public donutColors1 = [
    {
      backgroundColor: [
        'rgb(138, 211, 253)',
        'rgb(253, 253, 249)',
        'rgb(255, 255, 255)',
        'rgba(0, 148, 97, 1)',
        'rgba(129, 78, 40, 1)',
        'rgba(129, 199, 111, 1)'
      ]
    }
  ];


  public donutColors = [
    {
      backgroundColor: [
        'rgba(19, 90, 2 )',
        'rgba(243, 238, 201)',
        'rgb(138, 211, 253)',
        'rgb(255, 255, 255)',
        'rgba(0, 148, 97, 1)',

        'rgba(129, 199, 111, 1)'
      ]
    }
  ];
  max = 90;
  min = 80;
  battMax = 98;
  battMin = 92;
  rainData = [
    [70, 30]
  ];

  batPercent = 99;
  rainPercent = 90;



  battData = [
    [98, 2]
  ];

  rMess = 0;
  bMess = 0;


  rainAlertMessage = "";
  battAlertMessage = "";
  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.getData().subscribe((data: OyasData) => {

      // console.log(data);

      // let oData: OyasData = JSON.parse(data);
      this.getRainData(data.rainData);
      this.getBattData(data.battData);
    }, (error) => {
    }, () => {

    }
    );
    this.refresh();
  }

  refresh() {
    setInterval(() => {
      this.messageService.getData().subscribe((data: OyasData) => {

        // console.log(data);

        // let oData: OyasData = JSON.parse(data);
        this.getRainData(data.rainData);
        this.getBattData(data.battData);
      }, (error) => {
      }, () => {

      }
      );

    },
      10000);

    setInterval(() => {
      this.changeValue();

    },
      500000);
    setInterval(() => {
      this.reinit();
    },
      7000000);
  }

  getRainData(a) {
    // console.log(Math.floor(Math.random() * (this.max - this.min + 1)) + this.min);
    //  a = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    this.rainData = [[a, 100 - a]];
    this.rainPercent = a;
    if (this.rainPercent < 5) {

      if (this.rMess == 0) {
        this.rMess = 1
      }
      if (this.rMess == 1) {
        let user: UserInfo = JSON.parse(localStorage.getItem("token"));
        this.messageService.sendMessage("rain", user.email).subscribe(data => {
          alert("Message d'Alerte Envoyé");
        }
        );
        this.rMess = 2;
      }
      this.rainAlertMessage = "Niveau d'eau critique";
    } else {
      this.rainAlertMessage = "";
    }
  }

  getBattData(a) {
    // let a = Math.floor(Math.random() * (this.battMax - this.battMin + 1)) + this.battMin;
    console.log("ahahahha  " + a)
    this.battData = [[a, 100 - a]];
    this.batPercent = a;


    if (this.batPercent < 20) {
      this.battAlertMessage = "Niveau de batterie critique";


      if (this.bMess == 0) {
        this.bMess = 1
      }
      if (this.bMess == 1) {
        let user: UserInfo = JSON.parse(localStorage.getItem("token"));
        this.messageService.sendMessage("batt", user.email).subscribe(data => {
          alert("Message d'Alerte Envoyé");
        }, (error) => {
        }, () => {

        }
        );
        this.bMess = 2;
      }

    } else {
      this.battAlertMessage = "";
    }
  }

  changeValue() {

  }
  reinit() {

  }
}
