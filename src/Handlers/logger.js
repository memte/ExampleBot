import winston from 'winston';

export default {
	async execute(client) {
				client.logger = winston.createLogger({
					level: "info",
					format: winston.format.combine(
					  winston.format.timestamp({
						format: "DD-MM-YYYY HH:mm:ss",
					  }),
					  winston.format.printf(
						(info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
					  ),
					),
					transports: [
					  new winston.transports.Console({
						format: winston.format.combine(
						  winston.format.colorize(),
						  winston.format.simple(),
						),
					  }),
					],
				  });
	},
};
