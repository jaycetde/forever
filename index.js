var Emitter = require('emitter')
  , events = require('event')
;

module.exports = Forever;

function Forever(el) {
    
    var self = this;
    if (!(self instanceof Forever)) return new Forever(el);
    
    Emitter.call(self);
    
    self.el = el;
    self.threshold = 400;
    self._ready = true;
    
    events.bind(self.el, 'scroll', self.scroll.bind(self));
    
}

Forever.prototype = new Emitter();

Forever.prototype.ready = function (bool) {
    if (typeof bool === 'undefined') bool = true;
    this._ready = bool;
};

Forever.prototype.scroll = function (e) {
    if (this._ready) {
        var scrollBottom = this.el.scrollHeight - this.el.scrollTop - this.el.offsetHeight;
        
        if (scrollBottom < this.threshold) {
            this._ready = false;
            this.emit('more');
        }
    }
};