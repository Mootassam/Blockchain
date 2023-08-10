require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/fPcFZczDX4_D8zuwOP0H4w7-rR1s2HW3',
      accounts: [
        'aa5293b3657821478a88ce56c4f63d40132a89e7bcf6d75283bbfc44629e06ff',
      ],
    },
  },
}
