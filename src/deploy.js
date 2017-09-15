const Web3 = require('web3')

const makeInterfaceFromAbi = require('./makeInterfaceFromAbi')
const contractFilePaths = require('./contractFilePaths')

const prepareContract = contractName => {
  // type ContractFileSetT = { abi: string, hex: string }
  const contractFiles = contractFilePaths(contractName)

  return {
    bytecode: contractFiles.hex,
    interface: makeInterfaceFromAbi(contractFiles.abi)
  }
}

const deployContract = contractName => {
  contractData = prepareContract(contractName)

  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  )
  const defaultAccount = web3.eth.coinbase

  console.log('INIT :: block number is', web3.eth.blockNumber)

  web3.eth.contract(contractData.interface).new({
    data: contractData.bytecode,
    from: defaultAccount,
    gas: 100000
  }, (error, contract) => {
    if (error) {
      console.log('ERROR :: ', error)
      return
    }

    // This callback is invoked twice: once for txid, once for contract address
    // only when contract address is known can we call ABI functions
    if (!contract.address) return

    console.log('CALL', contract.identity(42))
  })
}

deployContract('identity')
