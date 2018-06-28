import {Directive, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {DragContentService} from './service/drag-content.service';

@Directive({
  selector: '[appDraggableTarget]'
})
export class DraggableTargetDirective {

  @Input() context: string = null;

  @Output() dropped = new EventEmitter();

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const dragContext = event.dataTransfer.getData('context'),
      dragContent = this.dragContentService.content;

    if (dragContext === this.context) {
      this.dropped.emit(dragContent);
    }

    this.dragContentService.content = null;
  }

  public constructor(
    private dragContentService: DragContentService
  ) {

  }
}
