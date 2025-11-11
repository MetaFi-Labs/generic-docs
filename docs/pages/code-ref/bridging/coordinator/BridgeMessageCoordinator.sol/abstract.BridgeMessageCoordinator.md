# BridgeMessageCoordinator
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/BridgeMessageCoordinator.sol)

**Inherits:**
[BaseBridgeCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BaseBridgeCoordinator.sol/abstract.BaseBridgeCoordinator.md)


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
    nonReentrant
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


### rollback

Initiates a rollback of a failed inbound bridge operation

Validates the failed message and sends a rollback message to the source chain


```solidity
function rollback(
    uint16 bridgeType,
    uint256 originalChainId,
    bytes calldata originalMessageData,
    bytes32 originalMessageId,
    bytes calldata bridgeParams
)
    external
    payable
    nonReentrant
    returns (bytes32 rollbackMessageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol to use (must have registered adapter)|
|`originalChainId`|`uint256`|The chain id of the failed message|
|`originalMessageData`|`bytes`|The original bridge message data that failed execution|
|`originalMessageId`|`bytes32`|Unique identifier of the original cross-chain message|
|`bridgeParams`|`bytes`|Protocol-specific parameters required by the bridge adapter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rollbackMessageId`|`bytes32`|Unique identifier for tracking the rollback cross-chain message|


### _settleInboundBridgeMessage

Settles an inbound bridge message

Decodes the bridge message and releases units to the recipient on this chain


```solidity
function _settleInboundBridgeMessage(bytes memory messageData, bytes32 messageId) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageData`|`bytes`|The encoded bridge message containing recipient and amount data|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


### encodeBridgeMessage

Encodes a BRIDGE type message for cross-chain transmission


```solidity
function encodeBridgeMessage(BridgeMessage memory message) public pure returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`message`|`BridgeMessage`|The BridgeMessage struct containing bridge details|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The ABI-encoded message ready for dispatch|


## Events
### BridgedOut
Emitted when units are bridged out to another chain


```solidity
event BridgedOut(
    address sender,
    address indexed owner,
    bytes32 indexed remoteRecipient,
    uint256 amount,
    bytes32 indexed messageId,
    BridgeMessage messageData
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address that initiated the bridge operation|
|`owner`|`address`|The address on this chain on whose behalf the units are bridged|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (as bytes32)|
|`amount`|`uint256`|The amount of units being bridged|
|`messageId`|`bytes32`|Unique identifier for tracking the bridge message|
|`messageData`|`BridgeMessage`|The encoded bridge message|

### BridgedIn
Emitted when units are bridged in from another chain


```solidity
event BridgedIn(
    bytes32 indexed remoteSender,
    address indexed recipient,
    uint256 amount,
    bytes32 indexed messageId,
    BridgeMessage messageData
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`remoteSender`|`bytes32`|The sender address on the source chain (as bytes32)|
|`recipient`|`address`|The recipient address on this chain that received the units|
|`amount`|`uint256`|The amount of units being bridged|
|`messageId`|`bytes32`|Unique identifier for tracking the bridge message|
|`messageData`|`BridgeMessage`|The encoded bridge message|

### BridgeRollbackedOut
Emitted when a rollback bridge operation is initiated


```solidity
event BridgeRollbackedOut(bytes32 indexed rollbackedMessageId, bytes32 indexed messageId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rollbackedMessageId`|`bytes32`|The original message ID that is being rollbacked|
|`messageId`|`bytes32`|The unique identifier for tracking the rollback message|

## Errors
### BridgeMessage_InvalidOnBehalf
Thrown when the decoded on-behalf address is zero


```solidity
error BridgeMessage_InvalidOnBehalf();
```

### BridgeMessage_InvalidRecipient
Thrown when the decoded recipient address is zero


```solidity
error BridgeMessage_InvalidRecipient();
```

### BridgeMessage_InvalidRemoteRecipient
Thrown when the remote recipient parameter is zero


```solidity
error BridgeMessage_InvalidRemoteRecipient();
```

### BridgeMessage_InvalidAmount
Thrown when the bridge amount is zero


```solidity
error BridgeMessage_InvalidAmount();
```

### BridgeMessage_NoFailedMessageExecution
Thrown when there is no recorded failed message execution for a given message ID


```solidity
error BridgeMessage_NoFailedMessageExecution();
```

### BridgeMessage_InvalidFailedMessageData
Thrown when the rollback message data does not match a failed message


```solidity
error BridgeMessage_InvalidFailedMessageData();
```

### BridgeMessage_InvalidMessageType
Thrown when the original message is not of type BRIDGE


```solidity
error BridgeMessage_InvalidMessageType();
```

### BridgeMessage_NoSenderToRollback
Thrown when there is no sender address to rollback to


```solidity
error BridgeMessage_NoSenderToRollback();
```

