import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragContentService {
  public content: any = null;
}
