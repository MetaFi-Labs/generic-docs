# IOneInchAggregationRouterLike
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IOneInchAggregationRouterLike.sol)

Interface for interacting with 1inch Aggregation Router contracts

This interface defines the essential functions and data structures needed
to interact with 1inch protocol for token swapping operations


## Functions
### swap

Executes a token swap through the 1inch aggregation protocol

This function performs the actual token swap using the provided parameters
and swap data. It supports complex multi-hop swaps and various DEX protocols.


```solidity
function swap(
    address executor,
    SwapDescription calldata desc,
    bytes calldata data
)
    external
    payable
    returns (uint256 returnAmount, uint256 spentAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`executor`|`address`|The address authorized to execute the swap operation|
|`desc`|`SwapDescription`|The swap description containing all swap parameters|
|`data`|`bytes`|Additional swap execution data required by the specific swap route|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`returnAmount`|`uint256`|The actual amount of destination tokens received|
|`spentAmount`|`uint256`|The actual amount of source tokens consumed in the swap|


## Structs
### SwapDescription
Parameters that describe a token swap operation


```solidity
struct SwapDescription {
    address srcToken;
    address dstToken;
    address payable srcReceiver;
    address payable dstReceiver;
    uint256 amount;
    uint256 minReturnAmount;
    uint256 flags;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`srcToken`|`address`|The address of the source token to be swapped|
|`dstToken`|`address`|The address of the destination token to receive|
|`srcReceiver`|`address payable`|The address that will receive any leftover source tokens|
|`dstReceiver`|`address payable`|The address that will receive the swapped destination tokens|
|`amount`|`uint256`|The amount of source tokens to swap|
|`minReturnAmount`|`uint256`|The minimum amount of destination tokens expected|
|`flags`|`uint256`|Configuration flags that control various swap options and behaviors|

