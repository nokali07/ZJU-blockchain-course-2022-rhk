# ZJU-blockchain-course-2022-rhk
**以下内容为作业仓库的README.md中需要描述的内容。请根据自己的需要进行修改并提交。**

## 如何运行

1. 在本地启动ganache应用。
![image](https://user-images.githubusercontent.com/107160066/200669093-289e9b4c-623f-498d-b3cf-f6d4b2e5cd07.png)
2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install 
    ```
3. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat compile
    ```
4. 在 `./contracts` 中部署合约，运行如下的命令：
    ```bash
    npx hardhat run ./scripts/deploy.ts --network ganache
    ```
    ![image](https://user-images.githubusercontent.com/107160066/200668731-df9a3239-2e54-44d9-b60d-78b3bce9770e.png)
5. 将生成的abi和合约地址移到前端程序

6. 在 `./frontend` 中启动前端程序，运行如下的命令：
    ```bash
    npm run start
    ```

## 功能实现分析

实现了



部署合约

