# EmergencyManager
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/EmergencyManager.sol)

**Inherits:**
[BaseBridgeCoordinator](/code-ref/bridging/coordinator/BaseBridgeCoordinator.sol/abstract.BaseBridgeCoordinator.md)


## State Variables
### EMERGENCY_MANAGER_ROLE
The role that manages emergency actions


```solidity
bytes32 public constant EMERGENCY_MANAGER_ROLE = keccak256("EMERGENCY_MANAGER_ROLE")
```


## Functions
### forceRemoveLocalBridgeAdapter

Emergency function to forcefully remove a local bridge adapter

Only callable by EMERGENCY_MANAGER_ROLE. Use with extreme caution as this will prevent any pending inbound
operations from this adapter


```solidity
function forceRemoveLocalBridgeAdapter(
    uint16 bridgeType,
    address adapter
)
    external
    onlyRole(EMERGENCY_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`adapter`|`address`|The local bridge adapter address to remove|


### forceRemoveRemoteBridgeAdapter

Emergency function to forcefully remove a remote bridge adapter

Only callable by EMERGENCY_MANAGER_ROLE. Use with extreme caution as this will prevent any pending inbound
operations from this adapter


```solidity
function forceRemoveRemoteBridgeAdapter(
    uint16 bridgeType,
    uint256 chainId,
    bytes32 adapter
)
    external
    onlyRole(EMERGENCY_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The remote chain ID|
|`adapter`|`bytes32`|The remote bridge adapter address to remove|


