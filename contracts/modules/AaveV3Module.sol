// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IAaveOracle} from "@aave/core-v3/contracts/interfaces/IAaveOracle.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {IAaveV3Module} from "../interfaces/IAaveV3Module.sol";

contract AaveV3Module is IAaveV3Module, Ownable {

    address goerliV3Pool;
    address goerliStagingDAI;

    constructor() {
        goerliV3Pool = 0x7b5C526B7F8dfdff278b4a3e045083FBA4028790;
        goerliStagingDAI = 0xBa8DCeD3512925e52FE67b1b5329187589072A55;
    }

    /// @inheritdoc IAaveV3Module
    function supply(address token, uint256 amount) public {
        IERC20(goerliStagingDAI).approve(goerliV3Pool, amount);
        IPool(goerliV3Pool).supply(token, amount, msg.sender, 0);
    }

}
