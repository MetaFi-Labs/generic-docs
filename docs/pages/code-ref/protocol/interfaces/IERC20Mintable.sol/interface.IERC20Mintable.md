# IERC20Mintable
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IERC20Mintable.sol)

Interface for an ERC20 token with controlled minting and burning capabilities.

This interface extends the standard ERC20 functionality to include administrative
functions for token supply management with proper access control. The mint and burn
functions are restricted to the contract owner to ensure controlled supply changes.
Key Features:
- ERC20 compliance for standard token operations
- Controlled minting and burning functionality with owner access control
Events:
- Mint: Emitted when new tokens are minted
- Burn: Emitted when tokens are burned
Access Control:
- mint(): Only owner
- burn(): Only owner
- ERC20 operations: All users


## Functions
### mint

Mints new tokens to the specified address, increasing total supply.

Only callable by the contract owner.
This function increases both the total supply and the recipient's balance.
Requirements:
- Caller must be the owner
- `to` address must not be zero
Emits:
- [Mint](//code-ref/protocol/interfaces/IERC20Mintable.sol/interface.IERC20Mintable.md#mint) event with recipient and amount
- {Transfer} event from zero address to recipient


```solidity
function mint(address to, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to receive the newly minted tokens|
|`amount`|`uint256`|Amount of tokens to mint|


### burn

Burns tokens from the specified address, decreasing total supply.

Only callable by the contract owner.
This function decreases both the total supply and the target address's balance.
Requirements:
- Caller must be the owner
- `from` address must not be zero
- `from` must have sufficient balance
- If `from` is different from `spender`, `spender` must have allowance for `from`'s tokens
Emits:
- [Burn](//code-ref/protocol/interfaces/IERC20Mintable.sol/interface.IERC20Mintable.md#burn) event with source address and amount
- {Transfer} event from source address to zero address


```solidity
function burn(address from, address spender, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|Address to burn tokens from|
|`spender`|`address`|Address initiating the burn (for allowance checks if different from `from`)|
|`amount`|`uint256`|Amount of tokens to burn|


## Events
### Mint
Emitted when new tokens are minted to an address.

This event is emitted after successful execution of the mint function.
It provides transparency for token supply increases.


```solidity
event Mint(address indexed to, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address receiving the minted tokens|
|`amount`|`uint256`|Number of tokens minted|

### Burn
Emitted when tokens are burned from an address.

This event is emitted after successful execution of the burn function.
It provides transparency for token supply decreases.


```solidity
event Burn(address indexed from, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|Address whose tokens are burned|
|`amount`|`uint256`|Number of tokens burned|

