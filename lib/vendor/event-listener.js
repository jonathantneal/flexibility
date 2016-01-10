!window.addEventListener && window.attachEvent && (function () {
	Window.prototype.addEventListener = HTMLDocument.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener(type, listener) {
		this.attachEvent('on' + type, listener);
	};

	Window.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener(type, listener) {
		this.detachEvent('on' + type, listener);
	};
})();
