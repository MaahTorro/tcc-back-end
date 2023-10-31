import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/config/firebasedb';

@Component({
  selector: 'app-atualizaprod',
  templateUrl: './atualizaprod.page.html',
  styleUrls: ['./atualizaprod.page.scss'],
})
export class AtualizaprodPage implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute,
    public router: Router) { }

  id:any;
  idp:any;

  produto: any = {
    nome: '',
    quantidade: '',
    validade: '',
    precoProduto: ''
  };

  

  async ngOnInit() {
    this.id = this.rotaAtiva.snapshot.params['id']
    this.idp = this.rotaAtiva.snapshot.params['idp']

    const achaproduto = await getDoc(doc(db, this.id, 'produtos', 'produtos', this.idp))
    console.log(achaproduto.data())
    this.produto = achaproduto.data()
     
  }

  editarProduto(){
    const update = updateDoc(doc(db, this.id, 'produtos', 'produtos', this.idp), {
      nome: this.produto.nome,
      precoProduto: this.produto.precoProduto,
      quantidade: this.produto.quantidade,
      validade: this.produto.validade,
      estoque: {
        status: 'azul',
        quantidademaxima: 10,
        quantidadeMinima: 5
      }
    })
    .then(() => {
      console.log('Produto alterado');
      this.router.navigate(['../listaprod'])
    })
  }

}
