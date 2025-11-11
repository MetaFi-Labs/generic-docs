# IWhitelabeledUnit
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/interfaces/IWhitelabeledUnit.sol)

Interface for whitelabeled unit tokens that wrap underlying value units

This interface defines the core functionality for wrapping and unwrapping unit tokens
within the Generic Protocol ecosystem.


## Functions
### wrap

Wraps underlying unit tokens into whitelabeled tokens for a specified owner

Transfers `amount` of underlying unit tokens from the caller to this contract
and mints an equivalent amount of whitelabeled tokens to the `owner` address.
This maintains 1:1 parity between underlying units and whitelabeled tokens.


```solidity
function wrap(address owner, uint256 amount) external;
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
function unwrap(address owner, address recipient, uint256 amount) external;
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


## Events
### Wrapped
Emitted when underlying unit tokens are wrapped into whitelabeled tokens


```solidity
event Wrapped(address indexed owner, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that received the newly minted whitelabeled tokens|
|`amount`|`uint256`|The quantity of tokens wrapped (same amount of underlying tokens consumed and whitelabeled tokens minted)|

### Unwrapped
Emitted when whitelabeled tokens are unwrapped back to underlying unit tokens


```solidity
event Unwrapped(address indexed owner, address indexed recipient, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owned the whitelabeled tokens during the unwrap|
|`recipient`|`address`|The address that received the underlying unit tokens|
|`amount`|`uint256`|The quantity of tokens unwrapped (same amount of whitelabeled tokens burned and underlying tokens released)|

