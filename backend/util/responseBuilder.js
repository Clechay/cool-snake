const Success = res => {
  return (data, log) => {
    const response = {
      status: 'success'
    };
    if (typeof data !== undefined && data !== null) response.data = data;
    res.json(response);
    if (log) console.log(`send success response (${log})`);
  };
};

const Fail = res => {
  return (action, error, code, dump) => {
    const response = {
      status: 'fail',
      action: action,
      error: error
    };
    res.status(code || 500).json(response);
    if (dump) {
      dump.__proto__ = Object;
      console.error(
        `[${action}] sednd fail response "${error}" dump:\n${JSON.stringify(
          dump
        )}`
      );
    } else console.log(`[${action}] sednd fail response ${error}`);
  };
};

const middleware = (req, res, next) => {
  res.success = Success(res);
  res.fail = Fail(res);
  next();
};

module.exports = {
  middleware,
  success: (res, data, log) => {
    Success(res)(data, log);
  },
  fail: (res, action, error, code) => {
    Fail(res)(action, error, code);
  }
};
