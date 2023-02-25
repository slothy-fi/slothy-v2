import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
    solidity: '0.8.9',
    networks: {
        hardhat: {
            forking: {
                url: 'https://eth-goerli.g.alchemy.com/v2/jQRXBq2vttfq5xNT1SCgli1Q9Kl_B4Bi',
                blockNumber: 8555300
            }
        }
    }
};

export default config;
