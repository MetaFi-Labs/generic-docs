# IController
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IController.sol)

Interface for the Controller contract that handles conversion logic and share token operations

This interface defines the core functionality for asset-to-share conversion calculations
and share token minting/burning. The Controller is called by vaults to perform
conversion logic while the vaults themselves handle asset transfers


## Functions
### vaultFor

Returns the address of the Vault for the given asset


```solidity
function vaultFor(address asset) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the associated Vault|


### share

Returns the address of the share token contract


```solidity
function share() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the share token|


### deposit

Calculates shares to mint and mints share tokens based on deposited assets

Called by vaults after they receive asset transfers. Handles conversion logic and share minting


```solidity
function deposit(uint256 assets, address receiver) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited into the vault|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares minted to the receiver|


### mint

Calculates required assets and mints specified shares to receiver

Called by vaults to determine asset requirements and mint share tokens


```solidity
function mint(uint256 shares, address receiver) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to mint|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets required from the vault for the minted shares|


### withdraw

Calculates shares to burn and burns them for asset withdrawal

Called by vaults before they transfer assets. Handles conversion logic and share burning


```solidity
function withdraw(uint256 assets, address spender, address owner) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to be withdrawn by the vault|
|`spender`|`address`|The address that is burning the shares|
|`owner`|`address`|The address that owns the shares being burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burned from the owner|


### redeem

Burns specified shares and calculates equivalent asset amount

Called by vaults to burn share tokens and determine asset transfer amounts


```solidity
function redeem(uint256 shares, address spender, address owner) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to burn|
|`spender`|`address`|The address that is burning the shares|
|`owner`|`address`|The address that owns the shares being burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets the vault should transfer to the receiver|


### previewDeposit

Calculates the amount of shares that would be minted for a given asset amount


```solidity
function previewDeposit(uint256 assets) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to calculate shares for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be minted|


### previewMint

Calculates the amount of assets required to mint a specified amount of shares


```solidity
function previewMint(uint256 shares) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to calculate asset requirements for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets required to mint the specified shares|


### previewWithdraw

Calculates the amount of shares that would be burned for a given asset withdrawal


```solidity
function previewWithdraw(uint256 assets) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to calculate share burn for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be burned|


### previewRedeem

Calculates the amount of assets equivalent to burning specified shares


```solidity
function previewRedeem(uint256 shares) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to calculate asset equivalent for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets equivalent to the specified shares|


### maxDeposit

Returns the maximum amount of assets that can be processed for share minting


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
|`<none>`|`uint256`|The maximum amount of assets that can be converted to shares|


### maxMint

Returns the maximum amount of shares that can be minted to the receiver


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

Returns the maximum amount of assets that can be processed for share burning


```solidity
function maxWithdraw(address owner, uint256 availableAssets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the shares|
|`availableAssets`|`uint256`|The amount of assets currently available in the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of assets that can be withdrawn through share burning|


### maxRedeem

Returns the maximum amount of shares that can be burned by the owner


```solidity
function maxRedeem(address owner, uint256 availableAssets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the shares|
|`availableAssets`|`uint256`|The amount of assets currently available in the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of shares that can be redeemed|


