import {ethers, network} from 'hardhat';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {
    AaveV3Module, IAaveOracle, IAaveOracle__factory,
    IERC20,
    IERC20__factory, IPool, IPool__factory,
    IPoolAddressesProvider,
    IPoolAddressesProvider__factory
} from '../typechain-types';
import {aaveDaiAddress, aaveDaiHolder} from './constants/Addresses';



describe('AaveV3Module', function () {

    let module: AaveV3Module;

    let user: SignerWithAddress;
    let daiSupplier: SignerWithAddress;

    let daiToken: IERC20;

    let poolAddressProvider: IPoolAddressesProvider;
    let pool: IPool;
   // let protocolDataProvider: IPoolDataProvider__factory;
    let aaveOracle: IAaveOracle;


    beforeEach(async () => {
        const AaveModule = await ethers.getContractFactory(`AaveV3Module`);
        [user] = await ethers.getSigners();
        module = (await AaveModule.deploy()) as AaveV3Module;
        await module.deployed();

        daiToken = IERC20__factory.connect(aaveDaiAddress, user);

        poolAddressProvider = IPoolAddressesProvider__factory.connect('0xC911B590248d127aD18546B186cC6B324e99F02c', user);
        // protocolDataProvider = AaveProtocolDataProvider__factory.connect('0xa41E284482F9923E265832bE59627d91432da76C', user)
        aaveOracle = IAaveOracle__factory.connect('0x9F616c65b5298E24e155E4486e114516BC635b63', user);

        let poolAddress = await poolAddressProvider.getPool();
        pool = IPool__factory.connect(poolAddress, user);

        await network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: [aaveDaiHolder],
        });

        daiSupplier = await ethers.getSigner(aaveDaiHolder);

    });

    it(`should supply tokens`, async () => {

        // console.log(await pool.getUserAccountData(user.getAddress()));
        await daiToken.connect(daiSupplier).transfer(user.getAddress(), ethers.utils.parseEther('1000'));

        console.log(await aaveOracle.getAssetPrice(aaveDaiAddress));


        await daiToken.connect(user).approve(pool.address, ethers.utils.parseEther('101'));
        await pool.connect(user).supply(aaveDaiAddress, ethers.utils.parseEther('100'), user.getAddress(), 0);
        // console.log(await pool.getUserAccountData(user.getAddress()));

    });

});
