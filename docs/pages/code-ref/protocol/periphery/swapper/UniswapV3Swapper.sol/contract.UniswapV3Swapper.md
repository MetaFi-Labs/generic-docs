# UniswapV3Swapper
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/periphery/swapper/UniswapV3Swapper.sol)

**Inherits:**
[ISwapper](/code-ref/protocol/interfaces/ISwapper.sol/interface.ISwapper.md)

A token swapper implementation using Uniswap V3

This contract implements the ISwapper interface to provide token swapping
functionality through Uniswap V3 pools. It supports single-hop swaps with
configurable fee tiers and slippage protection.


## State Variables
### uniswapRouter
The Uniswap V3 router contract used for executing swaps


```solidity
IUniswapSwapRouterLike public immutable uniswapRouter
```


### quoter
The Uniswap V3 quoter contract used for price quotes


```solidity
IUniswapQuoterLike public immutable quoter
```


## Functions
### constructor

Constructs the UniswapV3Swapper contract


```solidity
constructor(IUniswapSwapRouterLike uniswapRouter_, IUniswapQuoterLike quoter_) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`uniswapRouter_`|`IUniswapSwapRouterLike`|The address of the Uniswap V3 router contract|
|`quoter_`|`IUniswapQuoterLike`|The address of the Uniswap V3 quoter contract|


### swap

Swaps tokens using Uniswap V3

Executes a single-hop token swap through Uniswap V3 with the specified parameters.
The function validates inputs, approves tokens, and executes the swap through the router.


```solidity
function swap(
    address assetIn,
    uint256 amountIn,
    address assetOut,
    uint256 minAmountOut,
    address recipient,
    bytes calldata swapperParams
)
    public
    virtual
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|The address of the input token to swap from|
|`amountIn`|`uint256`|The amount of input tokens to swap|
|`assetOut`|`address`|The address of the output token to swap to|
|`minAmountOut`|`uint256`|The minimum amount of output tokens expected (slippage protection)|
|`recipient`|`address`|The address that will receive the output tokens|
|`swapperParams`|`bytes`|ABI-encoded SwapperParams struct containing the fee tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The actual amount of output tokens received from the swap|


### getAmountOut

Quotes the amount of output tokens for a given input

Uses the Uniswap V3 quoter to estimate the output amount without executing the swap.
This is useful for price discovery and slippage calculations.


```solidity
function getAmountOut(
    address assetIn,
    uint256 amountIn,
    address assetOut,
    bytes calldata swapperParams
)
    public
    virtual
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|The address of the input token|
|`amountIn`|`uint256`|The amount of input tokens|
|`assetOut`|`address`|The address of the output token|
|`swapperParams`|`bytes`|ABI-encoded SwapperParams struct containing the fee tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The estimated amount of output tokens|


## Errors
### ZeroAddress
Thrown when a zero address is provided where a valid address is required


```solidity
error ZeroAddress();
```

### IdenticalAddresses
Thrown when identical addresses are provided for input and output tokens


```solidity
error IdenticalAddresses();
```

### InsufficientInputAmount
Thrown when the input amount is zero or invalid


```solidity
error InsufficientInputAmount();
```

### InsufficientOutputAmount
Thrown when the output amount is below the minimum required


```solidity
error InsufficientOutputAmount();
```

## Structs
### SwapperParams
Parameters required for Uniswap V3 swaps


```solidity
struct SwapperParams {
    uint24 fee; // The fee tier of the Uniswap V3 pool to be used for the swap
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`|The fee tier of the Uniswap V3 pool to be used for the swap|

