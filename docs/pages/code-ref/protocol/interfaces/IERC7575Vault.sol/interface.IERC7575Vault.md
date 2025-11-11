# IERC7575Vault
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IERC7575Vault.sol)

Interface for ERC7575-compliant vault contracts

This interface defines the core vault operations for managing individual collateral assets
within the multi-asset ecosystem.


## Functions
### share

Returns the address of the share token


```solidity
function share() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the share token contract|


### asset

Returns the address of the underlying asset token

Each vault manages a single underlying asset


```solidity
function asset() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the underlying asset ERC20 contract|


### totalAssets

Returns the total amount of underlying assets managed by the vault

This includes assets held directly in the vault plus assets deployed to yield strategies


```solidity
function totalAssets() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total amount of underlying assets in the vault's management|


### convertToShares

Converts an amount of assets to the equivalent amount of shares

Returns the exchange rate between vault shares and underlying assets.
Always returns a 1:1 ratio because to calculate the proper value via dynamic pricing,
the contract would need to know if it's a deposit or withdraw operation.


```solidity
function convertToShares(uint256 assets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The equivalent amount of shares|


### convertToAssets

Converts an amount of shares to the equivalent amount of assets

Returns the exchange rate between vault shares and underlying assets.
Always returns a 1:1 ratio because to calculate the proper value via dynamic pricing,
the contract would need to know if it's a deposit or withdraw operation.


```solidity
function convertToAssets(uint256 shares) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The equivalent amount of underlying assets|


### deposit

Deposits assets into the vault and mints shares to the receiver


```solidity
function deposit(uint256 assets, address receiver) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets to deposit|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares minted (calculated using dynamic pricing)|


### mint

Mints a specific amount of shares by depositing the required assets


```solidity
function mint(uint256 shares, address receiver) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The exact amount of shares to mint|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets required and deposited|


### withdraw

Withdraws a specific amount of assets by burning the required shares


```solidity
function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The exact amount of underlying assets to withdraw|
|`receiver`|`address`|The address that will receive the withdrawn assets|
|`owner`|`address`|The address that owns the shares to be burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burned (calculated using dynamic pricing)|


### redeem

Burns shares and withdraws the equivalent amount of assets


```solidity
function redeem(uint256 shares, address receiver, address owner) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to burn|
|`receiver`|`address`|The address that will receive the withdrawn assets|
|`owner`|`address`|The address that owns the shares to be burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets withdrawn (calculated using dynamic pricing)|


### previewDeposit

Simulates the effects of a deposit without executing it

Calculates how many shares would be minted for a given asset deposit
using current dynamic pricing from the Controller


```solidity
function previewDeposit(uint256 assets) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets to simulate depositing|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be minted|


### previewMint

Simulates the effects of a mint without executing it

Calculates how many assets would be required to mint a given amount of shares
using current dynamic pricing from the Controller


```solidity
function previewMint(uint256 shares) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to simulate minting|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets that would be required|


### previewWithdraw

Simulates the effects of a withdrawal without executing it

Calculates how many shares would be burned for a given asset withdrawal
using current dynamic pricing from the Controller


```solidity
function previewWithdraw(uint256 assets) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets to simulate withdrawing|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be burned|


### previewRedeem

Simulates the effects of a redemption without executing it

Calculates how many assets would be withdrawn for a given amount of shares
using current dynamic pricing from the Controller


```solidity
function previewRedeem(uint256 shares) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to simulate redeeming|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying assets that would be withdrawn|


### maxDeposit

Returns the maximum amount of assets that can be deposited for a given receiver

Takes into account vault capacity limits


```solidity
function maxDeposit(address receiver) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address that would receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of underlying assets that can be deposited|


### maxMint

Returns the maximum amount of shares that can be minted for a given receiver

Takes into account vault capacity limits


```solidity
function maxMint(address receiver) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address that would receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of shares that can be minted|


### maxWithdraw

Returns the maximum amount of assets that can be withdrawn by a given owner

Takes into account owner's share balance and vault capacity limits


```solidity
function maxWithdraw(address owner) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the shares to be burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of underlying assets that can be withdrawn|


### maxRedeem

Returns the maximum amount of shares that can be redeemed by a given owner

Takes into account owner's share balance and vault capacity limits


```solidity
function maxRedeem(address owner) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the shares to be burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of shares that can be redeemed|


## Events
### Deposit
Emitted when assets are deposited into the vault

This event follows the ERC7575 standard for deposit operations


```solidity
event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address that initiated the deposit transaction|
|`owner`|`address`|The address that will own the minted shares (same as receiver in this implementation)|
|`assets`|`uint256`|The amount of underlying assets deposited|
|`shares`|`uint256`|The amount of shares minted (calculated using dynamic pricing)|

### Withdraw
Emitted when assets are withdrawn from the vault

This event follows the ERC7575 standard for withdrawal operations


```solidity
event Withdraw(
    address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address that initiated the withdrawal transaction|
|`receiver`|`address`|The address that receives the withdrawn assets|
|`owner`|`address`|The address that owns the shares being redeemed|
|`assets`|`uint256`|The amount of underlying assets withdrawn|
|`shares`|`uint256`|The amount of shares burned (calculated using dynamic pricing)|

