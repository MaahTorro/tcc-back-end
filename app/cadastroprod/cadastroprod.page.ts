
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { db } from "../../config/firebasedb";
import { collection, addDoc, getDocs, doc, getDoc, getDocFromCache  } from "firebase/firestore";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { exibirToast } from "src/config/alert";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-cadastroprod",
  templateUrl: "./cadastroprod.page.html",
  styleUrls: ["./cadastroprod.page.scss"],
})

export class CadastroprodPage implements OnInit  {

  constructor(public router: Router,
    private rotaAtiva: ActivatedRoute) {}

  nome: any;
  quantidade: any;
  validade: any;
  precoProduto: any;

  uid: any;

  idProdutos: any = [];

  listaProdutos: any = [];

  async ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        console.log(this.uid);
      }
    });    

  }

  cadastroProduto(
    nome: any,
    quantidade: any,
    validade: any,
    precoProduto: any
  ) {
    console.log(nome, quantidade, validade, precoProduto);

    const date = new Date()

    const produto = {
      nome: nome,
      quantidade: quantidade,
      validade: validade,
      precoProduto: precoProduto,
      venda: 0,
      ultimaVenda: {
        dia: date.getDate(),
        mes: date.getMonth(),
        ano: date.getFullYear()
      },
      estoque:{
        status: 'azul',
        quantidadeMinima:5,
        quantidademaxima:10
      },
      descricao: '',
      precoProducao: 0,
      itens: []
    };

    try {
      const docRef = addDoc(
        collection(db, this.uid, "produtos", 'produtos'),
        produto
      )
      exibirToast('Produto cadastrado', 3000, 'success', 'top')
      console.log("Produto cadastrado");

    } catch (e) {
      console.log(e);
      exibirToast('Preciso colocar todas as informações', 4000, 'danger', 'top')
    }

    this.nome = '';
    this.quantidade = '';
    this.validade = '';
    this.precoProduto = '';

  }

  pagListaProd(){
    this.router.navigate(['../listaprod'])
  }

  idp = this.rotaAtiva.snapshot.params['idp'];
  

}
