var layout = require('./templates/layout');

window.app = {
	init: function () {
		document.querySelector('body').innerHTML = layout({});
	}
};

window.app.init();
