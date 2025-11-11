# BridgeCoordinator
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/BridgeCoordinator.sol)

**Inherits:**
[BaseBridgeCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BaseBridgeCoordinator.sol/abstract.BaseBridgeCoordinator.md), [AdapterManager](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/AdapterManager.sol/abstract.AdapterManager.md), [EmergencyManager](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/EmergencyManager.sol/abstract.EmergencyManager.md), [BridgeMessageCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BridgeMessageCoordinator.sol/abstract.BridgeMessageCoordinator.md)

Coordinates cross-chain bridging of Generic unit tokens through multiple bridge protocols

Base implementation that handles routing between bridge adapters and manages cross-chain operations.
Inheriting contracts should override _restrictUnits and _releaseUnits for custom token logic.


## Functions
### constructor

Constructor that disables initializers for the implementation contract

Prevents the implementation contract from being initialized directly


```solidity
constructor() ;
```

### initialize

Initializes the BridgeCoordinator with Generic unit token and admin

Can only be called once due to initializer modifier


```solidity
function initialize(address _genericUnit, address _admin) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_genericUnit`|`address`|The address of the Generic unit token to be managed by this coordinator|
|`_admin`|`address`|The address to be granted DEFAULT_ADMIN_ROLE for managing the coordinator|


### _dispatchMessage

Dispatches a cross-chain message via the specified bridge adapter

Internal function called by bridge and rollback functions to send messages


```solidity
function _dispatchMessage(
    uint16 bridgeType,
    uint256 chainId,
    bytes memory messageData,
    bytes calldata bridgeParams
)
    internal
    override
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol to use|
|`chainId`|`uint256`|The destination chain ID|
|`messageData`|`bytes`|The encoded bridge message data to be sent|
|`bridgeParams`|`bytes`|Protocol-specific parameters required by the bridge adapter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


### settleInboundMessage

Settles an inbound message

Called by bridge adapters (either current or inbound-only) when receiving cross-chain messages.
Validates that both the calling adapter and remote sender are authorized for the bridge type and chain


```solidity
function settleInboundMessage(
    uint16 bridgeType,
    uint256 chainId,
    bytes32 remoteSender,
    bytes calldata messageData,
    bytes32 messageId
)
    external
    nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol that received the message|
|`chainId`|`uint256`|The source chain ID where the bridge operation originated|
|`remoteSender`|`bytes32`|The original sender address on the source chain (encoded as bytes32)|
|`messageData`|`bytes`|The encoded bridge message containing recipient and amount data|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


### trySettleInboundMessage

This function processes incoming messages from other chains and executes the payload

Attempts to settle an inbound cross-chain message by executing the contained call data


```solidity
function trySettleInboundMessage(bytes calldata messageData, bytes32 messageId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageData`|`bytes`|The inbound message containing execution parameters and call data|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


## Events
### MessageOut
Emitted when a cross-chain message is dispatched


```solidity
event MessageOut(
    uint16 indexed bridgeType, uint256 indexed destChainId, bytes32 indexed messageId, bytes messageData
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The type of bridge protocol used for the operation|
|`destChainId`|`uint256`|The destination chain ID|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|
|`messageData`|`bytes`||

### MessageIn
Emitted when a cross-chain message is received


```solidity
event MessageIn(
    uint16 indexed bridgeType, uint256 indexed srcChainId, bytes32 indexed messageId, bytes messageData
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The type of bridge protocol used for the operation|
|`srcChainId`|`uint256`|The source chain ID|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|
|`messageData`|`bytes`||

### MessageExecutionFailed
Emitted when execution of an inbound message fails


```solidity
event MessageExecutionFailed(bytes32 indexed messageId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Unique identifier for tracking the failed message|

## Errors
### ZeroGenericUnit
Thrown when Generic unit token address is zero during initialization


```solidity
error ZeroGenericUnit();
```

### ZeroAdmin
Thrown when admin address is zero during initialization


```solidity
error ZeroAdmin();
```

### NoOutboundLocalBridgeAdapter
Thrown when no outbound local bridge adapter is configured for the specified bridge type


```solidity
error NoOutboundLocalBridgeAdapter();
```

### NoOutboundRemoteBridgeAdapter
Thrown when no outbound remote bridge adapter is configured for the bridge type and chain ID


```solidity
error NoOutboundRemoteBridgeAdapter();
```

### OnlyLocalAdapter
Thrown when caller is not the expected local bridge adapter


```solidity
error OnlyLocalAdapter();
```

### OnlyRemoteAdapter
Thrown when remote sender is not the expected remote bridge adapter


```solidity
error OnlyRemoteAdapter();
```

### CallerNotSelf
Thrown when tryReleaseTokens is called by an external address


```solidity
error CallerNotSelf();
```

### UnsupportedMessageType
Thrown when an unsupported message type is encountered during inbound settlement


```solidity
error UnsupportedMessageType(uint8 messageType);
```

