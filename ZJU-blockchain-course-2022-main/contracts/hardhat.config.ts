import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'http://localhost:8545',
      // the private key of signers, change it according to your ganache user
      accounts: [
        '0x6a038bb7a1d2df35df05203c2d79f2d4851cbba3329f55999efcc0cae54080b6',
        '0xed5974473816aa0ad86d75517dbb43f5854f1e1069529ae70e0e5de169172b7e',
        '0xe203007331f7d8d3833a77064dae1d2036d457cf49c6e8352ef3cae0e95175d5',
        '0x33802cf32b9220f3baf954ba79494aa453a2d6f19d73ddff92dfb7b3616c8e64',
        '0xa8abdb309b64b19c71966978fa19cd33a489750831a73ce0b5e95408214ef263'
      ]
    },
  },
};

export default config;
