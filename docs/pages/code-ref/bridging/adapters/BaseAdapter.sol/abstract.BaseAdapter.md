# BaseAdapter
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/adapters/BaseAdapter.sol)

**Inherits:**
[IBridgeAdapter](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/interfaces/IBridgeAdapter.sol/interface.IBridgeAdapter.md), Ownable2Step

Abstract base contract for bridge adapters that provides common functionality

Implements standard adapter properties and coordinator reference. Inheriting contracts
must implement the bridge and estimateBridgeFee functions for specific bridge protocols.


## State Variables
### coordinator
The bridge coordinator contract that this adapter is connected to


```solidity
IBridgeCoordinator public immutable coordinator
```


### nonce
Counter for the amount of bridging transactions done by the adapter


```solidity
uint32 public nonce
```


## Functions
### constructor

Initializes the base adapter with bridge type and coordinator


```solidity
constructor(IBridgeCoordinator _coordinator, address owner) Ownable(owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_coordinator`|`IBridgeCoordinator`|The bridge coordinator contract address|
|`owner`|`address`||


### bridgeCoordinator

Returns the address of the bridge coordinator this adapter is connected to


```solidity
function bridgeCoordinator() external view override returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the bridge coordinator contract|


### bridgeType

Returns the bridge type identifier for this adapter implementation


```solidity
function bridgeType() public view virtual returns (uint16);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|The uint16 bridge type identifier|


### getMessageId

Returns the messageId for the bridging and receiving of the units


```solidity
function getMessageId(uint256 chainId) public view returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The destination chain ID for the bridge operation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The bytes32 encoded messageId of the bridge transaction|


### bridge

Dispatches an outbound message through the underlying bridge implementation.


```solidity
function bridge(
    uint256 chainId,
    bytes32 remoteAdapter,
    bytes calldata message,
    address refundAddress,
    bytes calldata bridgeParams
)
    external
    payable
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|Destination chain identifier recognised by the adapter implementation.|
|`remoteAdapter`|`bytes32`|Encoded address or identifier of the remote adapter endpoint.|
|`message`|`bytes`|Payload forwarded to the remote coordinator for settlement.|
|`refundAddress`|`address`|Address to refund any excess fees or failed transactions.|
|`bridgeParams`|`bytes`|Adapter-specific parameters used to quote and configure the bridge call.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Identifier returned by the bridge transport for reconciliation.|


### _dispatchBridge

Dispatches an outbound message through the underlying bridge implementation.


```solidity
function _dispatchBridge(
    uint256 chainId,
    bytes32 remoteAdapter,
    bytes calldata message,
    address refundAddress,
    bytes calldata bridgeParams,
    bytes32 messageId
)
    internal
    virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|Destination chain identifier recognised by the adapter implementation.|
|`remoteAdapter`|`bytes32`|Encoded address or identifier of the remote adapter endpoint.|
|`message`|`bytes`|Payload forwarded to the remote coordinator for settlement.|
|`refundAddress`|`address`|Address to refund any excess fees or failed transactions.|
|`bridgeParams`|`bytes`|Adapter-specific parameters used to quote and configure the bridge call.|
|`messageId`|`bytes32`|The internal only message id for the transaction|


## Errors
### InvalidZeroAddress
Thrown when an operation receives the zero address where a contract is required.


```solidity
error InvalidZeroAddress();
```

### UnauthorizedCaller
Thrown when a non-authorised caller attempts to invoke restricted functionality.


```solidity
error UnauthorizedCaller();
```

