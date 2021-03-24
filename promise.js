const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]----'));
	}
	let called;
	if((typeof x === 'object' && x != null) || typeof x === 'function') {
		try {
			let then = x.then; 
			if (typeof then === 'function') { 
				then.call(x, y => {
					if (called) return;
					called = true;
					resolvePromise(promise2, y, resolve, reject);
				}, r => {
					if (called) return;
					called = true;
					reject(r);
				});
			} else {
				resolve(x);
			}
		} catch(e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}

class Promise {
	constructor(executor) {
		this.status = PENDING; 
		this.value = undefined; 
		this.reason = undefined; 
		this.onResolvedCallbacks = [];
		this.onRejectedCallbacks = [];
		let resolve = (value) => {
			if (value instanceof Promise) {
				value.then(resolve, reject);
				return;
			}
			if (this.status === PENDING) { 
				this.value = value;
				this.status = RESOLVED;
				this.onResolvedCallbacks.forEach(fn => fn());
			}
		};
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status = REJECTED;
				this.onRejectedCallbacks.forEach(fn => fn());
			}
		};
		try {
			executor(resolve, reject); 
		} catch (e) {
			reject(e);
		}
	}
	then(onfulfilled, onrejected) {
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v;
		onrejected = typeof onrejected === 'function' ? onrejected : error => { throw error };
		let promise2 = new Promise((resolve, reject) => {
			if (this.status === RESOLVED) {
				setTimeout(() => {
					try {
						let x = onfulfilled(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) { 
						console.log(e);
						reject(e);
					}
				}, 0);
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onrejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			}
			if (this.status === PENDING) {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onfulfilled(this.value);
							resolvePromise(promise2, x, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onrejected(this.reason);
							resolvePromise(promise2, x, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
			}
		});

		return promise2;
	}
	catch(errCallback) {
		return this.then(null, errCallback);
	}
}

module.exports = Promise;