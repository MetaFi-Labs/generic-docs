# IERC7575Share
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IERC7575Share.sol)

**Inherits:**
IERC20, IERC165

Interface for ERC-7575 share functionality.
The share token MUST return the constant value true if `0xf815c03d` is passed through the interfaceID argument.


## Functions
### vault

Returns the address of the Vault for the given asset.


```solidity
function vault(address asset) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the associated Vault.|


## Events
### VaultUpdate
Emitted when a vault is updated for a specific asset.


```solidity
event VaultUpdate(address indexed asset, address vault);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset.|
|`vault`|`address`|The address of the new vault.|

