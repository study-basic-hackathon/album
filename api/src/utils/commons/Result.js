export default class Result {
  constructor(data = null, error = null) {
    this.data = data;
    this.error = error;
  }

  static ok(data) {
    return new Result(data, null);
  }

  static fail(error) {
    return new Result(null, error);
  }
}
