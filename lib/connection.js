import {Socket} from 'net';
import ConnectionArguments from './connection-arguments';

export default class Connection extends Socket {
	constructor(opts) {
    super();
    this.options = new ConnectionArguments(opts).options;
		this.socket = new Socket();
    this.start(this.options);
	}

  get host() {
    return this.options.host || this.options.ip || '0.0.0.0';
  }

  get port() {
    return this.options.port || 5000;
  }

  get path() {
    return this.options.path || undefined;
  }

	start(options) {
		this.socket.connect({
      host: this.host,
      port: this.port,
      path: this.path
    }, () => {
			this.write('client-ready');
			// this.write('client-desktop', )
		});


		this.socket.on('error', err => {
			console.log(err);
		});

		this.socket.on('data', event => {
			console.log(event);
		});

		this.socket.on('close', () => {
			console.log('Connection closed');
		});
	}

  write(eventType='data', data=new Object()) {
    this.socket.write(JSON.stringify({
      type: eventType,
      data: data
    }))
  }

}
