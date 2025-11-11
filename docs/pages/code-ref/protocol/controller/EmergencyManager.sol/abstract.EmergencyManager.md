# EmergencyManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/EmergencyManager.sol)

**Inherits:**
[BaseController](/code-ref/protocol/controller/BaseController.sol/abstract.BaseController.md)

Abstract contract that provides emergency functionality for protocol operations

Inherits from BaseController and implements pausable functionality with role-based access control
The contract allows authorized users with EMERGENCY_MANAGER_ROLE to pause/unpause critical operations


## State Variables
### EMERGENCY_MANAGER_ROLE
Role identifier for addresses authorized to pause/unpause the contract


```solidity
bytes32 public constant EMERGENCY_MANAGER_ROLE = keccak256("EMERGENCY_MANAGER_ROLE")
```


## Functions
### notPaused

Modifier that restricts function execution to when the contract is not paused


```solidity
modifier notPaused() ;
```

### _notPaused


```solidity
function _notPaused() internal view;
```

### __EmergencyManager_init

Internal initializer function for the EmergencyManager contract

Can only be called during contract initialization
Currently empty but reserved for future initialization logic


```solidity
function __EmergencyManager_init() internal onlyInitializing;
```

### pause

Pauses the contract, preventing execution of functions with the notPaused modifier

Can only be called by addresses with the EMERGENCY_MANAGER_ROLE


```solidity
function pause() external onlyRole(EMERGENCY_MANAGER_ROLE);
```

### unpause

Unpauses the contract, allowing execution of functions with the notPaused modifier

Can only be called by addresses with the EMERGENCY_MANAGER_ROLE


```solidity
function unpause() external onlyRole(EMERGENCY_MANAGER_ROLE);
```

### allowSkipNextRebalanceSafetyBufferCheck

Flag to allow skipping the safety buffer check on the next rebalance operation

This can be used in emergency situations where the safety buffer check needs to be bypassed


```solidity
function allowSkipNextRebalanceSafetyBufferCheck() external onlyRole(EMERGENCY_MANAGER_ROLE);
```

## Events
### Paused
Emitted when the contract is paused


```solidity
event Paused();
```

### Unpaused
Emitted when the contract is unpaused


```solidity
event Unpaused();
```

### SkipNextRebalanceSafetyBufferCheckAllowed
Emitted when skipping the next rebalance safety buffer check is allowed


```solidity
event SkipNextRebalanceSafetyBufferCheckAllowed();
```

## Errors
### EmergencyManager_ControllerPaused
Thrown when attempting to execute a function that requires the contract to be unpaused


```solidity
error EmergencyManager_ControllerPaused();
```

### EmergencyManager_NotPaused
Thrown when attempting to unpause a contract that is not currently paused


```solidity
error EmergencyManager_NotPaused();
```

### EmergencyManager_AlreadyPaused
Thrown when attempting to pause a contract that is already paused


```solidity
error EmergencyManager_AlreadyPaused();
```

### EmergencyManager_AlreadyAllowedToSkipNextRebalanceSafetyBufferCheck
Thrown when attempting to allow skipping the next rebalance safety buffer check
when it is already allowed


```solidity
error EmergencyManager_AlreadyAllowedToSkipNextRebalanceSafetyBufferCheck();
```

