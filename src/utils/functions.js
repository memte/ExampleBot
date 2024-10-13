import moment from 'moment';

export default {
	async execute(client) {
		client.log = function (message) {
			console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
		};
	},
};
