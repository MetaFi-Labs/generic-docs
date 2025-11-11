# ILineaBridgeAdapter
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/interfaces/bridges/linea/ILineaBridgeAdapter.sol)

Standard interface Linea bridge adapter


## Functions
### settleInboundBridge

Receives a call from the message bridge to mint/redeem the units

This function is the one to call for intrabridge messaging


```solidity
function settleInboundBridge(bytes calldata message, bytes32 messageId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`message`|`bytes`|Encoded payload delivered by the transport, to be forwarded to the coordinator.|
|`messageId`|`bytes32`|Encoded message id given by the emitting chain (originChainId, messageServiceAddress, nonce)|


