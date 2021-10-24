import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {LoginService} from "../login/login.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  totalRecords: number;
  page: number = 1;
  users: User[];
  isAdmin: boolean = false;

  constructor(private userService : UserService, private loginService : LoginService, private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isAdmin = this.loginService.hasAuthority('admin');
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data : User[]) => {
      this.users = data;
    }, (error) => {
      console.log(error);
    });
  }

  editUser(id:number) {
    this.router.navigateByUrl('menu/edit-user/'+id);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(()=>{
        this.toastrService.success("Utilisateur supprimé avec succès", "Suppression Utilisateur");
        this.getAllUsers();
      },(error)=>{
        this.toastrService.error("Erreur lors de la suppression de l'utilisateur", "Erreur");
      })
  }

  addUser() {
    this.router.navigateByUrl('menu/add-user');
  }

  unlockUser(user: User) {
    this.userService.unlockUser(user)
      .subscribe(()=>{
        this.toastrService.info("Utilisateur débloqué avec succès", "Debloquer utilisateur");
        this.getAllUsers();
      },(error)=>{
        this.toastrService.error("Erreur lors du déblocage de l'utilisateur", "Erreur");
      })
  }

  blockUser(user: User) {
    this.userService.blockUser(user)
      .subscribe(()=>{
        this.toastrService.info("Utilisateur bloqué avec succès", "Bloquer utilisateur");
        this.getAllUsers();
      },(error)=>{
        this.toastrService.error("Erreur lors du blocage de l'utilisateur", "Erreur");
      })
  }
}
