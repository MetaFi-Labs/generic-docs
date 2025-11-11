# IBridgeCoordinatorL1Outbound
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IBridgeCoordinatorL1Outbound.sol)

Interface for the L1 outbound bridge coordinator that manages cross-chain transfers

Handles outbound bridging operations from Layer 1 to destination chains for GUSD transfers


## Functions
### bridge

Bridges Generic units to another chain using the specified bridge protocol

Restricts units on this chain and sends a message to release equivalent units on destination chain


```solidity
function bridge(
    uint16 bridgeType,
    uint256 chainId,
    address onBehalf,
    bytes32 remoteRecipient,
    address sourceWhitelabel,
    bytes32 destinationWhitelabel,
    uint256 amount,
    bytes calldata bridgeParams
)
    external
    payable
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol to use (must have registered adapter)|
|`chainId`|`uint256`|The destination chain ID|
|`onBehalf`|`address`|The address on this chain on whose behalf the units are bridged|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`sourceWhitelabel`|`address`|The whitelabeled unit token address on this chain, or zero address for native unit token|
|`destinationWhitelabel`|`bytes32`|The whitelabeled unit token address on the destination chain (encoded as bytes32)|
|`amount`|`uint256`|The amount of units to bridge|
|`bridgeParams`|`bytes`|Protocol-specific parameters required by the bridge adapter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


### predeposit

Predeposits units for bridging to another chain

Restricts units on this chain to be bridged later via bridgePredeposit


```solidity
function predeposit(
    bytes32 chainNickname,
    address onBehalf,
    bytes32 remoteRecipient,
    uint256 amount
)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the destination chain|
|`onBehalf`|`address`|The address on behalf of which the predeposit is made|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`amount`|`uint256`|The amount of units to predeposit|


