import { db } from 'src/config/firebasedb';
import auth from 'src/config/firebasedb';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { exibirToast } from 'src/config/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listaprod',
  templateUrl: './listaprod.page.html',
  styleUrls: ['./listaprod.page.scss'],
})



export class ListaprodPage implements OnInit, OnChanges {



  
  constructor(public router: Router) {
  }
  



  uid:any;

  listaProdutos: any = [];

  ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        this.uid = user.uid

        const querySnapshot = await getDocs(collection(db, this.uid, 'produtos', 'produtos'));
        querySnapshot.forEach((doc) => {

          const produto = doc.data()

          this.listaProdutos.push(
            {
              nome: produto['nome'],
              quantidade: produto['quantidade'],
              validade: produto['validade'],
              precoProduto: produto['precoProduto'],
              id: doc.id
            }            
          )
        })

        console.log(this.listaProdutos)
        
      }
    })

  }

  ngOnChanges()  {
      
  }

  async excluirProduto(produto: any){
  
    const deletar = await deleteDoc(doc(db, this.uid, 'produtos', 'produtos', produto.id))
    .then(() => {
      exibirToast('Produto excluído', 6000, 'success', 'top')
      for(let i = 0; i <= this.listaProdutos.length; i++){
        if(this.listaProdutos[i] == produto){
          this.listaProdutos.splice(i, 1)
          console.log('Produto deletado');
          
        }
      }
    })
  }

  editarProduto(produto:any){
    this.router.navigate(['../atualizaprod/' + this.uid + '/' + produto.id])
  }



}


