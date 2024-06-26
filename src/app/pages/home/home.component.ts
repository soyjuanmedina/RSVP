import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { testTexts } from './conf/test-text';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadService } from '../../services/read.service';
import { ExtensionService } from '../../services/extension.service';
import { ReadConfigComponent } from '../../components/read-config/read-config.component';
import { TestText } from '../../services/models/test-text';
import { SelectionModalComponent } from '../../components/selection-modal/selection-modal.component';

@Component( {
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReadConfigComponent,
    ReactiveFormsModule, CommonModule, SelectionModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
} )
export class HomeComponent {

  form: FormGroup = new FormGroup( {
    textToRead: new FormControl( '' ),
  } );

  testTexts: TestText[] = testTexts;

  alert?: string;

  constructor ( public router: Router, private activatedRoute: ActivatedRoute, public readService: ReadService, public extensionService: ExtensionService ) {

    this.activatedRoute.queryParams.subscribe( params => {
      if ( params['selectionText'] ) {
        this.readService.textToRead = params['selectionText']
      }
      if ( params['error'] ) {
        this.alert = "Límite 6000 caracteres, al finalizar podrás cargar el resto del texto."
      }
    } );
    if ( this.readService.textToRead ) {
      this.form.controls['textToRead'].setValue( this.readService.textToRead );
    }
  }

  read () {
    this.readService.textToRead = this.form.controls['textToRead'].value;
    this.router.navigate( ['/read'], { skipLocationChange: true } );
  }

  loadTestText ( index: number ) {
    this.form.controls['textToRead'].setValue( testTexts[index].title + ', de ' + testTexts[index].author + '.' + testTexts[index].text )
  }

  readTest ( index: number ) {
    this.readService.testText = testTexts[index];
    this.router.navigate( ['/read-test'], { skipLocationChange: true } );
  }


}