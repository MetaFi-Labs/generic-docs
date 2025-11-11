# VaultLimitsLogic
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/VaultLimitsLogic.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md), [VaultManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/VaultManager.sol/abstract.VaultManager.md)

Provides logic for calculating vault deposit and withdrawal limits based on capacity and proportionality
constraints

Abstract contract that implements vault limit calculations considering:
- Maximum vault capacity limits
- Maximum proportionality limits (upper bound on vault's share of total assets)
- Minimum proportionality limits (lower bound on vault's share of total assets)
All calculations are performed using basis points (10,000 = 100%)


## Functions
### _maxDepositLimit

Calculates the maximum deposit limit for a specific vault

Determines the maximum amount that can be deposited to a vault considering:
- The vault's maximum capacity limit
- The vault's maximum proportionality constraint
- Other vaults' minimum proportionality constraints
Returns the minimum of all applicable limits


```solidity
function _maxDepositLimit(VaultsOverview memory overview, address vault) internal pure returns (uint256 max);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vault`|`address`|The address of the vault to calculate deposit limit for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`max`|`uint256`|The maximum amount that can be deposited to the vault|


### _maxWithdrawLimit

Calculates the maximum withdrawal limit for a specific vault

Determines the maximum amount that can be withdrawn from a vault considering:
- The vault's minimum proportionality constraint
- Other vaults' maximum proportionality constraints
Returns the minimum of all applicable limits


```solidity
function _maxWithdrawLimit(VaultsOverview memory overview, address vault) internal pure returns (uint256 max);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vault`|`address`|The address of the vault to calculate withdrawal limit for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`max`|`uint256`|The maximum amount that can be withdrawn from the vault|


### _maxDepositByThisVaultMaxCapacity

Calculates maximum deposit based on vault's capacity limit

Returns the remaining capacity before hitting the vault's maximum capacity limit


```solidity
function _maxDepositByThisVaultMaxCapacity(
    VaultsOverview memory overview,
    uint256 vaultIndex
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vaultIndex`|`uint256`|The index of the vault in the overview arrays|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum deposit amount based on capacity constraint, or type(uint256).max if no limit|


### _maxDepositByThisVaultMaxProportionality

Calculates maximum deposit based on vault's maximum proportionality limit

Determines how much can be deposited before the vault exceeds its maximum
proportionality relative to total protocol assets


```solidity
function _maxDepositByThisVaultMaxProportionality(
    VaultsOverview memory overview,
    uint256 vaultIndex
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vaultIndex`|`uint256`|The index of the vault in the overview arrays|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum deposit amount based on proportionality constraint|


### _maxDepositByOtherVaultMinProportionality

Calculates maximum deposit based on other vault's minimum proportionality requirement

Determines how much can be deposited to other vaults before target vault
falls below its minimum proportionality requirement


```solidity
function _maxDepositByOtherVaultMinProportionality(
    VaultsOverview memory overview,
    uint256 vaultIndex
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vaultIndex`|`uint256`|The index of the target vault in the overview arrays|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum deposit amount constrained by other vault's minimum proportionality|


### _maxWithdrawByThisVaultMinProportionality

Calculates maximum withdrawal based on vault's minimum proportionality requirement

Determines how much can be withdrawn from the vault while maintaining its
minimum proportionality relative to total protocol assets


```solidity
function _maxWithdrawByThisVaultMinProportionality(
    VaultsOverview memory overview,
    uint256 vaultIndex
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vaultIndex`|`uint256`|The index of the vault in the overview arrays|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum withdrawal amount based on minimum proportionality constraint|


### _maxWithdrawByOtherVaultMaxProportionality

Calculates maximum withdrawal based on other vault's maximum proportionality limit

Determines how much can be withdrawn from other vaults before target vault
exceeds its maximum proportionality relative to total protocol assets


```solidity
function _maxWithdrawByOtherVaultMaxProportionality(
    VaultsOverview memory overview,
    uint256 vaultIndex
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|The vaults overview containing current state snapshot|
|`vaultIndex`|`uint256`|The index of the target vault in the overview arrays|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum withdrawal amount constrained by other vault's maximum proportionality|


### _vaultAssetsDeltaToHitProportionality

Calculates the asset change needed for a vault to reach a target proportionality

Computes the signed change in assets needed for the vault to achieve the specified
proportionality limit. Positive values indicate assets to add, negative values indicate assets to remove


```solidity
function _vaultAssetsDeltaToHitProportionality(
    uint16 proportionalityLimit,
    uint256 vaultAssets,
    uint256 totalAssets
)
    internal
    pure
    returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proportionalityLimit`|`uint16`|The target proportionality in basis points (0 < limit < MAX_BPS)|
|`vaultAssets`|`uint256`|Current normalized assets in the vault|
|`totalAssets`|`uint256`|Total normalized assets across all vaults|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The signed change in assets needed (positive = deposit, negative = withdrawal)|


### _totalAssetsDeltaToHitProportionality

Calculates the total asset change needed for the target vault to reach a target proportionality

Computes the signed change in total protocol assets needed for the specified vault
to achieve the target proportionality


```solidity
function _totalAssetsDeltaToHitProportionality(
    uint16 proportionalityLimit,
    uint256 vaultAssets,
    uint256 totalAssets
)
    internal
    pure
    returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proportionalityLimit`|`uint16`|The target proportionality in basis points (0 < limit < MAX_BPS)|
|`vaultAssets`|`uint256`|Current normalized assets in the target vault|
|`totalAssets`|`uint256`|Total normalized assets across all vaults|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The signed change in total assets needed (positive = increase total, negative = decrease total)|


