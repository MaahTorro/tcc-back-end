import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { exibirToast } from 'src/config/alert';
import { db } from 'src/config/firebasedb';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute, public router: Router) { }

  uid:any;
  idp:any;

  produto:any;
  quantidade:any;
  preco:any;
  validade:any;
  descricao:any = '';
  precoProducao:any;

  listaItens: any = [];
  itemNome: any;
  itemPreco: any;

  async ngOnInit() {
    this.uid = this.rotaAtiva.snapshot.params['id']
    this.idp = this.rotaAtiva.snapshot.params['idp']

    const achaproduto = await getDoc(doc(db, this.uid, 'produtos', 'produtos', this.idp))
    this.produto = achaproduto.data()
    console.log(this.produto)

    this.quantidade = this.produto.quantidade
    this.preco = this.produto.precoProduto
    this.validade = this.produto.validade
    this.precoProducao = this.produto.precoProducao
  }



  public alertButtons =  [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: (value:any) => {
        this.adicionaItem(value)
      },
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Nome',
    },
    {
      type: 'number',
      placeholder: 'Preço'
    }
  ];

  adicionaItem(inputs:any, ){
    this.listaItens.push(
      {nome: inputs[0], preco: inputs[1]}
    )
    console.log(this.listaItens);
    this.precoProducao = this.produto.precoProducao;

    this.listaItens.forEach((item:any) => {
      const precoItem = parseInt(item.preco)
      this.precoProducao += precoItem   
    })
  }

  salvarInformacoes(){
    
    const autaliza = updateDoc(doc(db, this.uid, 'produtos', 'produtos', this.idp), {
      quantidade: this.quantidade,
      precoProducao: this.precoProducao,
      precoProduto: this.preco,
      validade: this.validade,
      descricao: this.descricao,
      itens: this.listaItens
    }).then(() => {
      exibirToast('Produto salvo', 3000, 'success', 'top')
      this.router.navigate(['../produtos/' + this.uid])
    }).catch(() => {
      exibirToast('Erro ao cadastrar o produto', 3000, 'danger', 'top')
    })
  }

}
