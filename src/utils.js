const sha3 = require('js-sha3')

// formatHex :: string | Array<string> -> HexString
const formatHex = x =>
  Array.isArray(x) ? ['0x'].concat(x).join('') : '0x'.concat(x)

// stringToHex :: string -> HexString
const stringToHex = x =>
  formatHex(x.split('').map(x => x.charCodeAt(0).toString(16)))

// bufferStringToHex :: string -> HexString
const bufferStringToHex = x => formatHex(Buffer.from(x).toString('hex'))

// numberToHex :: number -> HexString
const numberToHex = x =>
  formatHex(
    Number(x)
      .toString(16)
      .padStart(2, '0')
  )

// stripPrefix :: HexString -> string
const stripPrefixRegex = /^0x/
const stripPrefix = x => (stripPrefixRegex.test(x) ? x.slice(2) : x)

const testa = () => {
  const abi = 'identity(uint256)'
  const expected = '0xac37eebb'

  console.log('String', stringToHex(abi), bufferStringToHex(abi))

  console.log('Integer', numberToHex(11))

  const abiHash = formatHex(sha3.keccak_256(abi).slice(0, 8))
  console.log('ABI', abiHash)
  console.log('Does ABI match?', abiHash === expected)
}

testa()
