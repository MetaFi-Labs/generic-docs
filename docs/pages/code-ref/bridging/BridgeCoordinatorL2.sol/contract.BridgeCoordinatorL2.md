# BridgeCoordinatorL2
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/BridgeCoordinatorL2.sol)

**Inherits:**
[BridgeCoordinator](/code-ref/bridging/coordinator/BridgeCoordinator.sol/abstract.BridgeCoordinator.md)

L2-specific implementation of bridge coordinator that burns/mints units instead of transferring

Extends BridgeCoordinator with proper token lifecycle management for L2 deployments.
Burns units when bridging out and mints units when bridging in, maintaining total supply consistency.


## Functions
### _restrictUnits

Burns units when bridging out from L2

Overrides base implementation to burn units


```solidity
function _restrictUnits(address whitelabel, address owner, uint256 amount) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|
|`owner`|`address`|The address that owns the units to be burned|
|`amount`|`uint256`|The amount of units to burn|


### _releaseUnits

Mints units when bridging in to L2

Overrides base implementation to mint new units


```solidity
function _releaseUnits(address whitelabel, address receiver, uint256 amount) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|
|`receiver`|`address`|The address that should receive the newly minted units|
|`amount`|`uint256`|The amount of units to mint|


