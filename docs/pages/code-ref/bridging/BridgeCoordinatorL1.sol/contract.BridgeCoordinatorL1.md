# BridgeCoordinatorL1
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/BridgeCoordinatorL1.sol)

**Inherits:**
[BridgeCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BridgeCoordinator.sol/abstract.BridgeCoordinator.md), [PredepositCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/PredepositCoordinator.sol/abstract.PredepositCoordinator.md)

L1-specific BridgeCoordinator that includes predeposit functionality and handles units locking/unlocking

Inherits from BridgeCoordinator and PredepositCoordinator to provide full bridge coordination
capabilities along with predeposit handling on Layer 1. Implements unit restriction and release logic
by transferring units to/from the coordinator contract, with support for whitelabeled units.


## Functions
### _restrictUnits

Lock units when bridging out

This function implements additional validation layers since whitelabel units could potentially
be malicious or poorly implemented.


```solidity
function _restrictUnits(address whitelabel, address owner, uint256 amount) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|
|`owner`|`address`|The address that owns the units to be restricted|
|`amount`|`uint256`|The amount of units to restrict|


### _releaseUnits

Unlock units when bridging in


```solidity
function _releaseUnits(address whitelabel, address receiver, uint256 amount) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|
|`receiver`|`address`|The address that should receive the released units|
|`amount`|`uint256`|The amount of units to release|


## Errors
### IncorrectEscrowBalance
Thrown when the amount of unit tokens restricted does not match the expected amount


```solidity
error IncorrectEscrowBalance();
```

