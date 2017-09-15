const fs = require('fs')
const path = require('path')

const readContractFile = file =>
  fs
    .readFileSync(path.resolve(__dirname, '../contracts/', file))
    .toString('utf-8')
    .trim()

const contractFiles = contractName => ({
  abi: readContractFile(`${contractName}.abi`),
  hex: readContractFile(`${contractName}.hex`)
})

module.exports = contractFiles
