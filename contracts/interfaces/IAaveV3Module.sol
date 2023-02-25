// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAaveV3Module {

    /// @notice AaveV3Module has to be approved to spend tokens on behalf of msg.sender through ERC20 interface
    /// @param token address of ERC20 token to supply to Aave V3 Pool
    /// @param amount amount of ERC20 token to supply to Aave V3 Pool with the corresponding decimal format
    function supply(address token, uint256 amount) external;
}
