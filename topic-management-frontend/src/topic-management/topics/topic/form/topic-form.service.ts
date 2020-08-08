import {Injectable} from "@angular/core";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Topic} from "../topic.model";
import {currentUserIdSelector, formTopicSelector} from "../../../topic-management-state";
import {filter, map, take, withLatestFrom} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {updateFormTopic} from "../../topics-actions";

@Injectable()
export class TopicFormService {

  private readonly formTopic$: Observable<Topic>;
  private readonly topicOwner$: Observable<boolean>;
  private topicFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    supervisor: new FormControl({id: undefined, firstName: '', lastName: '', username: ''}),
    students: new FormArray([]),
    newStudent: new FormControl({id: undefined, username: ''})
  });

  constructor(private store: Store) {
    this.formTopic$ = this.store.select(formTopicSelector).pipe(
      filter(topic => topic !== undefined)
    );
    this.topicOwner$ = this.store.select(currentUserIdSelector).pipe(
      withLatestFrom(this.formTopic$),
      map(([userId, topic]) => userId == topic.supervisor.id)
    );
    this.initForm();
  }

  private initForm(): void {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
      this.topicFormGroup.get('title').setValue(topic.title);
      this.topicFormGroup.get('description').setValue(topic.description);
      this.topicFormGroup.get('supervisor').setValue(topic.supervisor);
      this.topicFormGroup.get('newStudent').setValue({id: undefined, username: ''});
      this.topicFormGroup.markAsPristine();
    });
    this.topicFormGroup.valueChanges.subscribe(newValue => {
      this.store.dispatch(updateFormTopic({
        title: newValue.title,
        description: newValue.description
      }));
    })
  }

  getFormTopicObservable(): Observable<Topic> {
    return this.formTopic$;
  }

  getTopicOwnerObservable(): Observable<boolean> {
    return this.topicOwner$;
  }

  getTopicFormGroup(): FormGroup {
    return this.topicFormGroup;
  }

  isFormSubmitDisabled(): boolean {
    return this.topicFormGroup.pristine || !this.topicFormGroup.valid;
  }

}
