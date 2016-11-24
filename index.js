const loop = init => condition => end => callback => list => (
  condition(init)(list) ? loop(
    end(init)(list)
  )(
    condition
  )(
    end
  )(
    callback
  )(
    [
      ...list,
      callback(init)(list)
    ]
  ) : list
)

module.exports = loop