# Message
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/Message.sol)

Structure representing a cross-chain bridge message


```solidity
struct Message {
MessageType messageType;
bytes data;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`messageType`|`MessageType`|The type of the message (BRIDGE)|
|`data`|`bytes`|The payload of the message|

