# ISwapper
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/ISwapper.sol)

Interface for token swapping functionality

This interface defines the standard for swapping one token for another.
Implementations of this interface handle the actual swap logic and routing,
which may involve DEX integrations, aggregators, or other swap mechanisms.


## Functions
### swap

Swaps one token for another

This function performs a token swap from `assetIn` to `assetOut`.
The caller must transfer `amountIn` of `assetIn` to the swapper contract
before calling this function. The swapper will then send the resulting
`assetOut` tokens to the specified recipient.


```solidity
function swap(
    address assetIn,
    uint256 amountIn,
    address assetOut,
    uint256 minAmountOut,
    address recipient,
    bytes calldata swapperParams
)
    external
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|The address of the input token to be swapped|
|`amountIn`|`uint256`|The amount of input tokens to swap|
|`assetOut`|`address`|The address of the output token to receive|
|`minAmountOut`|`uint256`|The minimum amount of output tokens expected (slippage protection)|
|`recipient`|`address`|The address that will receive the output tokens|
|`swapperParams`|`bytes`|Additional data specific to the swap implementation (e.g., DEX router data, paths)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The actual amount of output tokens received from the swap|


## Events
### Swap
Emitted after a successful token swap


```solidity
event Swap(address indexed assetIn, address indexed assetOut, uint256 amountIn, uint256 amountOut);
```

