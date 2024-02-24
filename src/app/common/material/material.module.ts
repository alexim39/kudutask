import { NgModule } from '@angular/core'; import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list'; import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; import {MatMenuModule} from '@angular/material/menu'; 
import {MatButtonModule} from '@angular/material/button'; import {MatCardModule} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input'; import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox'; import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav'; import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree'; import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio'; import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'; import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'; import {MatSortModule} from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips'; import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion'; import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip'; import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs'; import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar'; import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";


const m = [
  MatSliderModule, MatProgressBarModule,
  MatGridListModule, MatToolbarModule,
  MatIconModule, MatMenuModule,
  MatButtonModule, MatCardModule,
  MatInputModule, MatSnackBarModule,
  MatCheckboxModule, LayoutModule,
  MatSidenavModule, MatListModule,
  MatTreeModule, MatRadioModule,
  MatDialogModule, MatDatepickerModule,
  MatNativeDateModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatChipsModule, MatAutocompleteModule,
  MatExpansionModule, MatSlideToggleModule,
  MatTooltipModule, MatRippleModule,
  MatTabsModule, MatStepperModule,
  MatBadgeModule, MatSelectModule,
  MatFormFieldModule
]
@NgModule({ imports: [m], exports: [m] })
export class MaterialModule { }
