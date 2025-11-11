# WhitelabeledUnitUpgradeable
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/unit/whitelabeled/WhitelabeledUnitUpgradeable.sol)

**Inherits:**
[IWhitelabeledUnit](/code-ref/protocol/interfaces/IWhitelabeledUnit.sol/interface.IWhitelabeledUnit.md), ERC20PermitUpgradeable

Upgradeable implementation of a whitelabeled unit token that wraps underlying Generic units

This contract provides a concrete implementation of the IWhitelabeledUnit interface using
OpenZeppelin's upgradeable contracts pattern. It enables wrapping of underlying unit tokens
into a branded token with custom name and symbol while maintaining 1:1 conversion mechanics.
Key features:
- Upgradeable proxy pattern for future enhancements
- EIP-2612 permit functionality for gasless approvals via off-chain signatures
- 1:1 wrapping and unwrapping of underlying unit tokens
- Safe token transfers using OpenZeppelin's SafeERC20
- Event emission for transparent tracking of wrap/unwrap operations
- Virtual functions allowing for customization in derived contracts


## State Variables
### _genericUnit
The address of the underlying Generic unit token that this contract wraps


```solidity
IERC20 private _genericUnit
```


## Functions
### constructor

Contract constructor that disables initializers for the implementation contract

This prevents the implementation contract from being initialized directly.
Only proxy contracts can call initializer functions, ensuring proper upgradeable pattern usage.


```solidity
constructor() ;
```

### __WhitelabeledUnit_init

Internal initialization function for setting up the whitelabeled unit token

This function initializes the ERC20Permit token with the provided name and symbol,
sets up EIP-2612 permit functionality, and configures the underlying unit token address.


```solidity
function __WhitelabeledUnit_init(
    string memory name_,
    string memory symbol_,
    IERC20 genericUnit_
)
    internal
    onlyInitializing;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`string`|The human-readable name for the whitelabeled token (e.g., "Generic USD")|
|`symbol_`|`string`|The symbol for the whitelabeled token (e.g., "GUSD")|
|`genericUnit_`|`IERC20`|The address of the underlying Generic unit token to wrap|


### wrap

Wraps underlying unit tokens into whitelabeled tokens for a specified owner

Transfers `amount` of underlying unit tokens from the caller to this contract
and mints an equivalent amount of whitelabeled tokens to the `owner` address.
This maintains 1:1 parity between underlying units and whitelabeled tokens.


```solidity
function wrap(address owner, uint256 amount) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that will receive the minted whitelabeled tokens|
|`amount`|`uint256`|The amount of underlying unit tokens to wrap and whitelabeled tokens to mint|


### unwrap

Unwraps whitelabeled tokens back to underlying unit tokens

Burns `amount` of whitelabeled tokens from the owner's balance
and transfers an equivalent amount of underlying unit tokens to the recipient.
This maintains the 1:1 parity in reverse direction.
If the caller is not the owner, the caller must have sufficient allowance to burn the owner's tokens.


```solidity
function unwrap(address owner, address recipient, uint256 amount) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the whitelabeled tokens to be unwrapped|
|`recipient`|`address`|The address that will receive the underlying unit tokens|
|`amount`|`uint256`|The amount of whitelabeled tokens to burn and unit tokens to receive|


### genericUnit

Returns the address of the underlying Generic unit token that this contract wraps

This is the ERC20 token address of the Generic units that back the whitelabeled tokens.
The underlying token typically represents claims on protocol vault positions and
may accrue yield over time through vault strategy operations.


```solidity
function genericUnit() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The contract address of the underlying unit token|


### decimals

Returns the number of decimals used by the whitelabeled unit token

This function overrides the default ERC20 decimals implementation to
match the decimals of the underlying unit token, ensuring consistency in value representation.


```solidity
function decimals() public view override returns (uint8);
```

