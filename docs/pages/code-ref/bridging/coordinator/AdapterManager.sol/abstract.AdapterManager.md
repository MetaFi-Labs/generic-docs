# AdapterManager
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/AdapterManager.sol)

**Inherits:**
[BaseBridgeCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BaseBridgeCoordinator.sol/abstract.BaseBridgeCoordinator.md)


## State Variables
### ADAPTER_MANAGER_ROLE
The role that manages bridge configuration


```solidity
bytes32 public constant ADAPTER_MANAGER_ROLE = keccak256("ADAPTER_MANAGER_ROLE")
```


## Functions
### setIsLocalBridgeAdapter

Sets a local bridge adapter for a specific bridge type

Only callable by ADAPTER_MANAGER_ROLE. Validates adapter configuration if non-zero address provided.
Cannot remove the current outbound adapter.


```solidity
function setIsLocalBridgeAdapter(
    uint16 bridgeType,
    IBridgeAdapter adapter,
    bool isAdapter
)
    external
    onlyRole(ADAPTER_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`adapter`|`IBridgeAdapter`|The local bridge adapter address|
|`isAdapter`|`bool`|Whether to add or remove the adapter from the adapter list|


### setIsRemoteBridgeAdapter

Sets a remote bridge adapter for a specific bridge type and chain

Only callable by ADAPTER_MANAGER_ROLE. Cannot remove the current outbound adapter.


```solidity
function setIsRemoteBridgeAdapter(
    uint16 bridgeType,
    uint256 chainId,
    bytes32 adapter,
    bool isAdapter
)
    external
    onlyRole(ADAPTER_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The destination chain ID|
|`adapter`|`bytes32`|The remote bridge adapter address (encoded as bytes32)|
|`isAdapter`|`bool`|Whether to add or remove the adapter from the adapter list|


### setOutboundLocalBridgeAdapter

Sets an existing adapter as the outbound local bridge adapter for a specific bridge type

Only callable by ADAPTER_MANAGER_ROLE.


```solidity
function setOutboundLocalBridgeAdapter(
    uint16 bridgeType,
    IBridgeAdapter adapter
)
    external
    onlyRole(ADAPTER_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`adapter`|`IBridgeAdapter`|The new outbound local bridge adapter contract|


### setOutboundRemoteBridgeAdapter

Sets an existing adapter as the outbound remote bridge adapter for a specific bridge type and chain

Only callable by ADAPTER_MANAGER_ROLE.


```solidity
function setOutboundRemoteBridgeAdapter(
    uint16 bridgeType,
    uint256 chainId,
    bytes32 adapter
)
    external
    onlyRole(ADAPTER_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The destination chain ID|
|`adapter`|`bytes32`|The new outbound remote bridge adapter address (encoded as bytes32)|


## Events
### LocalBridgeAdapterUpdated
Emitted when a local bridge adapter's status is updated


```solidity
event LocalBridgeAdapterUpdated(uint16 indexed bridgeType, address indexed adapter, bool isAdapter);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`adapter`|`address`|The local bridge adapter address|
|`isAdapter`|`bool`|The new status of the adapter|

### RemoteBridgeAdapterUpdated
Emitted when a remote bridge adapter's status is updated


```solidity
event RemoteBridgeAdapterUpdated(
    uint16 indexed bridgeType, uint256 indexed chainId, bytes32 indexed adapter, bool isAdapter
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The remote chain ID|
|`adapter`|`bytes32`|The remote bridge adapter address (encoded as bytes32)|
|`isAdapter`|`bool`|The new status of the adapter|

### LocalOutboundBridgeAdapterUpdated
Emitted when the outbound local bridge adapter is updated


```solidity
event LocalOutboundBridgeAdapterUpdated(uint16 indexed bridgeType, address indexed adapter);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`adapter`|`address`|The new local bridge adapter address|

### RemoteOutboundBridgeAdapterUpdated
Emitted when the outbound remote bridge adapter is updated


```solidity
event RemoteOutboundBridgeAdapterUpdated(
    uint16 indexed bridgeType, uint256 indexed chainId, bytes32 indexed adapter
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The remote chain ID|
|`adapter`|`bytes32`|The new remote bridge adapter address (encoded as bytes32)|

## Errors
### CoordinatorMismatch
Thrown when bridge adapter's coordinator doesn't match this contract


```solidity
error CoordinatorMismatch();
```

### BridgeTypeMismatch
Thrown when bridge adapter's type doesn't match the expected type


```solidity
error BridgeTypeMismatch();
```

### IsOutboundAdapter
Thrown when attempting to remove the outbound adapter from the adapter list


```solidity
error IsOutboundAdapter();
```

### IsNotAdapter
Thrown when the new outbound adapter is not in the adapter list


```solidity
error IsNotAdapter();
```

