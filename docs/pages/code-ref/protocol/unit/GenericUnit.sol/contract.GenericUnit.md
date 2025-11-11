# GenericUnit
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/unit/GenericUnit.sol)

**Inherits:**
[IGenericShare](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/interfaces/IGenericShare.sol/interface.IGenericShare.md), [ERC20Mintable](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/unit/ERC20Mintable.sol/contract.ERC20Mintable.md)

A mintable ERC20 token that represents stable unit within the Generic Protocol.

This contract extends ERC20Mintable to provide a mintable ERC20 token that adheres to the
IERC7575Share interface. It includes functionality to query associated vaults for specific assets.
The controller address receives mint/burn privileges upon deployment.


## Functions
### constructor

Initializes the GenericUnit token with metadata and sets the owner.

The owner address gets mint/burn privileges.


```solidity
constructor(
    address controller,
    string memory name,
    string memory symbol
)
    ERC20Mintable(controller, name, symbol);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`address`|Address to be set as the owner|
|`name`|`string`|ERC20 token name|
|`symbol`|`string`|ERC20 token symbol|


### vault

Returns the address of the Vault for the given asset.

Vault changes do not emit VaultChange event as this is handled by the Controller.


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


### supportsInterface

Checks if the contract supports a specific interface.

Returns true for IERC165, IERC20, and IERC7575Share interfaces.


```solidity
function supportsInterface(bytes4 interfaceId) external pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`interfaceId`|`bytes4`|The interface identifier to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the interface is supported, false otherwise|


