import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import * as fromActions from './dictionaries.actions';
type Action = fromActions.All