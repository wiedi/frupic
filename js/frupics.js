var Frupics = Backbone.Collection.extend({
	offset: 0,

	user: 'all',

	initialize: function() {
		var loc = window.location.search.substr(1),
    		offset = parseInt(loc.substr(loc.indexOf('offset=')).split('&')[0].split('=')[1], 10),
            user  =  loc.substr(loc.indexOf('user=')).split('&')[0].split('=')[1];

        if(offset) this.offset = offset;
        if(user) this.user = user;
	},

	url: function() {
		return "http://api.freamware.net/2.0/get.picture?offset=" + this.offset + '&username=' + this.user;
	},

	next: function() {
		this.offset += 10;
	},

	getPushstateUrl: function() {
		return '?' + ((this.offset > 0) ? 'offset=' + this.offset : '') + ((this.user != 'all') ? '&user=' + this.user : '');
	}
});
