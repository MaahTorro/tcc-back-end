import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaprodPage } from './listaprod.page';

describe('ListaprodPage', () => {
  let component: ListaprodPage;
  let fixture: ComponentFixture<ListaprodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaprodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
