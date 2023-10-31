import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriametaPage } from './criameta.page';

describe('CriametaPage', () => {
  let component: CriametaPage;
  let fixture: ComponentFixture<CriametaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriametaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
