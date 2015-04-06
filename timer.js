var Timer = (function() {
	var self = {};
	var fmtSeconds = d3.format(".3n");
	
	var timerEnd;
	var timerBar = Chart.svg.append('rect')
		.attr('class', 'timer-bar')
		.attr('x', 1)
		.attr('y', 1)
		.attr('width', 1)
		.attr('height', 1)
		.attr('shape-rendering', 'crispEdges');

	self.sync = function(seconds_left) {
		timerEnd = moment().add(seconds_left * 1000);
		timerBar
			.attr('x', function(d, i) {
				return Chart.xScale(Stats.resets);
			})
			.attr('width', function(d, i) {
				return Chart.xScale(Stats.resets) - Chart.xScale(Stats.resets - 1);
			});

		if (!animating) {
			animate();
		}
	}

	function animate() {
		animating = true;
		var timer = (timerEnd - moment());
		timerBar
			.attr('y', function() {
				return Chart.yScale(timer / 1000);
			})
			.attr('height', function(d, i) {
				return Chart.yScale(60) - Chart.yScale(timer / 1000);
			})
			.attr('fill', flairColor(timer / 1000));
		$('#timer').text(fmtSeconds(timer / 1000));
		requestAnimationFrame(animate);
	}

	self.resize = function() {
		$('#timer')
			.css('left', ($('#stats').offset().left + $('#stats').outerWidth()))
			.css('top', Chart.margins.top)
			.css('line-height', $('#stats').outerHeight() + 'px');
	}

	return self;
}());