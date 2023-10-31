import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'src/config/firebasedb';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
})
export class MetasPage implements OnInit {

  constructor(public router: Router,
    private rotaAtiva: ActivatedRoute) { }

  uid:any;

  listaMetas: any = [];

  async ngOnInit() {
    this.uid = this.rotaAtiva.snapshot.params['uid']

    const getMetas = await getDocs(collection(db, this.uid, 'metas', 'metas'))
    getMetas.forEach( async (doc) => {

      await this.atualizaMeta()

      const meta = doc.data()
      this.listaMetas.push(meta)
      console.log(meta)
    });
    
  }

  paginaCriaMeta(){
    this.router.navigate(['../criameta'])
  }

  paginaInicio(){
    this.router.navigate(['../inicio'])
  }

  atualizaMeta(){
    // const comparaMeta = 
  }

}
