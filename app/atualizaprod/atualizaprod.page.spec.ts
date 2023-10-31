import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizaprodPage } from './atualizaprod.page';

describe('AtualizaprodPage', () => {
  let component: AtualizaprodPage;
  let fixture: ComponentFixture<AtualizaprodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtualizaprodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
