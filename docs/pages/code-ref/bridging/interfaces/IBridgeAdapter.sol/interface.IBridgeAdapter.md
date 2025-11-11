# IBridgeAdapter
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/interfaces/IBridgeAdapter.sol)

Standard interface that all bridge adapters must implement to integrate with the BridgeCoordinator

Adapters handle message passing, not token management. The coordinator controls routing and permissions.


## Functions
### bridge

Dispatches an outbound message through the underlying bridge implementation.


```solidity
function bridge(
    uint256 chainId,
    bytes32 remoteAdapter,
    bytes calldata message,
    address refundAddress,
    bytes calldata bridgeParams
)
    external
    payable
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|Destination chain identifier recognised by the adapter implementation.|
|`remoteAdapter`|`bytes32`|Encoded address or identifier of the remote adapter endpoint.|
|`message`|`bytes`|Payload forwarded to the remote coordinator for settlement.|
|`refundAddress`|`address`|Address to refund any excess fees or failed transactions.|
|`bridgeParams`|`bytes`|Adapter-specific parameters used to quote and configure the bridge call.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Identifier returned by the bridge transport for reconciliation.|


### estimateBridgeFee

Quotes the native fee required to execute a bridge call.


```solidity
function estimateBridgeFee(
    uint256 chainId,
    bytes calldata message,
    bytes calldata bridgeParams
)
    external
    view
    returns (uint256 nativeFee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|Destination chain identifier recognised by the adapter implementation.|
|`message`|`bytes`|Payload that will be forwarded to the remote coordinator for settlement.|
|`bridgeParams`|`bytes`|Adapter-specific parameters used to configure the bridge call.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`nativeFee`|`uint256`|Amount of native currency that must be supplied alongside the call.|


### bridgeType

Returns the unique identifier for the bridge protocol this adapter implements

This ensures the coordinator can route messages correctly based on bridge type


```solidity
function bridgeType() external view returns (uint16);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|The bridge type as a uint16|


### bridgeCoordinator

Returns the address of the bridge coordinator this adapter is connected to

This ensures all adapters maintain a reference to their coordinator for callbacks


```solidity
function bridgeCoordinator() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the BridgeCoordinator contract|


