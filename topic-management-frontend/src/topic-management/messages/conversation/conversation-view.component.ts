import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

@Component({
  selector: 'conversation-view',
  template: `
    <div class="conversation-view-wrapper">
      <div class="conversation-list-wrapper">
        <conversation-list class="conversation-list"></conversation-list>
      </div>
      <div class="message-list-wrapper">
        <message-list class="message-list"></message-list>
      </div>
    </div>
  `,
  styleUrls: ['conversation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationViewComponent {

}
