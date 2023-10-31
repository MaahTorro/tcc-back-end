import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/config/firebasedb';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  constructor(public rotaAtiva: ActivatedRoute,
    public router: Router) { }

  uid:any;

  listaProdutos: any = [];

  topTresVendas: any = [];

  async ngOnInit() {
    this.uid = this.rotaAtiva.snapshot.params['uid']

    const produtos = await getDocs(collection(db, this.uid, 'produtos', 'produtos'))
    produtos.forEach((doc) => {
      const produto = doc.data()
      this.listaProdutos.push([doc.data(), doc.id])
    });

    console.log(this.listaProdutos);
    
    this.listaProdutos.forEach((doc:any) => {
      const produto = doc[0]
      this.topTresVendas.push([produto.venda, produto.nome, doc[1]])   
    });

    // Filtragem produtos mais vendidos
    this.topTresVendas.sort(function(a:any, b:any){
      if(a > b) return 1;
      if(a < b) return -1;

      return 0
    })

    console.log(this.topTresVendas);
  
  }

  paginaInicio(){
      this.router.navigate(['../inicio'])
  }

  async pagProduto(produto:any){     
    this.router.navigate(['../produto/' + this.uid + '/' + produto[1] ])
  }

  paginaMetas(){
    this.router.navigate(['../metas/' + this.uid])
  }

  paginaEstatisticas(){
    this.router.navigate(['../estatisticas'])
  }

  editarProduto(produto:any){
    this.router.navigate(['../atualizaprod/' + this.uid + '/' + produto.id])
  }

  paginaAjustes(){
    this.router.navigate(['../ajustes/'])
  }

  

}
