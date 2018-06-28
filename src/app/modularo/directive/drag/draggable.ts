import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {DragContentService} from './service/drag-content.service';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  @Input() content: any = null;
  @Input() context: string = null;

  @Output() dragStarted = new EventEmitter();

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    this.dragContentService.content = this.content;

    this.dragStarted.emit(this.content);

    event.dataTransfer.setData('context', this.context);
  }

  public constructor(
    private dragContentService: DragContentService
  ) {

  }
}
