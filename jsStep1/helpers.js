var Helper = (function helpersFunction() {

  var getRandomInsideOf = function(bottom, top) {
    return bottom + (Math.random()) * (top - bottom);
  };

  var getDistance = function(current, other) {
    return Math.sqrt(
      Math.pow(other.getX() - current.getX(), 2) +
      Math.pow(other.getY() - current.getY(), 2)
    );
  };

  return {
    getRandomInsideOf: getRandomInsideOf,
    getDistance: getDistance
  }
})();
