const solc = require('solc')

const firstKey = map => Object.keys(map)[0]
const firstKeyValue = map => map[firstKey(map)]

function makeInterfaceFromAbi(abi) {
  const abiCompiled = solc.compile(abi)
  return JSON.parse(firstKeyValue(abiCompiled.contracts).interface)
}

module.exports = makeInterfaceFromAbi


