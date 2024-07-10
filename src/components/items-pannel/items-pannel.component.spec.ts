import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPannelComponent } from './items-pannel.component';

describe('ItemsPannelComponent', () => {
  let component: ItemsPannelComponent;
  let fixture: ComponentFixture<ItemsPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsPannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
