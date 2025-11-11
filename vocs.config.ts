import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Generic Docs',
  socials: [
    { icon: 'github', link: 'https://github.com/MetaFi-labs' },
    { icon: 'x', link: 'https://x.com/genericmoney' },
  ],
  sidebar: [
    { text: 'Introduction', link: '/' },
    {
      text: 'Technical Documentation',
      collapsed: false,
      items: [
        {
          text: 'Generic Protocol',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/protocol/overview', },
            { text: 'Unit', link: '/protocol/unit', },
            { text: 'Vault', link: '/protocol/vault', },
            {
              text: 'Vault Controller',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/protocol/controller/overview'},
                { text: 'Accounting', link: '/protocol/controller/accounting' },
                { text: 'Limits', link: '/protocol/controller/limits' },
                { text: 'Vault Management', link: '/protocol/controller/managing' },
                { text: 'Price Feeds', link: '/protocol/controller/price-feeds' },
                { text: 'Rebalancing', link: '/protocol/controller/rebalancing' },
                { text: 'Yield Distribution', link: '/protocol/controller/yield-distribution' },
                { text: 'Rewards', link: '/protocol/controller/rewards' },
                { text: 'Config', link: '/protocol/controller/config' },
                { text: 'Emergency', link: '/protocol/controller/emergency' },
              ],
            },
          ],
        },
      ]
    },
    {
      text: 'Code Reference',
      collapsed: true,
      items: [
        {
          text: 'Protocol',
          collapsed: true,
          items: [
            { text: 'GenericUSD', link: '/code-ref/protocol/GenericUSD.sol/contract.GenericUSD' },
            {
              text: 'Unit',
              collapsed: true,
              items: [
                { text: 'GenericUnit', link: '/code-ref/protocol/unit/GenericUnit.sol/contract.GenericUnit' },
                { text: 'GenericUnitL2', link: '/code-ref/protocol/unit/GenericUnitL2.sol/contract.GenericUnitL2' },
                { text: 'ERC20Mintable', link: '/code-ref/protocol/unit/ERC20Mintable.sol/contract.ERC20Mintable' },
                {
                  text: 'Whitelabeled',
                  collapsed: true,
                  items: [
                    { text: 'WhitelabeledUnitUpgradeable', link: '/code-ref/protocol/unit/whitelabeled/WhitelabeledUnitUpgradeable.sol/contract.WhitelabeledUnitUpgradeable' },
                  ],
                },
              ],
            },
            {
              text: 'Vault',
              collapsed: true,
              items: [
                { text: 'GenericVault', link: '/code-ref/protocol/vault/GenericVault.sol/contract.GenericVault' },
                { text: 'ControlledERC7575Vault', link: '/code-ref/protocol/vault/ControlledERC7575Vault.sol/contract.ControlledERC7575Vault' },
                { text: 'SingleStrategyVault', link: '/code-ref/protocol/vault/SingleStrategyVault.sol/contract.SingleStrategyVault' },
              ],
            },
            {
              text: 'Controller',
              collapsed: true,
              items: [
                { text: 'Controller', link: '/code-ref/protocol/controller/Controller.sol/contract.Controller' },
                { text: 'BaseController', link: '/code-ref/protocol/controller/BaseController.sol/abstract.BaseController' },
                { text: 'VaultManager', link: '/code-ref/protocol/controller/VaultManager.sol/abstract.VaultManager' },
                { text: 'AccountingLogic', link: '/code-ref/protocol/controller/AccountingLogic.sol/abstract.AccountingLogic' },
                { text: 'VaultLimitsLogic', link: '/code-ref/protocol/controller/VaultLimitsLogic.sol/abstract.VaultLimitsLogic' },
                { text: 'RebalancingManager', link: '/code-ref/protocol/controller/RebalancingManager.sol/abstract.RebalancingManager' },
                { text: 'RewardsManager', link: '/code-ref/protocol/controller/RewardsManager.sol/abstract.RewardsManager' },
                { text: 'PriceFeedManager', link: '/code-ref/protocol/controller/PriceFeedManager.sol/abstract.PriceFeedManager' },
                { text: 'YieldManager', link: '/code-ref/protocol/controller/YieldManager.sol/abstract.YieldManager' },
                { text: 'ConfigManager', link: '/code-ref/protocol/controller/ConfigManager.sol/abstract.ConfigManager' },
                { text: 'EmergencyManager', link: '/code-ref/protocol/controller/EmergencyManager.sol/abstract.EmergencyManager' },
                { text: 'PeripheryManager', link: '/code-ref/protocol/controller/PeripheryManager.sol/abstract.PeripheryManager' },
              ],
            },
            {
              text: 'Periphery',
              collapsed: true,
              items: [
                { text: 'GenericDepositor', link: '/code-ref/protocol/periphery/GenericDepositor.sol/contract.GenericDepositor' },
                {
                  text: 'Swapper',
                  collapsed: true,
                  items: [
                    { text: 'UniswapV3Swapper', link: '/code-ref/protocol/periphery/swapper/UniswapV3Swapper.sol/contract.UniswapV3Swapper' },
                    { text: 'OneInchSwapper', link: '/code-ref/protocol/periphery/swapper/OneInchSwapper.sol/contract.OneInchSwapper' },
                    { text: 'USDSToDAIUniswapV3Swapper', link: '/code-ref/protocol/periphery/swapper/USDSToDAIUniswapV3Swapper.sol/contract.USDSToDAIUniswapV3Swapper' },
                  ],
                },
              ],
            },
            {
              text: 'Interfaces',
              collapsed: true,
              items: [
                { text: 'IController', link: '/code-ref/protocol/interfaces/IController.sol/interface.IController' },
                { text: 'IControlledVault', link: '/code-ref/protocol/interfaces/IControlledVault.sol/interface.IControlledVault' },
                { text: 'IGenericShare', link: '/code-ref/protocol/interfaces/IGenericShare.sol/interface.IGenericShare' },
                { text: 'IERC7575Vault', link: '/code-ref/protocol/interfaces/IERC7575Vault.sol/interface.IERC7575Vault' },
                { text: 'IERC7575Share', link: '/code-ref/protocol/interfaces/IERC7575Share.sol/interface.IERC7575Share' },
                { text: 'IERC20Mintable', link: '/code-ref/protocol/interfaces/IERC20Mintable.sol/interface.IERC20Mintable' },
                { text: 'IWhitelabeledUnit', link: '/code-ref/protocol/interfaces/IWhitelabeledUnit.sol/interface.IWhitelabeledUnit' },
                { text: 'ISwapper', link: '/code-ref/protocol/interfaces/ISwapper.sol/interface.ISwapper' },
                { text: 'IYieldDistributor', link: '/code-ref/protocol/interfaces/IYieldDistributor.sol/interface.IYieldDistributor' },
                { text: 'IBridgeCoordinatorL1Outbound', link: '/code-ref/protocol/interfaces/IBridgeCoordinatorL1Outbound.sol/interface.IBridgeCoordinatorL1Outbound' },
                { text: 'IChainlinkAggregatorLike', link: '/code-ref/protocol/interfaces/IChainlinkAggregatorLike.sol/interface.IChainlinkAggregatorLike' },
                { text: 'IDaiUsdsConverter', link: '/code-ref/protocol/interfaces/IDaiUsdsConverter.sol/interface.IDaiUsdsConverter' },
                { text: 'IOneInchAggregationRouterLike', link: '/code-ref/protocol/interfaces/IOneInchAggregationRouterLike.sol/interface.IOneInchAggregationRouterLike' },
                { text: 'IUniswapSwapRouterLike', link: '/code-ref/protocol/interfaces/IUniswapSwapRouterLike.sol/interface.IUniswapSwapRouterLike' },
                { text: 'IUniswapQuoterLike', link: '/code-ref/protocol/interfaces/IUniswapQuoterLike.sol/interface.IUniswapQuoterLike' },
              ],
            },
            {
              text: 'Utils',
              collapsed: true,
              items: [
                { text: 'tryGetAssetDecimals', link: '/code-ref/protocol/utils/tryGetAssetDecimals.sol/function.tryGetAssetDecimals' },
              ],
            },
          ],
        },
        {
          text: 'Bridging',
          collapsed: true,
          items: [
            { text: 'BridgeCoordinatorL1', link: '/code-ref/bridging/BridgeCoordinatorL1.sol/contract.BridgeCoordinatorL1' },
            { text: 'BridgeCoordinatorL2', link: '/code-ref/bridging/BridgeCoordinatorL2.sol/contract.BridgeCoordinatorL2' },
            {
              text: 'Coordinator',
              collapsed: true,
              items: [
                { text: 'BaseBridgeCoordinator', link: '/code-ref/bridging/coordinator/BaseBridgeCoordinator.sol/abstract.BaseBridgeCoordinator' },
                { text: 'BridgeCoordinator', link: '/code-ref/bridging/coordinator/BridgeCoordinator.sol/abstract.BridgeCoordinator' },
                { text: 'BridgeMessageCoordinator', link: '/code-ref/bridging/coordinator/BridgeMessageCoordinator.sol/abstract.BridgeMessageCoordinator' },
                { text: 'AdapterManager', link: '/code-ref/bridging/coordinator/AdapterManager.sol/abstract.AdapterManager' },
                { text: 'EmergencyManager', link: '/code-ref/bridging/coordinator/EmergencyManager.sol/abstract.EmergencyManager' },
                { text: 'PredepositCoordinator', link: '/code-ref/bridging/coordinator/PredepositCoordinator.sol/abstract.PredepositCoordinator' },
                {
                  text: 'Message Types',
                  collapsed: true,
                  items: [
                    { text: 'Message', link: '/code-ref/bridging/coordinator/Message.sol/struct.Message' },
                    { text: 'BridgeMessage', link: '/code-ref/bridging/coordinator/Message.sol/struct.BridgeMessage' },
                    { text: 'MessageType', link: '/code-ref/bridging/coordinator/Message.sol/enum.MessageType' },
                  ],
                },
              ],
            },
            {
              text: 'Adapters',
              collapsed: true,
              items: [
                { text: 'BaseAdapter', link: '/code-ref/bridging/adapters/BaseAdapter.sol/abstract.BaseAdapter' },
                { text: 'LayerZeroAdapter', link: '/code-ref/bridging/adapters/LayerZeroAdapter.sol/contract.LayerZeroAdapter' },
                { text: 'LineaBridgeAdapter', link: '/code-ref/bridging/adapters/LineaBridgeAdapter.sol/contract.LineaBridgeAdapter' },
                { text: 'BridgeTypes', link: '/code-ref/bridging/adapters/BridgeTypes.sol/library.BridgeTypes' },
              ],
            },
            {
              text: 'Interfaces',
              collapsed: true,
              items: [
                { text: 'IBridgeCoordinator', link: '/code-ref/bridging/interfaces/IBridgeCoordinator.sol/interface.IBridgeCoordinator' },
                { text: 'IBridgeAdapter', link: '/code-ref/bridging/interfaces/IBridgeAdapter.sol/interface.IBridgeAdapter' },
                { text: 'IERC20Mintable', link: '/code-ref/bridging/interfaces/IERC20Mintable.sol/interface.IERC20Mintable' },
                { text: 'IWhitelabeledUnit', link: '/code-ref/bridging/interfaces/IWhitelabeledUnit.sol/interface.IWhitelabeledUnit' },
                {
                  text: 'Bridges',
                  collapsed: true,
                  items: [
                    { text: 'ILineaBridgeAdapter', link: '/code-ref/bridging/interfaces/bridges/linea/ILineaBridgeAdapter.sol/interface.ILineaBridgeAdapter' },
                    { text: 'IMessageService', link: '/code-ref/bridging/interfaces/bridges/linea/IMessageService.sol/interface.IMessageService' },
                  ],
                },
              ],
            },
            {
              text: 'Utils',
              collapsed: true,
              items: [
                { text: 'Bytes32AddressLib', link: '/code-ref/bridging/utils/Bytes32AddressLib.sol/library.Bytes32AddressLib' },
              ],
            },
          ]
        },
      ]
    }
  ],
})
