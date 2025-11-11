# PredepositCoordinator
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/PredepositCoordinator.sol)

**Inherits:**
[BaseBridgeCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BaseBridgeCoordinator.sol/abstract.BaseBridgeCoordinator.md), [BridgeMessageCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/coordinator/BridgeMessageCoordinator.sol/abstract.BridgeMessageCoordinator.md)

Abstract contract that coordinates predeposit operations for bridge transactions

This contract extends BaseBridgeCoordinator and BridgeMessageCoordinator to handle
predeposit functionality, allowing users to deposit assets before bridge operations
are fully operational for the destination chain.


## State Variables
### PREDEPOSIT_MANAGER_ROLE
The role that manages predeposit state


```solidity
bytes32 public constant PREDEPOSIT_MANAGER_ROLE = keccak256("PREDEPOSIT_MANAGER_ROLE")
```


### PREDEPOSIT_COORDINATOR_STORAGE_SLOT
keccak256(abi.encode(uint256(keccak256("generic.storage.PredepositCoordinator")) - 1)) &
~bytes32(uint256(0xff))


```solidity
bytes32 private constant PREDEPOSIT_COORDINATOR_STORAGE_SLOT =
    0xc21018d819991b3ffe7c98205610e4fd64c7a07a5010749045af9b9d7860c300
```


## Functions
### _getPredepositCoordinatorStorage

Returns the storage pointer for PredepositCoordinator


```solidity
function _getPredepositCoordinatorStorage() private pure returns (PredepositCoordinatorStorage storage $);
```

### predeposit

Predeposits units for bridging to another chain

Restricts units on this chain to be bridged later via bridgePredeposit


```solidity
function predeposit(
    bytes32 chainNickname,
    address onBehalf,
    bytes32 remoteRecipient,
    uint256 amount
)
    external
    nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the destination chain|
|`onBehalf`|`address`|The address on behalf of which the predeposit is made|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`amount`|`uint256`|The amount of units to predeposit|


### bridgePredeposit

Bridges predeposited units to another chain using the specified bridge protocol

Sends a message to release predeposited units on destination chain


```solidity
function bridgePredeposit(
    uint16 bridgeType,
    bytes32 chainNickname,
    address owner,
    bytes32 remoteRecipient,
    bytes calldata bridgeParams
)
    external
    payable
    nonReentrant
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol to use (must have registered adapter)|
|`chainNickname`|`bytes32`|The nickname of the destination chain|
|`owner`|`address`|The address on this chain on whose behalf the units are bridged|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`bridgeParams`|`bytes`|Protocol-specific parameters required by the bridge adapter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


### withdrawPredeposit

Withdraws predeposited units that were not bridged

Releases units back to the original sender


```solidity
function withdrawPredeposit(
    bytes32 chainNickname,
    bytes32 remoteRecipient,
    address recipient,
    address whitelabel
)
    external
    nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain where the predeposit was made|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`recipient`|`address`|The address on this chain to receive the withdrawn units|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|


### enablePredeposits

Enables predeposits for the specified chain nickname


```solidity
function enablePredeposits(bytes32 chainNickname) external onlyRole(PREDEPOSIT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to enable predeposits for|


### enablePredepositsDispatch

Enables dispatching predeposits for the specified chain nickname

Should be called only after chain adapters are registered in BridgeCoordinator


```solidity
function enablePredepositsDispatch(
    bytes32 chainNickname,
    uint256 chainId,
    bytes32 whitelabel
)
    external
    onlyRole(PREDEPOSIT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to enable predeposits dispatch for|
|`chainId`|`uint256`|The chain ID of the destination chain|
|`whitelabel`|`bytes32`|The address of the whitelabeled unit token for this chain, zero for unit token|


### enablePredepositsWithdraw

Enables withdrawals of predeposits for the specified chain nickname


```solidity
function enablePredepositsWithdraw(bytes32 chainNickname) external onlyRole(PREDEPOSIT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to enable predeposits withdrawals for|


### setChainIdToNickname

Sets the chain ID for the specified chain nickname

Can be used to override chain ID or set it after enabling dispatch


```solidity
function setChainIdToNickname(
    bytes32 chainNickname,
    uint256 chainId
)
    external
    onlyRole(PREDEPOSIT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to set the ID for|
|`chainId`|`uint256`|The chain ID of the destination chain|


### setWhitelabelForNickname

Sets the whitelabeled unit address for the specified chain nickname


```solidity
function setWhitelabelForNickname(
    bytes32 chainNickname,
    bytes32 whitelabel
)
    external
    onlyRole(PREDEPOSIT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to set the whitelabeled unit address for|
|`whitelabel`|`bytes32`|The address of the whitelabeled unit token|


### getChainPredepositState

Gets the predeposit state for the specified chain nickname


```solidity
function getChainPredepositState(bytes32 chainNickname) external view returns (PredepositState);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to get the predeposit state for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PredepositState`|The current PredepositState of the specified chain nickname|


### getChainIdForNickname

Gets the chain ID assigned to the specified chain nickname


```solidity
function getChainIdForNickname(bytes32 chainNickname) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to get the ID for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The chain ID assigned to the specified chain nickname, or zero if not set|


### getPredeposit

Gets the predeposited amount for a given sender and remote recipient on a specified chain nickname


```solidity
function getPredeposit(
    bytes32 chainNickname,
    address sender,
    bytes32 remoteRecipient
)
    external
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to get the predeposit for|
|`sender`|`address`|The address that initiated the predeposit|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of units predeposited by the sender for the remote recipient|


### getTotalPredeposits

Gets the total predeposited amount for the specified chain nickname


```solidity
function getTotalPredeposits(bytes32 chainNickname) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to get the total predeposits for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total amount of units predeposited for the specified chain nickname|


### getWhitelabelForNickname

Gets the whitelabeled unit address assigned to the specified chain nickname


```solidity
function getWhitelabelForNickname(bytes32 chainNickname) external view returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain to get the whitelabeled unit address for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The whitelabeled unit address assigned to the specified chain nickname|


## Events
### Predeposited
Emitted when users predeposit tokens for future bridging


```solidity
event Predeposited(
    bytes32 indexed chainNickname,
    address sender,
    address indexed owner,
    bytes32 indexed remoteRecipient,
    uint256 amount
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the destination chain|
|`sender`|`address`|The address that initiated the predeposit|
|`owner`|`address`|The owner of the predeposit on the source chain|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`amount`|`uint256`|The amount of tokens predeposited|

### PredepositBridgedOut
Emitted when a predeposit has been successfully bridged out to another chain


```solidity
event PredepositBridgedOut(bytes32 indexed chainNickname, bytes32 indexed messageId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The identifier/nickname of the destination chain where the predeposit was bridged|
|`messageId`|`bytes32`|The unique identifier for the cross-chain bridge message|

### PredepositWithdrawn
Emitted when a predeposit has been withdrawn back by the original owner


```solidity
event PredepositWithdrawn(
    bytes32 indexed chainNickname,
    address indexed owner,
    bytes32 indexed remoteRecipient,
    address recipient,
    uint256 amount
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain where the predeposit was committed to|
|`owner`|`address`|The address on this chain on whose behalf the units are bridged|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (encoded as bytes32)|
|`recipient`|`address`|The address on this chain to receive the withdrawn tokens|
|`amount`|`uint256`|The amount of tokens withdrawn|

### PredepositStateChanged
Emitted when the predeposit state for a chain nickname changes


```solidity
event PredepositStateChanged(bytes32 indexed chainNickname, PredepositState newState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain whose predeposit state changed|
|`newState`|`PredepositState`|The new state of predeposits for the chain|

### ChainIdAssignedToNickname
Emitted when a chain ID is assigned to a chain nickname


```solidity
event ChainIdAssignedToNickname(bytes32 indexed chainNickname, uint256 chainId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain|
|`chainId`|`uint256`|The chain ID assigned to the nickname|

### WhitelabelAssignedToNickname
Emitted when a whitelabeled unit address is assigned to a nickname for a specific chain


```solidity
event WhitelabelAssignedToNickname(bytes32 indexed chainNickname, bytes32 indexed whitelabel);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|The nickname of the chain|
|`whitelabel`|`bytes32`|The address of the whitelabeled unit token|

## Errors
### Predeposit_NotEnabled
Thrown when predeposits are not enabled for the specified chain nickname


```solidity
error Predeposit_NotEnabled();
```

### Predeposit_DispatchNotEnabled
Thrown when dispatching predeposits is not enabled for the specified chain nickname


```solidity
error Predeposit_DispatchNotEnabled();
```

### Predeposit_WithdrawalsNotEnabled
Thrown when withdrawals are not enabled for the specified chain nickname


```solidity
error Predeposit_WithdrawalsNotEnabled();
```

### Predeposit_ChainIdAlreadySet
Thrown when the chain ID for the specified chain nickname is already set


```solidity
error Predeposit_ChainIdAlreadySet();
```

### Predeposit_ZeroOnBehalf
Thrown when the on behalf parameter is zero


```solidity
error Predeposit_ZeroOnBehalf();
```

### Predeposit_ZeroRemoteRecipient
Thrown when the remote recipient parameter is zero


```solidity
error Predeposit_ZeroRemoteRecipient();
```

### Predeposit_ZeroRecipient
Thrown when the recipient address is zero


```solidity
error Predeposit_ZeroRecipient();
```

### Predeposit_ZeroAmount
Thrown when the bridge amount is zero


```solidity
error Predeposit_ZeroAmount();
```

### Predeposit_InvalidStateTransition
Thrown when the predeposit state transition is invalid


```solidity
error Predeposit_InvalidStateTransition();
```

### Predeposit_ChainIdZero
Thrown when the chain ID for the specified chain nickname is zero


```solidity
error Predeposit_ChainIdZero();
```

## Structs
### PredepositChain
Struct representing a blockchain configuration for predeposit operations


```solidity
struct PredepositChain {
    PredepositState state;
    uint256 chainId;
    bytes32 whitelabel;
    mapping(address owner => mapping(bytes32 remoteRecipient => uint256 amount)) predeposits;
    uint256 totalPredeposits;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`state`|`PredepositState`|The current state of predeposits for this chain|
|`chainId`|`uint256`|The chain ID of the destination chain|
|`whitelabel`|`bytes32`|The whitelabeled unit token address for this chain, or zero for native unit token|
|`predeposits`|`mapping(address owner => mapping(bytes32 remoteRecipient => uint256 amount))`|Mapping of owner addresses to remote recipient addresses to predeposit amounts|
|`totalPredeposits`|`uint256`|The total amount of units predeposited for this chain|

### PredepositCoordinatorStorage
The coordinator is expected to be an upgradeable proxy contract, and any future
updates to the storage layout must respect the original storage structure to maintain
compatibility and prevent storage collisions. When adding new storage variables,
append them to the end of this struct to preserve existing storage slots.

**Note:**
storage-location: erc7201:generic.storage.PredepositCoordinator


```solidity
struct PredepositCoordinatorStorage {
    mapping(bytes32 nickname => PredepositChain) chain;
}
```

## Enums
### PredepositState
The various states a predeposit can be in


```solidity
enum PredepositState {
    DISABLED,
    ENABLED,
    DISPATCHED,
    WITHDRAWN
}
```

