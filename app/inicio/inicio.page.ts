import { Component, OnChanges, OnInit } from "@angular/core";
import auth, { database } from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "src/config/firebasedb";
import { exibirToast } from "src/config/alert";
import { push, ref, set } from "firebase/database";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  constructor() { }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  uid:any;
  user: any;
  id: any;

  nome: any;
  rendaM: any;
  rendaS: any;
  rendaD: any;
  rendaTotal: any;

  listaProdutos: any = [];
  idProdutos: any = [];

  vendaTotal: any = 0;
  contaGrafico: any = [];
  porcentagens: any = [];

  grafico: any;
  porcentagem2: any;
  porcentagem3: any;
  porcentagem4: any;

  diasTrabalhados: any;

  async ngOnInit() {

    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        this.uid = user.uid;
        console.log('id do usuario :' + this.uid);

        const querySnapshot = await getDocs(collection(db, this.uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc);

          this.user = doc.data()
          this.id = doc.id

          this.nome = this.user['nome']
          this.rendaM = this.user['rendaM']
          this.rendaS = this.user['rendaS']
          this.rendaD = this.user['rendaD']

          this.rendaTotal = this.user['rendaTotal']

        });

        const produtos = await getDocs(collection(db, this.uid, 'produtos', 'produtos'))
        produtos.forEach((doc) => {
          const produto = doc.data()
          if(this.listaProdutos.length <= 3){
            this.listaProdutos.push([produto, doc.id])
          } 

          this.graficoProdutos()
          // Mostra os Id e os Produtos 
          // console.log(this.listaProdutos)
        })

      }

    });

    this.grafico = 'background: conic-gradient( #1765DB 0%  100%);'

  }

  async vender(produto:any){

    const id = produto[1]
    const Ref = ref(database, 'users/' + this.uid + '/vendas/' + produto[1] )
    const Push = push(Ref)

    await this.rendas(produto[1])

    // Pega o preço do produto
    const precoProduto = parseInt(produto[0].precoProduto) 

    this.rendaM = parseInt(this.rendaM) + precoProduto
    this.rendaD = parseInt(this.rendaD) + precoProduto
    this.rendaS = parseInt(this.rendaS) + precoProduto

    // Adiocina as rendas 
    const updateRenda = updateDoc(doc(db, this.uid, this.id), {
      rendaD: this.rendaD,
      rendaS: this.rendaS,
      rendaM: this.rendaM, 
      rendaTotal: this.rendaD + this.rendaTotal  
    }).then(() => {
      exibirToast('Produto vendido', 2000, 'success', 'top')
      //console.log(this.rendaD, this.rendaM, this.rendaS);
      
    })

    // Data de hoje
    const date = new Date()
    console.log("dia de hj: " + date.getDate())

    // Adiciona a data da última venda
    const updateVenda = updateDoc(doc(db, this.uid, 'produtos', 'produtos', produto[1],), {
      venda: produto[0].venda + 1,
      quantidade: produto[0].quantidade - 1,
      ultimaVenda: {
        dia: date.getDate(),
        mes: date.getMonth(),
        ano: date.getFullYear()
      }
    }).then(() => {
      produto[0].venda += 1
      produto[0].quantidade -= 1
      this.graficoProdutos()
      this.atualizaEstatus(produto[1], produto[0])
    })

    const apdateUltimaDia = updateDoc(doc(db, this.uid, this.id), {
      ultimoDia: {
        dia: date.getDate(),
        mes: date.getMonth(),
        ano: date.getFullYear()
      }
    })

    const gravarVenda = await set(Push, {
      produto: produto[0].nome,
      preco: produto[0].precoProduto,
      dia: date.getDate(),
      mes: date.getMonth(),
      ano: date.getFullYear()
    })

  }

  graficoProdutos(){

    this.vendaTotal = 0
    this.contaGrafico = [];
    this.porcentagens = [];

    this.listaProdutos.forEach((produto:any) => {
      this.vendaTotal += produto[0].venda

      const conta = (produto[0].venda * 100)
      this.contaGrafico.push(conta)

      // Mostra quantidade de vendas por produto
      // console.log('Preço produto: ' + produto[0]?.venda);
    });

    this.contaGrafico.forEach((porcentagem: any) => {
      const conta = porcentagem / this.vendaTotal
      this.porcentagens.push(conta)

      // Porcentagens de cada Produto
      // console.log(conta + '%')
    })

    // Filtragem produtos mais vendidos
    // this.porcentagens.sort((a: any, b: any) => b - a)

    // console.log('Venda total: ' + this.vendaTotal);
    
    // console.log(this.porcentagens)

    if(this.porcentagens.length >= 4){

      this.porcentagem2 = this.porcentagens[0] + this.porcentagens[1]
      this.porcentagem3 = this.porcentagem2 + this.porcentagens[2]
      this.porcentagem4 = this.porcentagem3 + this.porcentagens[3]

      this.grafico = 'background: conic-gradient( #7DE8FF 0% ' + this.porcentagens[0] + '%' + ' , #39A0FF ' + this.porcentagens[0] + '% ' + this.porcentagem2 + '%, #27CBFF' + this.porcentagem2 + '% ' + this.porcentagem3 + '% , #2717DB ' + this.porcentagem3 + '% 100%);'
    }
    
  }

  async rendas(idProduto: any){

    const date = new Date()

    const rendas = await getDoc(doc(db, this.uid, this.id))
    const user = rendas.data()
    const ultimoDia = user?.['ultimoDia']
    
    if(date.getDate() != ultimoDia?.dia){
      console.log('Dia diferente')
      this.rendaD = 0
      updateDoc(doc(db, this.uid, this.id), {
        rendaD: 0
      })
    }

    if(date.getMonth() != ultimoDia?.mes){
      console.log('Outro mês');
      this.rendaM = 0
      updateDoc(doc(db, this.uid, this.id), {
        rendaM: 0
      })
    }
  }

  async atualizaEstatus(idProduto:any, Produto:any){
    const getproduto = await getDoc(doc(db, this.uid, 'produtos', 'produtos', idProduto))
    const produto = getproduto.data()
    const estoque = produto?.['estoque']
    const status = estoque.status    

    if(produto?.['quantidade'] >= estoque?.['quantidademaxima']){
      updateDoc(doc(db, this.uid, 'produtos', 'produtos', idProduto), {
        estoque: {
          status: 'azul',
          quantidadeMinima: estoque?.['quantidadeMinima'],
          quantidademaxima: estoque?.['quantidademaxima']
        }
      }).then(() => {
        Produto.estoque.status = 'azul'
      })
    }

    if(produto?.['quantidade'] <= estoque?.['quantidadeMinima']){
      updateDoc(doc(db, this.uid, 'produtos', 'produtos', idProduto), {
        estoque: {
          status: 'vermelho',
          quantidadeMinima: estoque?.['quantidadeMinima'],
          quantidademaxima: estoque?.['quantidademaxima']
        }
      }).then(() => {
        Produto.estoque.status = 'vermelho'
      })
    }

    if(produto?.['quantidade'] > estoque?.['quantidadeMinima'] 
    && produto?.['quantidade'] <= estoque?.['quantidadeMinima'] + 1){
      updateDoc(doc(db, this.uid, 'produtos', 'produtos', idProduto), {
        estoque: {
          status: 'amarelo',
          quantidadeMinima: estoque?.['quantidadeMinima'],
          quantidademaxima: estoque?.['quantidademaxima']
        }
      }).then(() => {
        Produto.estoque.status = 'amarelo'
      })
    }
  }

}
