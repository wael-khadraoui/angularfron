import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {CameraComponent} from "./camera/camera.component";
import {CaptureComponent} from "./capture/capture.component";
import {AffichageComponent} from "./affichage/affichage.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ListeUser', component: ListUserComponent },
  { path: 'AddUser', component: AddUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'capture', component: CaptureComponent },
  { path: 'affichage', component: AffichageComponent },










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
