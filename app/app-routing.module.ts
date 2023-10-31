import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastroprod/:id',
    loadChildren: () => import('./cadastroprod/cadastroprod.module').then( m => m.CadastroprodPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'listaprod',
    loadChildren: () => import('./listaprod/listaprod.module').then( m => m.ListaprodPageModule)
  },
  {
    path: 'atualizaprod/:id/:idp',
    loadChildren: () => import('./atualizaprod/atualizaprod.module').then( m => m.AtualizaprodPageModule)
  },
  {
    path: 'produtos/:uid',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'produto/:id/:idp',
    loadChildren: () => import('./produto/produto.module').then( m => m.ProdutoPageModule)
  },
  {
    path: 'estatisticas',
    loadChildren: () => import('./estatisticas/estatisticas.module').then( m => m.EstatisticasPageModule)
  },
  {
    path: 'criameta',
    loadChildren: () => import('./criameta/criameta.module').then( m => m.CriametaPageModule)
  },
  {
    path: 'metas/:uid',
    loadChildren: () => import('./metas/metas.module').then( m => m.MetasPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'lembretes',
    loadChildren: () => import('./lembretes/lembretes.module').then( m => m.LembretesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
