(function() {
	function Animated(world) {
		this.world = world;
		var outer = document.body,
			doc = outer.ownerDocument;
		var node = outer.appendChild(doc.createElement("div"));
		this.pre = node.appendChild(doc.createElement("pre"));
		this.pre.appendChild(doc.createTextNode(world.toString()));
		var self = this;
		this.interval = setInterval(function() {
			self.tick();
		}, 250);
		this.turning = true;
	}
	Animated.prototype.tick = function() {
		this.world.turn();
		this.pre.removeChild(this.pre.firstChild);
		this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
	};
	Animated.prototype.stop = function(condition) {
		if (this.turning) {
			clearInterval(this.interval);
			if (condition) {
				this.pre.removeChild(this.pre.firstChild);
			}
		}
		this.turning = false;
	}
	Animated.prototype.nonstop = function() {
		if (!this.turning) {
			var self = this;
			this.interval = setInterval(function() {
				self.tick();
			}, 250);
		}
		this.turning = true;
	}
	window.animateWorld = function(world) {
		window.liveWorld = new Animated(world);
	};
})();