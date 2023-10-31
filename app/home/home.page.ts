import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../config/firebasedb'
import { Router } from '@angular/router';
import { VerifyErroCode } from 'src/config/erros';
import { exibirToast } from 'src/config/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public router: Router) {}

  email: any;
  senha: any;

  login(email: any, senha:any){
    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) =>{
        const user = userCredential.user
        this.router.navigate(['../inicio'])
    })
    .catch((error) =>{
      const errorCode = error.code;
      const erroMensagm = VerifyErroCode(errorCode)
      exibirToast('Informações inválidas', 3000, 'danger', 'top')
    })
  }

  async ngOnInit() {
      await onAuthStateChanged(auth, async(user) => {
        if(user){
          this.router.navigate(['../inicio'])
        }else{
          console.log('Nenhum user encontrado');
          
        }
        
      })
  }

}
