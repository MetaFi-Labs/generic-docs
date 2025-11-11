# OneInchSwapper
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/periphery/swapper/OneInchSwapper.sol)

**Inherits:**
Ownable2Step, [ISwapper](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/interfaces/ISwapper.sol/interface.ISwapper.md)

A swapper implementation that integrates with 1inch Aggregation Router for token swaps

Implements the ISwapper interface to provide token swapping functionality through 1inch protocol


## State Variables
### oneInchRouter
The 1inch Aggregation Router contract used for executing swaps


```solidity
IOneInchAggregationRouterLike public immutable oneInchRouter
```


### allowedExecutors
This mapping tracks which addresses are permitted to execute 1inch swap operations


```solidity
mapping(address executor => bool) public allowedExecutors
```


## Functions
### constructor

Initializes the OneInchSwapper with the 1inch router address


```solidity
constructor(address owner, IOneInchAggregationRouterLike _oneInchRouter) Ownable(owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`||
|`_oneInchRouter`|`IOneInchAggregationRouterLike`|The address of the 1inch Aggregation Router contract|


### swap

Executes a token swap using the 1inch Aggregation Router

This function handles the complete swap process including approval, execution, and validation


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
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|The address of the input token to be swapped|
|`amountIn`|`uint256`|The amount of input tokens to swap|
|`assetOut`|`address`|The address of the output token to receive|
|`minAmountOut`|`uint256`|The minimum amount of output tokens expected|
|`recipient`|`address`|The address that will receive the output tokens|
|`swapperParams`|`bytes`|The transaction data obtained from the 1inch API /swap endpoint response. This parameter contains the encoded swap transaction data that should be passed directly to the 1inch router contract to execute the token swap.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The actual amount of output tokens received from the swap|


### setAllowedExecutor

Updates the allowance status for an executor address


```solidity
function setAllowedExecutor(address executor, bool allowed) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`executor`|`address`|The address to update the allowance for|
|`allowed`|`bool`|True to allow the address to be used as executor of the swap, false to disallow|


## Events
### ExecutorAuthorizationUpdated
Emitted when an executor's authorization status is updated


```solidity
event ExecutorAuthorizationUpdated(address indexed executor, bool allowed);
```

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

### PartialFill
Thrown when the swap does not use the entire input amount


```solidity
error PartialFill();
```

### UnauthorizedExecutor
Thrown when an unauthorized executor attempts to perform a swap


```solidity
error UnauthorizedExecutor();
```

### InvalidSwapDescription
Thrown when the swap description parameters do not match the expected values


```solidity
error InvalidSwapDescription();
```

