# GenericUnitL2
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/unit/GenericUnitL2.sol)

**Inherits:**
[ERC20Mintable](/code-ref/protocol/unit/ERC20Mintable.sol/contract.ERC20Mintable.md)

A Layer 2 mirror of the GenericUnit token with minting capabilities and interface support detection

This contract extends ERC20Mintable to provide a mintable ERC20 token that serves as a mirror
of the GenericUnit token deployed on other chains. It includes interface support checking for IERC165 and IERC20
standards. The coordinator address receives mint/burn privileges upon deployment.


## Functions
### constructor

Initializes the GenericUnit L2 token with metadata and sets the owner.

The owner address gets mint/burn privileges.


```solidity
constructor(
    address coordinator,
    string memory name,
    string memory symbol
)
    ERC20Mintable(coordinator, name, symbol);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coordinator`|`address`|Address to be set as the owner|
|`name`|`string`|ERC20 token name|
|`symbol`|`string`|ERC20 token symbol|


### supportsInterface

Checks if the contract supports a specific interface.

Returns true for IERC165 and IERC20 interfaces.


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


