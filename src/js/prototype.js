Object.deepCopy = function(obj) {
    return JSON.parse(JSON.stringify(obj))
}

String.prototype.addZero = function() {
    return this >= 10 ? this : '0' + this
}
