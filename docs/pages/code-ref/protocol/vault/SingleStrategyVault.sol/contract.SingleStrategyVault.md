# SingleStrategyVault
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/vault/SingleStrategyVault.sol)

**Inherits:**
[ControlledERC7575Vault](/code-ref/protocol/vault/ControlledERC7575Vault.sol/contract.ControlledERC7575Vault.md)

A vault implementation that manages assets by depositing into a single ERC4626 vault

Extends ControlledERC7575Vault to provide automated allocation/deallocation functionality
The vault automatically allocates assets to the strategy when deposits exceed the threshold
and deallocates assets when withdrawals require more than the available unallocated balance


## State Variables
### _strategy
The ERC4626 vault used for yield generation


```solidity
IERC4626 private immutable _strategy
```


### _manager
The address authorized to manage allocations and vault parameters


```solidity
address private immutable _manager
```


### autoAllocationThreshold
The minimum amount of assets that triggers automatic allocation to the strategy


```solidity
uint256 public autoAllocationThreshold
```


## Functions
### constructor

Constructs a new SingleStrategyVault

Approves the strategy to spend unlimited vault assets for efficient deposits.
Manager can be zero address, in which case manual allocation/deallocation and threshold setting are disabled.
All deposits are automatically deployed to the strategy as default autoAllocationThreshold is zero.
Requirements:
- `strategy_` must not be the zero address
- `asset_` and `controller_` must satisfy ControlledERC7575Vault requirements


```solidity
constructor(
    IERC20 asset_,
    IController controller_,
    IERC4626 strategy_,
    address manager_
)
    ControlledERC7575Vault(asset_, controller_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|The underlying ERC20 asset that the vault accepts|
|`controller_`|`IController`|The controller contract that governs this vault|
|`strategy_`|`IERC4626`|The ERC4626 vault for yield generation (cannot be zero address)|
|`manager_`|`address`|The address authorized to manage vault operations.|


### strategy

Returns the address of the underlying ERC4626 vault


```solidity
function strategy() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the strategy contract|


### manager

Returns the address of the vault manager


```solidity
function manager() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address authorized to manage vault operations|


### allocate

Manually allocates vault assets to the underlying strategy

Only callable by the manager. Deposits assets into the strategy and receives strategy shares


```solidity
function allocate(uint256 assets) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to allocate to the strategy|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of strategy shares received in return|


### deallocate

Manually deallocates assets from the underlying strategy

Only callable by the manager. Withdraws assets from the strategy back to the vault


```solidity
function deallocate(uint256 assets) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to withdraw from the strategy|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of strategy shares burned in the process|


### setAutoAllocationThreshold

Sets the threshold for automatic allocation of deposited assets

Only callable by the manager. When deposits exceed this threshold,
assets are automatically allocated to the strategy


```solidity
function setAutoAllocationThreshold(uint256 threshold) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`threshold`|`uint256`|The minimum deposit amount that triggers automatic allocation|


### _allocate

Internal function to allocate assets to the strategy

Deposits assets into the strategy and emits an Allocate event


```solidity
function _allocate(uint256 assets) private returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to deposit into the strategy|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of strategy shares received|


### _deallocate

Internal function to deallocate assets from the strategy

Withdraws assets from the strategy to this vault and emits a Deallocate event


```solidity
function _deallocate(uint256 assets) private returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to withdraw from the strategy|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of strategy shares burned|


### _additionalOwnedAssets

Calculates assets owned by the vault but not held directly in the vault

Override from ControlledERC7575Vault. Returns only assets allocated to strategies,
not including assets held directly in the vault. Converts strategy shares to underlying asset value.


```solidity
function _additionalOwnedAssets() internal view override returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of underlying assets owned through strategy allocation (excluding vault balance)|


### _additionalAvailableAssets

Calculates the maximum assets immediately available for withdrawal

Override from ControlledERC7575Vault to include strategy liquidity


```solidity
function _additionalAvailableAssets() internal view override returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of assets that can be withdrawn without waiting|


### _beforeWithdraw

Hook executed before processing withdrawals to ensure sufficient liquidity

Override from ControlledERC7575Vault. Automatically deallocates from strategy if needed


```solidity
function _beforeWithdraw(uint256 assets) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets being withdrawn|


### _afterDeposit

Hook executed after processing deposits to potentially auto-allocate assets

Override from ControlledERC7575Vault. Automatically allocates to strategy if deposit exceeds threshold


```solidity
function _afterDeposit(uint256 assets) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited|


## Events
### Allocate
Emitted when assets are allocated to the strategy


```solidity
event Allocate(address strategy, uint256 assets);
```

### Deallocate
Emitted when assets are deallocated from the strategy


```solidity
event Deallocate(address strategy, uint256 assets);
```

### SetAutoAllocationThreshold
Emitted when the auto-allocation threshold is updated


```solidity
event SetAutoAllocationThreshold(uint256 threshold);
```

## Errors
### ZeroStrategy
Thrown when the strategy address is zero


```solidity
error ZeroStrategy();
```

### MismatchedAsset
Thrown when the strategy's asset does not match the vault's asset


```solidity
error MismatchedAsset();
```

### CallerNotManager
Thrown when caller is not the authorized manager


```solidity
error CallerNotManager();
```

