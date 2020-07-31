import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'school',
  template: `
    {{ 'This is school view' }}
  `,
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolComponent {

}
