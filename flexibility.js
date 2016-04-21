(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.flexibility = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function alignContent(target) {
	var start;
	var factor;

	if (target.lines.length < 2 || target.alignContent === 'stretch') {
		factor = target.crossSpace / target.lines.length;
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;
			line.cross += factor;

			start += line.cross;
		});
	} else if (target.alignContent === 'flex-start') {
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross;
		});
	} else if (target.alignContent === 'flex-end') {
		start = target.crossSpace;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross;
		});
	} else if (target.alignContent === 'center') {
		start = target.crossSpace / 2;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross;
		});
	} else if (target.alignContent === 'space-between') {
		factor = target.crossSpace / (target.lines.length - 1);
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross + factor;
		});
	} else if (target.alignContent === 'space-around') {
		factor = target.crossSpace * 2 / (target.lines.length * 2);
		start = factor / 2;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross + factor;
		});
	} else if (target.alignContent === 'stretch') {
		factor = target.crossSpace / target.lines.length;
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;
			line.cross += factor;

			start += line.cross;
		});
	}
};

},{}],2:[function(require,module,exports){
module.exports = function alignItems(target) {
	target.lines.forEach(function (line) {
		line.children.forEach(function (child) {
			if (child.alignSelf === 'flex-start') {
				child.crossStart = line.crossStart;
			} else if (child.alignSelf === 'flex-end') {
				child.crossStart = line.crossStart + line.cross - child.crossAround;
			} else if (child.alignSelf === 'center') {
				child.crossStart = line.crossStart + (line.cross - child.crossAround) / 2;
			} else if (child.alignSelf === 'stretch') {
				child.crossStart = line.crossStart;
				child.crossAround = line.cross;
			}
		});
	});
};

},{}],3:[function(require,module,exports){
module.exports = function flexDirection(target, targetFlexDirection, targetAlignItems) {
	var clientRect = target.node.getBoundingClientRect();

	if (targetFlexDirection === 'row' || targetFlexDirection === 'row-reverse') {
		target.mainAxis  = 'inline';
		target.crossAxis = 'block';

		if (typeof target.main === 'number' || typeof target.cross === 'number') {
			if (target.flexDirection === 'row' || targetFlexDirection === 'row-reverse') {
				target.width  = target.main;
				target.height = target.cross;
			} else {
				target.width  = target.cross;
				target.height = target.main;
			}
		}

		target.main  = target.width;
		target.cross = target.height;

		target.mainClient  = clientRect.width  || target.node.offsetWidth;
		target.crossClient = clientRect.height || target.node.offsetHeight;

		target.mainBefore  = target.marginLeft;
		target.mainAfter   = target.marginRight;
		target.crossBefore = target.marginTop;
		target.crossAfter  = target.marginBottom;
	} else {
		target.mainAxis  = 'block';
		target.crossAxis = 'inline';

		target.main  = target.height;
		target.cross = target.width;

		if (typeof target.main === 'number' || typeof target.cross === 'number') {
			if (target.flexDirection === 'column' || targetFlexDirection === 'column-reverse') {
				target.width  = target.cross;
				target.height = target.main;
			} else {
				target.width  = target.main;
				target.height = target.cross;
			}
		}

		target.mainClient  = clientRect.height || target.node.offsetHeight;
		target.crossClient = clientRect.width  || target.node.offsetWidth;

		target.mainBefore  = target.marginTop;
		target.mainAfter   = target.marginBottom;
		target.crossBefore = target.marginLeft;
		target.crossAfter  = target.marginRight;
	}

	if (typeof target.flexBasis === 'number') {
		target.main = target.flexBasis;
	}

	if (target.main === 'auto') {
		target.mainAround = target.mainClient;
	} else {
		target.mainAround = target.main;
	}

	if (target.cross === 'auto') {
		target.crossAround = target.crossClient;
	} else {
		target.crossAround = target.cross;
	}

	if (typeof target.mainBefore === 'number') {
		target.mainAround += target.mainBefore;
	}

	if (typeof target.mainAfter === 'number') {
		target.mainAround += target.mainAfter;
	}

	if (typeof target.crossBefore === 'number') {
		target.crossAround += target.crossBefore;
	}

	if (typeof target.crossBefore === 'number') {
		target.crossAround += target.crossBefore;
	}

	if (target.alignSelf === 'auto') {
		target.alignSelf = targetAlignItems;
	}
};

},{}],4:[function(require,module,exports){
module.exports = function flexGrow(line) {
	if (line.mainSpace > 0) {
		var growFactor = line.children.reduce(function (lastGrowFactor, child) {
			return lastGrowFactor + child.flexGrow;
		}, 0);

		if (growFactor > 0) {
			line.children.forEach(function (child) {
				child.mainAround += child.flexGrow / growFactor * line.mainSpace;
			});

			line.main = line.children.reduce(function (main, child) {
				return main + child.mainAround;
			}, 0);

			line.mainSpace = 0;
		}
	}
};

},{}],5:[function(require,module,exports){
module.exports = function flexShrink(line) {
	if (line.mainSpace < 0) {
		var shrinkFactor = line.children.reduce(function (lastShrinkFactor, child) {
			return lastShrinkFactor + child.flexShrink;
		}, 0);

		if (shrinkFactor > 0) {
			line.children.forEach(function (child) {
				child.mainAround += child.flexShrink / shrinkFactor * line.mainSpace;
			});

			line.main = line.children.reduce(function (main, child) {
				return main + child.mainAround;
			}, 0);

			line.mainSpace = 0;
		}
	}
};

},{}],6:[function(require,module,exports){
module.exports = function flexboxLines(target) {
	var line;

	target.lines = [line = {
		main:  0,
		cross: 0,
		children: []
	}];

	target.children.forEach(function (child) {
		if (
			target.flexWrap === 'nowrap' ||
			line.children.length === 0 ||
			target.mainAround >= line.main + child.mainAround
		) {
			line.main += child.mainAround;
			line.cross = Math.max(line.cross, child.crossAround);
		} else {
			target.lines.push(line = {
				main:  child.mainAround,
				cross: child.crossAround,
				children: []
			});
		}

		line.children.push(child);
	});
};

},{}],7:[function(require,module,exports){
module.exports = function flexbox(target) {
	target.descendants.forEach(function (descendant) {
		module.exports(descendant);
	});

	if (target.display === 'flex') {
		target.children.forEach(function (child) {
			require('./flex-direction')(child, target.flexDirection, target.alignItems);
		});
	} else {
		return target;
	}

	require('./order')(target);
	require('./flex-direction')(target, target.flexDirection, target.alignItems);
	require('./flexbox-lines')(target);

	if (target.main === 'auto') {
		target.main = Math.max(target.mainAround, target.lines.reduce(function (main, line) {
			return Math.max(main, line.main);
		}, 0));

		if (target.flexDirection === 'row') {
			target.mainAround = target.mainClient + target.mainBefore + target.mainAfter;
		} else {
			target.mainAround = target.main + target.mainBefore + target.mainAfter;
		}
	}

	if (target.cross === 'auto') {
		target.cross = target.lines.reduce(function (cross, line) {
			return cross + line.cross;
		}, 0);

		if (target.flexDirection === 'column') {
			target.crossAround = target.crossClient + target.crossBefore + target.crossAfter;
		} else {
			target.crossAround = target.cross + target.crossBefore + target.crossAfter;
		}

		target.crossSpace = target.crossAround - target.cross;
	} else {
		target.crossSpace = target.cross - target.lines.reduce(function (cross, line) {
			return cross + line.cross;
		}, 0);
	}

	require('./align-content')(target);

	target.lines.forEach(function (line) {
		line.mainSpace = target.main - line.main;

		require('./flex-grow')(line);
		require('./flex-shrink')(line);
		require('./margin-main')(line);
		require('./margin-cross')(line);
		require('./justify-content')(line, target.justifyContent);
	});

	require('./align-items')(target);

	return target;
};

},{"./align-content":1,"./align-items":2,"./flex-direction":3,"./flex-grow":4,"./flex-shrink":5,"./flexbox-lines":6,"./justify-content":8,"./margin-cross":9,"./margin-main":10,"./order":11}],8:[function(require,module,exports){
module.exports = function justifyContent(line, targetJustifyContent) {
	var start;
	var factor;

	if (targetJustifyContent === 'flex-start') {
		start = 0;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround;
		});
	} else if (targetJustifyContent === 'flex-end') {
		start = line.mainSpace;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround;
		});
	} else if (targetJustifyContent === 'center') {
		start = line.mainSpace / 2;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround;
		});
	} else if (targetJustifyContent === 'space-between') {
		factor = line.mainSpace / (line.children.length - 1);

		start = 0;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround + factor;
		});
	} else if (targetJustifyContent === 'space-around') {
		factor = line.mainSpace * 2 / (line.children.length * 2);
		start = factor / 2;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround + factor;
		});
	}
};

},{}],9:[function(require,module,exports){
module.exports = function marginCross(line) {
	line.children.forEach(function (child) {
		var count = 0;

		if (child.crossBefore === 'auto') {
			++count;
		}

		if (child.crossAfter === 'auto') {
			++count;
		}

		var childSpace = line.cross - child.crossAround;

		if (child.crossBefore === 'auto') {
			child.crossBefore = childSpace / count;

			child.crossAround += child.crossBefore;
		}

		if (child.crossAfter === 'auto') {
			child.crossAfter = childSpace / count;

			child.crossAround += child.crossAfter;
		}
	});
};

},{}],10:[function(require,module,exports){
module.exports = function marginCross(line) {
	var count = 0;

	line.children.forEach(function (child) {
		if (child.mainBefore === 'auto') {
			++count;
		}

		if (child.mainAfter === 'auto') {
			++count;
		}
	});

	if (count > 0) {
		line.children.forEach(function (child) {
			if (child.mainBefore === 'auto') {
				child.mainBefore = line.mainSpace / count;

				child.mainAround += child.mainBefore;
			}

			if (child.mainAfter === 'auto') {
				child.mainAfter = line.mainSpace / count;

				child.mainAround += child.mainAfter;
			}
		});

		line.mainSpace = 0;
	}
};

},{}],11:[function(require,module,exports){
module.exports = function order(target) {
	target.children.sort(function (childA, childB) {
		return childA.order - childB.order || childA.index - childB.index;
	});
};

},{}],12:[function(require,module,exports){
module.exports = function getFlexStyles(target, data, isFlexChild) {
	var style = Object.assign(data, {
		alignContent: 'stretch',
		alignItems: 'stretch',
		alignSelf: 'auto',
		display: 'inline',
		flexBasis: 'auto',
		flexDirection: 'row',
		flexGrow:   0,
		flexShrink: 1,
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
		height: 'auto',
		marginTop:    0,
		marginRight:  0,
		marginLeft:   0,
		marginBottom: 0,
		maxHeight: 'none',
		maxWidth: 'none',
		minHeight: 0,
		minWidth: 0,
		order: 0,
		position: 'static',
		width: 'auto'
	});

	if (target.hasAttribute('data-style')) {
		target.setAttribute('style', target.getAttribute('data-style'));
	} else {
		target.setAttribute('data-style', target.getAttribute('style') || '');
	}

	var attr = (target.getAttribute('data-style') || '') + ';' + (target.getAttribute('data-flex') || '');
	var re = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g;
	var decl;

	while (decl = re.exec(attr)) {
		var name = decl[1].toLowerCase().replace(/-[a-z]/g, function (match) {
			return match.slice(1).toUpperCase();
		});

		style[name] = parseFloat(decl[2]);

		if (isNaN(style[name])) {
			style[name] = decl[2];
		}
	}

	if (isFlexChild) {
		target.style.display  = 'inline-block';
		target.style.position = 'absolute';
	}

	var rect = target.getBoundingClientRect();

	style.clientWidth  = rect.width || target.offsetWidth;
	style.clientHeight = rect.height || target.offsetHeight;

	return style;
};

},{}],13:[function(require,module,exports){
/*! Flexibility 2.0.0 | MIT Licensed | github.com/10up/flexibility */

module.exports = function flexibility(target) {
	var data1 = module.exports.walk(target);

	var data2 = module.exports.flexbox(data1);

	var data3 = module.exports.write(data2);

	return data3;
};

module.exports.flexbox = require('./flexbox');
module.exports.getFlexStyles = require('./getFlexStyles');
module.exports.walk = require('./walk');
module.exports.write = require('./write');

// module.exports.process = require('./process');
// module.exports.support = require('./support');

},{"./flexbox":7,"./getFlexStyles":12,"./walk":14,"./write":15}],14:[function(require,module,exports){
var getFlexStyles = require('../getFlexStyles');

module.exports = function walk(target, ancestorData, isFlexChild) {
	var flexContainerRE = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i;
	var isFlexContainer = flexContainerRE.test(target.getAttribute('data-flex'));
	var data = {
		node: target,
		children: [],
		descendants: []
	};

	if (isFlexContainer) {
		if (ancestorData !== undefined) {
			ancestorData.descendants.push(data);
		}
	}

	if (isFlexContainer || !ancestorData) {
		ancestorData = data;
	}

	Array.prototype.forEach.call(target.childNodes, function (childNode) {
		if (isFlexContainer && childNode.nodeType === 3 && childNode.nodeValue.trim()) {
			var oldNode = childNode;

			childNode = target.insertBefore(document.createElement('flex-item'), oldNode);

			childNode.appendChild(oldNode);
		}

		if (childNode.nodeType === 1) {
			var childData = module.exports(childNode, ancestorData, isFlexContainer);

			if (isFlexContainer) {
				data.children.push(childData);
			}
		}
	});

	if (isFlexContainer || isFlexChild) {
		getFlexStyles(target, data, isFlexChild);
	}

	return data;
};

},{"../getFlexStyles":12}],15:[function(require,module,exports){
module.exports = function write(target) {
	target.descendants.filter(function (descendant) {
		return target.children.indexOf(descendant) === -1;
	}).forEach(function (descendant) {
		module.exports(descendant);
	});

	if (!target.display) {
		return;
	}

	var style = target.node.style;

	if ('mainStart' in target) {
		style.position = 'absolute';

		if (target.mainAxis === 'inline') {
			style.left = target.mainStart  + 'px';
			style.top  = target.crossStart + 'px';

			style.marginTop    = target.crossBefore + 'px';
			style.marginRight  = target.mainAfter   + 'px';
			style.marginBottom = target.crossAfter  + 'px';
			style.marginLeft   = target.mainBefore  + 'px';
		} else {
			style.left = target.crossStart + 'px';
			style.top  = target.mainStart  + 'px';

			style.marginTop    = target.mainBefore  + 'px';
			style.marginRight  = target.crossAfter  + 'px';
			style.marginBottom = target.mainAfter   + 'px';
			style.marginLeft   = target.crossBefore + 'px';
		}

		if (target.mainAxis === 'inline') {
			style.width  = target.mainAround  - target.mainBefore - target.mainAfter + 'px';
			style.height = target.crossAround - target.crossBefore - target.crossAfter + 'px';
		} else {
			if (target.cross === 'auto') {
				style.width = target.crossClient - target.crossBefore - target.crossAfter + 'px';
			} else {
				style.width = target.crossAround - target.crossBefore - target.crossAfter + 'px';
			}

			if (target.main === 'auto') {
				style.height = target.mainClient - target.mainBefore - target.mainAfter + 'px';
			} else {
				style.height = target.mainAround - target.mainBefore - target.mainAfter + 'px';
			}
		}
	} else {
		if (!style.position) {
			style.position = 'relative';
		}

		if (target.mainAxis === 'inline') {
			style.width = target.mainAround - target.mainBefore - target.mainAfter + 'px';
			style.height = target.crossAround - target.crossBefore - target.crossAfter + 'px';
		} else {
			style.width = target.crossAround - target.crossBefore - target.crossAfter + 'px';
			style.height = target.mainAround - target.mainBefore - target.mainAfter + 'px';
		}
	}

	if (target.children) {
		target.children.forEach(function (child) {
			module.exports(child);
		});
	}
};

},{}]},{},[13])(13)
});