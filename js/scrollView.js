var ScrollView = Backbone.View.extend({
	el : $('#frupics'),

	events: {
		'scroll': 'checkScroll'
	},

	initialize : function(options) {
		_.bindAll(this, 'render', 'getFrupics', 'checkScroll');

		$(window).resize(this.checkDivHeight);
		this.checkDivHeight();

		this.template = options.template;
		this.scrollTopPrev = this.el.scrollTop;
		this.isLoading = false;

		this.frupics = new Frupics();
		this.frupics.bind('reset', this.render);
		this.getFrupics();
	},

	render : function() {	
		if(this.frupics.toJSON().length == 0) {
			$(this.el).append("<div id='end' class='post'>You've reached the end.</div>");
		} else {
			var template = $(this.template);

			console.log("sdaf", this.frupics.toJSON().length);
			var html = template.tmpl(this.frupics.toJSON());
			$(this.el).append(html);

			if(this.isLoading) {
				history.pushState(null, null, this.frupics.getPushstateUrl());
			}

			this.isLoading = false;
		}
			
		$("#load").remove();
	},

	getFrupics : function() {
		$(this.el).append("<div id='load' class='post'><img src='img/loading.gif' /></div>");

		this.isLoading = true;
		this.frupics.fetch();
	},

	checkScroll : function() {
		var triggerPoint = 300; // 100px from the bottom

		if (!this.isLoading
				&& (this.scrollTopPrev < this.el.scrollTop)
				&& ($(this.el).height() + this.el.scrollTop
						+ triggerPoint >= this.el.scrollHeight)) {
			this.frupics.next();
			this.getFrupics();
		}

		this.scrollTopPrev = this.el.scrollTop;
	},

	checkDivHeight: function() {
		$('#frupics').height(window.innerHeight - 70 - $('#header').height());
	}
});