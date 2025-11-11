# ERC20Mintable
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/unit/ERC20Mintable.sol)

**Inherits:**
[IERC20Mintable](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/interfaces/IERC20Mintable.sol/interface.IERC20Mintable.md), Ownable2Step, ERC20Permit

An ERC20 token with controlled minting and burning capabilities.

Inherits from OpenZeppelin's ERC20, ERC20Permit, and Ownable2Step for secure ownership transfer.
The owner has exclusive rights to mint and burn tokens, ensuring controlled supply management.
Key Features:
- Standard ERC20 functionality for token transfers and balances
- EIP-2612 permit functionality for gasless approvals
- Owner-restricted minting and burning of tokens
- Two-step ownership transfer for enhanced security
Security Considerations:
- Only the owner can mint or burn tokens, preventing unauthorized supply changes.
- Renouncing ownership is disabled to ensure the contract always has an owner for access control.


## Functions
### constructor

Initializes the ERC20Mintable token with metadata and sets the owner.

The owner address gets mint/burn privileges.


```solidity
constructor(
    address owner,
    string memory name,
    string memory symbol
)
    Ownable(owner)
    ERC20(name, symbol)
    ERC20Permit(name);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|Address to be set as the owner|
|`name`|`string`|ERC20 token name|
|`symbol`|`string`|ERC20 token symbol|


### mint

Mints new ERC20Mintable tokens to the specified address, increasing total supply.

Only callable by the owner. Increases both total supply and recipient balance.
Requirements:
- Caller must be the owner
- `to` cannot be the zero address
Emits:
- {Mint} event with recipient and amount
- {Transfer} event from zero address to recipient

**Note:**
security: Owner-only access prevents unauthorized inflation


```solidity
function mint(address to, uint256 amount) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to receive the newly minted tokens|
|`amount`|`uint256`|Amount of tokens to mint|


### burn

Burns tokens from the specified address, decreasing total supply.

Only callable by the owner. Decreases both total supply and target balance.
Requirements:
- Caller must be the owner
- `from` cannot be the zero address
- `from` must have sufficient balance
- If `from` is different from `spender`, `spender` must have allowance for `from`'s tokens
Emits:
- {Burn} event with source address and amount
- {Transfer} event from source address to zero address

**Note:**
security: Owner-only access prevents unauthorized deflation


```solidity
function burn(address from, address spender, uint256 amount) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|Address to burn tokens from|
|`spender`|`address`|Address initiating the burn (for allowance checks if different from `from`)|
|`amount`|`uint256`|Amount of tokens to burn|


### renounceOwnership

Renouncing ownership is intentionally disabled for ERC20Mintable.

This function always reverts to ensure the contract always has an owner
for mint/burn access control. This prevents accidental or malicious loss
of administrative control.

**Note:**
security: Always reverts to maintain ownership integrity


```solidity
function renounceOwnership() public pure override;
```

## Errors
### RenounceOwnershipDisabled
Error thrown when attempting to renounce ownership.

ERC20Mintable intentionally disables ownership renunciation to ensure the contract
always has an owner for mint/burn access control.


```solidity
error RenounceOwnershipDisabled();
```

