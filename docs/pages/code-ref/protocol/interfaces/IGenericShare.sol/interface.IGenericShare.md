# IGenericShare
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IGenericShare.sol)

**Inherits:**
[IERC20Mintable](/code-ref/protocol/interfaces/IERC20Mintable.sol/interface.IERC20Mintable.md), [IERC7575Share](/code-ref/protocol/interfaces/IERC7575Share.sol/interface.IERC7575Share.md)

Interface for the share token with controlled minting and burning capabilities.

This interface extends ERC20 functionality to include administrative functions for token
supply management with proper access control. The share token is an ERC20-compliant token
that serves as a synthetic asset backed by multiple stablecoin vaults.
Key Features:
- ERC20 compliance for standard token operations
- Controlled minting and burning functionality with owner access control
Access Control:
- mint(): Only owner
- burn(): Only owner
- ERC20 operations: All users


