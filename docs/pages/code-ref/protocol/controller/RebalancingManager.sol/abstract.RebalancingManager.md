# RebalancingManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/RebalancingManager.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md), [AccountingLogic](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/AccountingLogic.sol/abstract.AccountingLogic.md)

Abstract contract that manages the rebalancing of assets between controlled vaults

This contract allows authorized users to rebalance assets from one vault to another,
with optional asset swapping if the vaults use different underlying assets.
It extends BaseController to inherit access control and common functionality.


## State Variables
### REBALANCING_MANAGER_ROLE
Role identifier for addresses authorized to perform rebalancing operations


```solidity
bytes32 public constant REBALANCING_MANAGER_ROLE = keccak256("REBALANCING_MANAGER_ROLE")
```


## Functions
### __RebalancingManager_init

Internal initializer for the RebalancingManager contract

This function is called during contract initialization and is marked as onlyInitializing
to ensure it can only be called once during the initialization process


```solidity
function __RebalancingManager_init() internal onlyInitializing;
```

### rebalance

Rebalances assets from one vault to another, with optional asset swapping


```solidity
function rebalance(
    address fromVault,
    uint256 fromAmount,
    address toVault,
    uint256 minToAmount,
    bytes calldata swapperData
)
    external
    nonReentrant
    onlyRole(REBALANCING_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromVault`|`address`|The address of the vault to withdraw assets from|
|`fromAmount`|`uint256`|The amount of assets to withdraw from the source vault|
|`toVault`|`address`|The address of the vault to deposit assets to|
|`minToAmount`|`uint256`|The minimum amount of assets expected to be deposited (slippage protection)|
|`swapperData`|`bytes`|Additional data passed to the swapper for asset conversion|


### _rebalanceSameAssets

Internal function to rebalance the same asset type between two vaults


```solidity
function _rebalanceSameAssets(
    address fromVault,
    address toVault,
    address asset,
    uint256 amount
)
    internal
    returns (uint256 toAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromVault`|`address`|The address of the vault to withdraw assets from|
|`toVault`|`address`|The address of the vault to deposit assets to|
|`asset`|`address`||
|`amount`|`uint256`|The amount of assets to rebalance between vaults|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`toAmount`|`uint256`|The actual amount of assets that were successfully rebalanced|


### _rebalanceDiffAssets

Internal function to rebalance different asset types between vaults with asset swapping.
The function includes multiple slippage protection mechanisms:
- Individual swap slippage protection via minToAmount
- Protocol-wide backing value slippage protection
- Safety buffer validation to ensure losses don't exceed acceptable limits


```solidity
function _rebalanceDiffAssets(
    address fromVault,
    address toVault,
    address fromAsset,
    address toAsset,
    uint256 fromAmount,
    uint256 minToAmount,
    bytes calldata swapperData
)
    internal
    returns (uint256 toAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromVault`|`address`|The address of the vault to withdraw assets from|
|`toVault`|`address`|The address of the vault to deposit assets to|
|`fromAsset`|`address`|The address of the asset being withdrawn from the source vault|
|`toAsset`|`address`|The address of the asset being deposited to the destination vault|
|`fromAmount`|`uint256`|The amount of assets to withdraw from the source vault|
|`minToAmount`|`uint256`|The minimum amount of destination assets expected (slippage protection)|
|`swapperData`|`bytes`|Additional data passed to the swapper for asset conversion|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`toAmount`|`uint256`|The actual amount of destination assets received and deposited|


## Events
### Rebalanced
Emitted when assets are successfully rebalanced between vaults


```solidity
event Rebalanced(address indexed fromVault, address indexed toVault, uint256 fromAmount, uint256 toAmount);
```

## Errors
### Rebalance_InvalidVault
Thrown when one or both of the provided vault addresses are not valid vaults


```solidity
error Rebalance_InvalidVault();
```

### Rebalance_SameVault
Thrown when attempting to rebalance between the same vault


```solidity
error Rebalance_SameVault();
```

### Rebalance_ZeroFromAmount
Thrown when the fromAmount parameter is zero


```solidity
error Rebalance_ZeroFromAmount();
```

### Rebalance_SlippageTooHigh
Thrown when the received amount is less than the minimum expected amount


```solidity
error Rebalance_SlippageTooHigh();
```

