# LayerZeroAdapter
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/adapters/LayerZeroAdapter.sol)

**Inherits:**
[BaseAdapter](/Users/naimashhab/Documents/crypto/generic-bridging/docs/src/src/adapters/BaseAdapter.sol/abstract.BaseAdapter.md), OApp, OAppOptionsType3

Bridge adapter using LayerZero's OApp for cross-chain messaging

Handles message passing only - does NOT hold or manage tokens


## State Variables
### SEND
Msg type for sending a string, for use in OAppOptionsType3 as an enforced option


```solidity
uint16 public constant SEND = 1
```


### chainIdToEndpointId
Maps canonical EVM chain identifiers to the corresponding LayerZero endpoint ids.

Used during outbound dispatch to resolve the destination endpoint for a given chain.


```solidity
mapping(uint256 chainId => uint32 eid) public chainIdToEndpointId
```


### endpointIdToChainId
Reverse lookup from LayerZero endpoint id back to the configured EVM chain identifier.

Consumed within `_lzReceive` to recover the coordinator chain id from the inbound origin metadata.


```solidity
mapping(uint32 eid => uint256 chainId) public endpointIdToChainId
```


## Functions
### constructor


```solidity
constructor(
    IBridgeCoordinator _coordinator,
    address owner,
    address endpoint
)
    BaseAdapter(_coordinator, owner)
    OApp(endpoint, owner);
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


### _lzReceive

Invoked by OAppReceiver when EndpointV2.lzReceive is called

_origin    Metadata (source chain, sender address, nonce)

_guid      Global unique ID for tracking this message

executor   Executor address that delivered the message (unused here).

extraData  Additional data from the executor (unused here).


```solidity
function _lzReceive(
    Origin calldata origin,
    bytes32 guid,
    bytes calldata payload,
    address,
    bytes calldata
)
    internal
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`origin`|`Origin`||
|`guid`|`bytes32`||
|`payload`|`bytes`|   ABI-encoded bridge payload forwarded from the remote adapter.|
|`<none>`|`address`||
|`<none>`|`bytes`||


### estimateBridgeFee

Quotes the native fee required to execute a bridge call.


```solidity
function estimateBridgeFee(
    uint256 chainId,
    bytes calldata message,
    bytes calldata bridgeParams
)
    external
    view
    returns (uint256 nativeFee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|Destination chain identifier recognised by the adapter implementation.|
|`message`|`bytes`|Payload that will be forwarded to the remote coordinator for settlement.|
|`bridgeParams`|`bytes`|Adapter-specific parameters used to configure the bridge call.|

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


### setRemoteEndpointConfig

Convenience helper to configure the endpoint id and LayerZero peer in a single call.


```solidity
function setRemoteEndpointConfig(
    uint256 chainId,
    uint32 endpointId,
    bytes32 remoteAdapter
)
    external
    onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|Canonical chain identifier managed by the coordinator.|
|`endpointId`|`uint32`|LayerZero endpoint id used to reach the remote chain.|
|`remoteAdapter`|`bytes32`|Adapter identifier registered in the coordinator on the remote chain.|


### transferOwnership

Resolves the ownership diamond created by inheriting both Ownable2Step (via BaseAdapter)
and Ownable (via OAppOptionsType3). The overrides forward control to Ownable2Step so the
coordinator keeps its two-step ownership semantics while remaining compatible with OApp.


```solidity
function transferOwnership(address newOwner) public override(Ownable2Step, Ownable);
```

### _transferOwnership

Resolves the ownership diamond created by inheriting both Ownable2Step (via BaseAdapter)
and Ownable (via OAppOptionsType3). The overrides forward control to Ownable2Step so the
coordinator keeps its two-step ownership semantics while remaining compatible with OApp.


```solidity
function _transferOwnership(address newOwner) internal override(Ownable2Step, Ownable);
```

## Events
### EndpointIdConfigured
Emitted whenever a LayerZero endpoint identifier is configured for a given chain id.


```solidity
event EndpointIdConfigured(uint256 indexed chainId, uint32 indexed endpointId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The canonical chain id managed by the bridge coordinator.|
|`endpointId`|`uint32`|The LayerZero endpoint id representing that chain within the messaging network.|

### MessageGuidRecorded
Emitted after dispatching a LayerZero message so off-chain services can correlate internal ids.


```solidity
event MessageGuidRecorded(
    bytes32 indexed messageId, bytes32 indexed guid, uint256 indexed chainId, uint32 endpointId
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|Internal message identifier generated by the adapter.|
|`guid`|`bytes32`|LayerZero GUID returned by the endpoint for the dispatched packet.|
|`chainId`|`uint256`|Destination chain id recognised by the bridge coordinator.|
|`endpointId`|`uint32`|Destination LayerZero endpoint id.|

## Errors
### PeersMismatch
Thrown when the coordinator-provided remote adapter does not match the LayerZero peer configuration.


```solidity
error PeersMismatch(bytes32 configuredPeer, bytes32 coordinatorAdapter);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`configuredPeer`|`bytes32`|The peer address registered in LayerZero's endpoint for the destination.|
|`coordinatorAdapter`|`bytes32`|The adapter identifier supplied by the BridgeCoordinator call.|

