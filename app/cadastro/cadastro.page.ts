import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import auth, { database } from 'src/config/firebasedb';
import { exibirToast } from 'src/config/alert';
import { VerifyErroCode } from 'src/config/erros';
import { db } from '../../config/firebasedb';
import { collection, addDoc } from "firebase/firestore";
import { ref, set } from 'firebase/database';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(public router: Router) { }

  nome: any;
  nomeEmpresa: any;
  telefone: any;
  email:any;
  senha: any;
  confirmaSenha:any;

  ngOnInit() {
  }


  cadastrar(email:any, senha:any, confirmaSenha:any){
    if(senha === confirmaSenha){
      createUserWithEmailAndPassword(auth, email, senha )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('O id do usuario é: ', user.uid)
        this.router.navigate(['../cadastroprod/' + user.uid])

        this.addUsuario(this.nome, this.telefone, this.nomeEmpresa, user.uid)
      })
      .catch(async (error) =>{
        const errorCode = error.code;

        console.log(errorCode)

        const mensagemError = await VerifyErroCode(errorCode)

        exibirToast('Informações inválidas', 3000, 'danger', 'top')
      })
    }else{
      console.log('Senhas incorretas')
      exibirToast('Senhas não são iguais', 4000, 'danger', 'top')
    }
  }

  async addUsuario(nome:any, telefone:any, nomeEmpresa:any, uid:any){
    try {
      const docRef = await addDoc(collection(db, uid), {
        nome: nome, 
      nomeEmpresa:nomeEmpresa,
        numero: telefone,
        rendaM: '0',
        rendaS: '0',
        rendaD: '0',
        rendaTotal: 0
      });
      const addDatabase = await set(ref(database, 'users/' + uid), {
        name: nome
      })
      .then(() => {
        console.log('Documento escrito')
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
