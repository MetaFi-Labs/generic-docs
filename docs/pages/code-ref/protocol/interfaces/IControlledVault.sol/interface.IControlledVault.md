# IControlledVault
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IControlledVault.sol)

Interface for vaults that can be managed by a controller contract

This interface enables controller contracts to interact with and manage vault operations,
particularly for rebalancing and asset management purposes. Implementing contracts must
ensure proper access control to prevent unauthorized operations.


## Functions
### asset

Returns the address of the underlying asset managed by the vault

This is typically an ERC20 token address that the vault holds and manages


```solidity
function asset() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the underlying asset|


### controller

Returns the address of the controller contract that manages this vault

The controller has special privileges to perform operations like rebalancing


```solidity
function controller() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the controller contract|


### totalNormalizedAssets

Returns the total amount of normalized assets held by the vault

Normalized assets are standardized to 18 decimals regardless of the underlying
asset's actual decimal places. The vault automatically scales asset amounts
up or down to maintain this 18-decimal standard for consistent cross-vault
calculations and comparisons


```solidity
function totalNormalizedAssets() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total normalized asset amount (always in 18 decimals)|


### controllerWithdraw

Withdraws a specified amount of assets from the vault by controller

This function can only be called by the designated controller contract.
It's typically used during rebalancing operations to redistribute assets
across different vaults.


```solidity
function controllerWithdraw(address asset, uint256 assets, address receiver) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to withdraw (can be a reward token)|
|`assets`|`uint256`|The amount of assets to withdraw (in asset's native decimals)|
|`receiver`|`address`|The address that will receive the withdrawn assets|


### controllerDeposit

Deposits a specified amount of assets into the vault by controller

This function can only be called by the designated controller contract.
It's typically used to add assets back into the vault following a rebalancing operation.


```solidity
function controllerDeposit(uint256 assets) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to deposit (in asset's native decimals)|


## Events
### ControllerWithdraw
Emitted when assets are withdrawn from the vault by the controller

This event is triggered when the controller initiates a withdrawal for
rebalancing operations or rewards swapping activities


```solidity
event ControllerWithdraw(address indexed asset, uint256 assets, address indexed receiver);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset withdrawn (can be a reward token)|
|`assets`|`uint256`|The amount of assets withdrawn from the vault|
|`receiver`|`address`|The address that received the withdrawn assets|

### ControllerDeposit
Emitted when assets are deposited into the vault by the controller

This event is triggered when the controller deposits assets into the vault
for rebalancing operations or following rewards swapping activities


```solidity
event ControllerDeposit(uint256 assets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets deposited into the vault|

## Errors
### CallerNotController
Thrown when a caller other than the designated controller attempts to perform
a controller-only operation

This error ensures that only the authorized controller can execute sensitive
vault management functions


```solidity
error CallerNotController();
```

