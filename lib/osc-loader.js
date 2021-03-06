"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
const events_1 = require("events");
class OscLoader extends events_1.EventEmitter {
    constructor(port) {
        super();
        this.addresses = {};
        this.stdout = (output) => {
            const s = output.toString().trim();
            s.split('\n').forEach(line => {
                let msg;
                try {
                    msg = JSON.parse(line);
                }
                catch (e) { }
                if (msg) {
                    msg.address =
                        'osc_' + msg.address.replace(/^\//, '').replace('/', '_');
                    this.emit('message', msg);
                    if (!this.addresses[msg.address]) {
                        this.addresses[msg.address] = true;
                        this.emit('reload');
                    }
                }
                else {
                    console.log(line);
                }
            });
        };
        this.stderr = (output) => {
            console.error(output.toString());
        };
        this.exit = (code) => {
            console.log('[VEDA] OSC server exited with code', code);
        };
        this.port = port;
        this.server = child_process_1.spawn('node', [path.resolve(__dirname, 'osc-server.js'), this.port.toString()], {
            cwd: path.resolve(__dirname, '..'),
        });
        this.server.stdout.on('data', this.stdout);
        this.server.stderr.on('data', this.stderr);
        this.server.on('exit', this.exit);
    }
    destroy() {
        try {
            this.server.kill();
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.default = OscLoader;
//# sourceMappingURL=osc-loader.js.map