import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.css']
})
export class CalendarPopupComponent implements OnInit {

  @Input()
  details: CalendarPopupComponent[] | any;
  @Input() preventCancel: boolean = false;
  @Output() cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  displayedColumns: string[] = ['Machine Name', 'Doctor Name', 'Hospital', 'Staff', 'Time'];
  dataSource = new MatTableDataSource<CalendarPopupComponent>();


  constructor(private fb: FormBuilder,
    public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    console.log("details--------->>", this.details);
    this.dataSource = new MatTableDataSource<CalendarPopupComponent>(this.details);
    console.log("dataSource--------->>", this.dataSource.filteredData);

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

