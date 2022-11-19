const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  status = PENDING;
  value = undefined;
  reason = undefined;

  resolve = (value) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = FULFILLED;
    this.value = value
    this.successCallback && this.successCallback(this.value);
  }

  reject = (reason) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = REJECTED;
    this.reason = reason;
    this.failCallback && this.failCallback(this.reason);
  }

  successCallback = undefined;
  failCallback = undefined;

  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else {
      this.successCallback = successCallback;
      this.failCallback = failCallback;
    }
  }
}

module.exports = Promise;