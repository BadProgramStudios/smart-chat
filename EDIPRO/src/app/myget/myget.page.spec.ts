import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MygetPage } from './myget.page';

describe('MygetPage', () => {
  let component: MygetPage;
  let fixture: ComponentFixture<MygetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MygetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
