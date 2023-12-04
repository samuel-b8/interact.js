"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractEvent = void 0;
var _extend = _interopRequireDefault(require("../utils/extend.js"));
var _getOriginXY = _interopRequireDefault(require("../utils/getOriginXY.js"));
var _hypot = _interopRequireDefault(require("../utils/hypot.js"));
var _BaseEvent = require("./BaseEvent");
var _options = require("./options");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// defined outside of class definition to avoid assignment of undefined during
// construction

class InteractEvent extends _BaseEvent.BaseEvent {
  relatedTarget = null;
  screenX;
  screenY;
  button;
  buttons;
  ctrlKey;
  shiftKey;
  altKey;
  metaKey;
  page;
  client;
  delta;
  rect;
  x0;
  y0;
  t0;
  dt;
  duration;
  clientX0;
  clientY0;
  velocity;
  speed;
  swipe;
  // resize
  axes;
  /** @internal */
  preEnd;
  constructor(interaction, event, actionName, phase, element, preEnd, type) {
    super(interaction);
    element = element || interaction.element;
    const target = interaction.interactable;
    const deltaSource = (target && target.options || _options.defaults).deltaSource;
    const origin = (0, _getOriginXY.default)(target, element, actionName);
    const starting = phase === 'start';
    const ending = phase === 'end';
    const prevEvent = starting ? this : interaction.prevEvent;
    const coords = starting ? interaction.coords.start : ending ? {
      page: prevEvent.page,
      client: prevEvent.client,
      timeStamp: interaction.coords.cur.timeStamp
    } : interaction.coords.cur;
    this.page = (0, _extend.default)({}, coords.page);
    this.client = (0, _extend.default)({}, coords.client);
    this.rect = (0, _extend.default)({}, interaction.rect);
    this.timeStamp = coords.timeStamp;
    if (!ending) {
      this.page.x -= origin.x;
      this.page.y -= origin.y;
      this.client.x -= origin.x;
      this.client.y -= origin.y;
    }
    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
    this.metaKey = event.metaKey;
    this.button = event.button;
    this.buttons = event.buttons;
    this.target = element;
    this.currentTarget = element;
    this.preEnd = preEnd;
    this.type = type || actionName + (phase || '');
    this.interactable = target;
    this.t0 = starting ? interaction.pointers[interaction.pointers.length - 1].downTime : prevEvent.t0;
    this.x0 = interaction.coords.start.page.x - origin.x;
    this.y0 = interaction.coords.start.page.y - origin.y;
    this.clientX0 = interaction.coords.start.client.x - origin.x;
    this.clientY0 = interaction.coords.start.client.y - origin.y;
    if (starting || ending) {
      this.delta = {
        x: 0,
        y: 0
      };
    } else {
      this.delta = {
        x: this[deltaSource].x - prevEvent[deltaSource].x,
        y: this[deltaSource].y - prevEvent[deltaSource].y
      };
    }
    this.dt = interaction.coords.delta.timeStamp;
    this.duration = this.timeStamp - this.t0;

    // velocity and speed in pixels per second
    this.velocity = (0, _extend.default)({}, interaction.coords.velocity[deltaSource]);
    this.speed = (0, _hypot.default)(this.velocity.x, this.velocity.y);
    this.swipe = ending || phase === 'inertiastart' ? this.getSwipe() : null;
  }
  getSwipe() {
    const interaction = this._interaction;
    if (interaction.prevEvent.speed < 600 || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
      return null;
    }
    let angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
    const overlap = 22.5;
    if (angle < 0) {
      angle += 360;
    }
    const left = 135 - overlap <= angle && angle < 225 + overlap;
    const up = 225 - overlap <= angle && angle < 315 + overlap;
    const right = !left && (315 - overlap <= angle || angle < 45 + overlap);
    const down = !up && 45 - overlap <= angle && angle < 135 + overlap;
    return {
      up,
      down,
      left,
      right,
      angle,
      speed: interaction.prevEvent.speed,
      velocity: {
        x: interaction.prevEvent.velocityX,
        y: interaction.prevEvent.velocityY
      }
    };
  }
  preventDefault() {}

  /**
   * Don't call listeners on the remaining targets
   */
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }

  /**
   * Don't call any other listeners (even on the current target)
   */
  stopPropagation() {
    this.propagationStopped = true;
  }
}

// getters and setters defined here to support typescript 3.6 and below which
// don't support getter and setters in .d.ts files
exports.InteractEvent = InteractEvent;
Object.defineProperties(InteractEvent.prototype, {
  pageX: {
    get() {
      return this.page.x;
    },
    set(value) {
      this.page.x = value;
    }
  },
  pageY: {
    get() {
      return this.page.y;
    },
    set(value) {
      this.page.y = value;
    }
  },
  clientX: {
    get() {
      return this.client.x;
    },
    set(value) {
      this.client.x = value;
    }
  },
  clientY: {
    get() {
      return this.client.y;
    },
    set(value) {
      this.client.y = value;
    }
  },
  dx: {
    get() {
      return this.delta.x;
    },
    set(value) {
      this.delta.x = value;
    }
  },
  dy: {
    get() {
      return this.delta.y;
    },
    set(value) {
      this.delta.y = value;
    }
  },
  velocityX: {
    get() {
      return this.velocity.x;
    },
    set(value) {
      this.velocity.x = value;
    }
  },
  velocityY: {
    get() {
      return this.velocity.y;
    },
    set(value) {
      this.velocity.y = value;
    }
  }
});
//# sourceMappingURL=InteractEvent.js.map