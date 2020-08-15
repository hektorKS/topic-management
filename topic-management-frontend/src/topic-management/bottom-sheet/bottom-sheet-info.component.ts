import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {ReplaySubject, Subject} from "rxjs";

export interface BottomSheetInfoData {
  text: string;
}

@Component({
  selector: 'bottom-sheet-info',
  template: `
    <div *ngIf="data$ | async; let data" class="bottom-sheet-info-wrapper">
      <span>{{ data.text }}</span>
    </div>
  `,
  styleUrls: [
    'bottom-sheet-info.component.scss'
  ]
})
export class BottomSheetInfoComponent implements OnInit, OnDestroy {

  data$: Subject<BottomSheetInfoData> = new ReplaySubject(1);

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: BottomSheetInfoData) {
  }

  ngOnInit(): void {
    this.data$.next(this.data);
  }

  ngOnDestroy(): void {
    this.data$.complete();
  }

}
