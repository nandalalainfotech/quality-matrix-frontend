import {
  Component, EventEmitter,
  Input, OnInit, Output
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  @Input() details: any
  @Input() preventCancel: boolean = false;
  @Output() cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
    public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    console.log("details-------details-->>", this.details.data);
  }
  onCrossClick(event: any) {
    if (!this.preventCancel) {
      event.stopPropagation();
      this.activeModal.close('Cross click');
    } else {
      this.cancelClick.emit(true);
    }
  }
}
