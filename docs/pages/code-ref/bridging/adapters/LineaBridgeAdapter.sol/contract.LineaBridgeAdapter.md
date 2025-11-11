# LineaBridgeAdapter
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/adapters/LineaBridgeAdapter.sol)

**Inherits:**
[BaseAdapter](/code-ref/bridging/adapters/BaseAdapter.sol/abstract.BaseAdapter.md), [ILineaBridgeAdapter](/code-ref/bridging/interfaces/bridges/linea/ILineaBridgeAdapter.sol/interface.ILineaBridgeAdapter.md)

Bridge adapter using Linea's Message Service for cross-chain messaging

Handles message passing only - does NOT hold or manage tokens


## State Variables
### messageServiceToChainId
Reverse lookup for authorised message services back to their origin chain id.


```solidity
mapping(address messageService => uint256 chainId) public messageServiceToChainId
```


### chainIdToMessageService
Mapping from chain id to the trusted message service contract.


```solidity
mapping(uint256 chainId => address messageService) public chainIdToMessageService
```


## Functions
### constructor


```solidity
constructor(IBridgeCoordinator _coordinator, address owner) BaseAdapter(_coordinator, owner);
```

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
    virtual
    override;
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


### settleInboundBridge

Receives a call from the message bridge to mint/redeem the units

This function is the one to call for intrabridge messaging


```solidity
function settleInboundBridge(bytes calldata messageData, bytes32 messageId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageData`|`bytes`||
|`messageId`|`bytes32`|Encoded message id given by the emitting chain (originChainId, messageServiceAddress, nonce)|


### estimateBridgeFee

Quotes the native fee required to execute a bridge call.


```solidity
function estimateBridgeFee(uint256, bytes calldata, bytes calldata) public pure returns (uint256 nativeFee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`||
|`<none>`|`bytes`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`nativeFee`|`uint256`|Amount of native currency that must be supplied alongside the call.|


### bridgeType

Returns the bridge type identifier for this adapter implementation


```solidity
function bridgeType() public pure override returns (uint16);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|The uint16 bridge type identifier|


### setMessageService

Updates the message service endpoint used for cross-chain messaging.

Callable only by owner.


```solidity
function setMessageService(address _messageService, uint256 _chainId) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_messageService`|`address`|The new message service contract.|
|`_chainId`|`uint256`||


## Events
### MessageServiceConfigured
Emitted whenever the message service endpoint configured for a chain changes.


```solidity
event MessageServiceConfigured(
    uint256 indexed chainId, address indexed previousService, address indexed newService
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The L2 chain identifier associated with the message service.|
|`previousService`|`address`|The previously configured message service address.|
|`newService`|`address`|The newly configured message service address.|

## Errors
### InvalidParams
Thrown when arbitrary calldata does not match the expected encoding format.


```solidity
error InvalidParams();
```

### InsufficientFee
Thrown when the provided fee is insufficient for the bridge operation


```solidity
error InsufficientFee();
```

### FeeRefundFailed
Thrown when refunding excess fee fails


```solidity
error FeeRefundFailed();
```

