import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroprodPage } from './cadastroprod.page';

describe('CadastroprodPage', () => {
  let component: CadastroprodPage;
  let fixture: ComponentFixture<CadastroprodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroprodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
