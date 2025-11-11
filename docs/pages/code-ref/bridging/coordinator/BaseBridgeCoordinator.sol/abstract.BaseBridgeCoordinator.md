# BaseBridgeCoordinator
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/BaseBridgeCoordinator.sol)

**Inherits:**
AccessControlUpgradeable, ReentrancyGuardTransientUpgradeable, [IBridgeCoordinator](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/interfaces/IBridgeCoordinator.sol/interface.IBridgeCoordinator.md)


## State Variables
### genericUnit
The address of the Generic unit that this coordinator manages


```solidity
address public genericUnit
```


### bridgeTypes
Mapping of bridge types to their respective configurations


```solidity
mapping(uint16 bridgeType => BridgeTypeConfig) internal bridgeTypes
```


### failedMessageExecutions
Mapping of message IDs to their failed execution message hashes

Used to track messages that failed during inbound settlement for potential rollback


```solidity
mapping(bytes32 messageId => bytes32 messageHash) public failedMessageExecutions
```


### __gap
Reserved storage space to allow for layout changes in the future.


```solidity
uint256[50] private __gap
```


## Functions
### supportsBridgeTypeFor

Checks if a specific bridge type is supported for a destination chain

Returns true only if both local and remote adapters are configured


```solidity
function supportsBridgeTypeFor(uint16 bridgeType, uint256 chainId) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The destination chain ID to check support for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the bridge type is supported for the specified chain, false otherwise|


### outboundLocalBridgeAdapter

Returns the outbound local bridge adapter for a specific bridge type


```solidity
function outboundLocalBridgeAdapter(uint16 bridgeType) public view returns (IBridgeAdapter);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IBridgeAdapter`|The local bridge adapter contract used for outbound messages|


### isLocalBridgeAdapter

Checks if an address is a local bridge adapter


```solidity
function isLocalBridgeAdapter(uint16 bridgeType, address adapter) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`adapter`|`address`|The local bridge adapter address to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if a local adapter, false otherwise|


### outboundRemoteBridgeAdapter

Returns the outbound remote bridge adapter for a specific bridge type and chain


```solidity
function outboundRemoteBridgeAdapter(uint16 bridgeType, uint256 chainId) public view returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The remote chain ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The remote bridge adapter address (encoded as bytes32) used for outbound messages|


### isRemoteBridgeAdapter

Checks if an address is a remote bridge adapter for a specific bridge type and chain


```solidity
function isRemoteBridgeAdapter(
    uint16 bridgeType,
    uint256 chainId,
    bytes32 adapter
)
    public
    view
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol|
|`chainId`|`uint256`|The remote chain ID|
|`adapter`|`bytes32`|The remote bridge adapter address (encoded as bytes32) to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the adapter is a remote bridge adapter, false otherwise|


### encodeOmnichainAddress

Encodes an EVM address to bytes32 for cross-chain compatibility


```solidity
function encodeOmnichainAddress(address addr) public pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|The EVM address to encode|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The address encoded as bytes32|


### decodeOmnichainAddress

Decodes a bytes32 value back to an EVM address


```solidity
function decodeOmnichainAddress(bytes32 oAddr) public pure returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oAddr`|`bytes32`|The bytes32 encoded address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The decoded EVM address|


### _failedMessageHash

Computes the hash for a failed message execution

Used to track failed inbound message settlements. The hash is not used as a unique identifier. Rather,
it allows verification that a provided failed message data corresponds to the original message.


```solidity
function _failedMessageHash(uint256 chainId, bytes memory messageData) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The source chain ID where the bridge operation originated|
|`messageData`|`bytes`|The encoded bridge message data|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The computed hash of the failed message|


### _dispatchMessage

Dispatches a cross-chain message via the specified bridge adapter

Internal function that routes the message to the appropriate bridge adapter


```solidity
function _dispatchMessage(
    uint16 bridgeType,
    uint256 chainId,
    bytes memory messageData,
    bytes calldata bridgeParams
)
    internal
    virtual
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol to use|
|`chainId`|`uint256`|The destination chain ID|
|`messageData`|`bytes`|The encoded bridge message data to be sent|
|`bridgeParams`|`bytes`|Protocol-specific parameters required by the bridge adapter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


### _restrictUnits

Restricts units when bridging out

Virtual function that inheriting contracts can override to implement burn/lock logic


```solidity
function _restrictUnits(address whitelabel, address owner, uint256 amount) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|
|`owner`|`address`|The address that owns the units to be restricted|
|`amount`|`uint256`|The amount of units to restrict|


### _releaseUnits

Releases units when bridging in

Virtual function that inheriting contracts can override to implement mint/unlock logic


```solidity
function _releaseUnits(address whitelabel, address receiver, uint256 amount) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`whitelabel`|`address`|The whitelabeled unit token address, or zero address for native unit token|
|`receiver`|`address`|The address that should receive the released units|
|`amount`|`uint256`|The amount of units to release|


## Structs
### LocalConfig
Configuration for the local bridge adapter


```solidity
struct LocalConfig {
    IBridgeAdapter outbound;
    mapping(address => bool) isAdapter;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`outbound`|`IBridgeAdapter`|The local bridge adapter contract used for outbound messages|
|`isAdapter`|`mapping(address => bool)`|Mapping of adapter addresses|

### RemoteConfig
Configuration for a remote bridge adapter on another chain


```solidity
struct RemoteConfig {
    bytes32 outbound;
    mapping(bytes32 => bool) isAdapter;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`outbound`|`bytes32`|The remote bridge adapter address (encoded as bytes32) used for outbound messages|
|`isAdapter`|`mapping(bytes32 => bool)`|Mapping of remote adapter identifiers (encoded as bytes32)|

### BridgeTypeConfig
Encapsulates both local and remote configurations for a specific bridge type

Maps chain IDs to their respective remote configurations


```solidity
struct BridgeTypeConfig {
    LocalConfig local;
    mapping(uint256 chainId => RemoteConfig) remote;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`local`|`LocalConfig`|The local bridge adapter configuration|
|`remote`|`mapping(uint256 chainId => RemoteConfig)`|Mapping of chain IDs to their remote bridge adapter configurations|

