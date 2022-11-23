import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
} from '@angular/core';
import { defineCustomElement, ProxyCmp } from './angular-component-lib/utils';
import { NotificationCenterWebComponent } from '@novu/notification-center';

@ProxyCmp({
  defineCustomElementFn: () => {
    defineCustomElement('notification-center-component', NotificationCenterWebComponent);
  },
  inputs: [
    'stores',
    'backendUrl',
    'socketUrl',
    'subscriberId',
    'applicationIdentifier',
    'onLoad',
    'subscriberHash',
    'i18n',
    'colorScheme',
  ],
})
@Component({
  selector: 'notification-center-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content> `,
  inputs: [
    'stores',
    'backendUrl',
    'socketUrl',
    'subscriberId',
    'applicationIdentifier',
    'onLoad',
    'subscriberHash',
    'i18n',
    'colorScheme',
  ],
})
export class NotificationCenterComponent implements AfterContentInit {
  protected el: any;
  constructor(changeDetector: ChangeDetectorRef, elRef: ElementRef, protected z: NgZone) {
    this.el = elRef.nativeElement;
  }

  ngAfterContentInit() {
    this.z.runOutsideAngular(() => {
      this.el.initialized = true;
    });
  }
}
