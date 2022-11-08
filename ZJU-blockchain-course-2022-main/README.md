# ZJU-blockchain-course-2022-rhk

## 如何运行

1. 在本地启动ganache应用。
![image](https://user-images.githubusercontent.com/107160066/200669093-289e9b4c-623f-498d-b3cf-f6d4b2e5cd07.png)
2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install --save-dev @openzeppelin/contracts
    ```
3. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat compile
 ```
 编译成功图：
 ![image](https://user-images.githubusercontent.com/107160066/200670426-2ab89366-86ba-447b-8aed-cc4d4bec2a3a.png)

4. 在 `./contracts` 中部署合约，运行如下的命令：
    ```bash
    npx hardhat run ./scripts/deploy.ts --network ganache
    ```
    ganache的地址与私钥：
![image](https://user-images.githubusercontent.com/107160066/200674381-ef8dcf8b-380a-4e1b-bf7f-c21f488b8821.png)

    部署成功在下列地址：
![image](https://user-images.githubusercontent.com/107160066/200674571-3c0ee220-9e8e-4424-9c0d-dac6a7a035bf.png)

    
5. 将生成的abi和合约地址移到前端程序

![image](https://user-images.githubusercontent.com/107160066/200670544-03abf8d5-be22-4520-8dae-f51fa77c049e.png)

6. 在 `./frontend` 中启动前端程序，运行如下的命令：

    ```bash
    npm run start
    ```
    
![image](https://user-images.githubusercontent.com/107160066/200672466-6dff3271-45cf-4569-8a11-e6af415779e6.png)

7、运行程序

## 功能实现分析
完成了有关solidity智能合约的编写，能够实现领取积分、发起提案、投票以及给予提案通过者奖励积分的功能。
但是在前端上始终存在bug,难以调试成功。


