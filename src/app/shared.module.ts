import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatIconModule,
  MatSelectModule,
  MatTabsModule,
  MatMenuModule,
  MatDatepickerModule,
  MatListModule,
  MatProgressBarModule,
} from "@angular/material";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    
    
  ],
  
  imports: [
    
  ],
  exports:[
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, MatFormFieldModule, MatSelectModule,
    MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule,
    MatPaginatorModule,  MatInputModule,  MatCardModule, MatTabsModule,
    MatButtonModule, MatCheckboxModule,MatIconModule, MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatListModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [
    
  ],
})
export class SharedModule { }