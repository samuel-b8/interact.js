/* eslint-disable import/no-duplicates -- for typescript module augmentations */
import './base';
import './dragAxis';
import './hold';
import autoStart from './base';
import dragAxis from './dragAxis';
import hold from './hold';
/* eslint-enable import/no-duplicates */

export default {
  id: 'auto-start',
  install(scope) {
    scope.usePlugin(autoStart);
    scope.usePlugin(hold);
    scope.usePlugin(dragAxis);
  }
};
//# sourceMappingURL=plugin.js.map