import React from 'react';
import './App.css';
import {Button,Input} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from 'react';
import {StudentSocietyDAOContract, web3} from "./utils/contracts";
import './index.css';

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
// TODO change according to your configuration
const GanacheTestChainName = 'homework'
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545'

function App() {

    const [account, setAccount] = useState('')
    const [accountBalance, setAccountBalance] = useState(0)

    useEffect(() => {
        // 初始化检查用户是否已经连接钱包
        // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
        const initCheckAccounts = async () => {
            // @ts-ignore
            const {ethereum} = window;
            if (Boolean(ethereum && ethereum.isMetaMask)) {
                // 尝试获取连接的用户账户
                const accounts = await web3.eth.getAccounts()
                if(accounts && accounts.length) {
                    setAccount(accounts[0])
                }
            }
        }

        initCheckAccounts()
    }, [])

    useEffect(() => {
        const getAccountInfo = async () => {
            if (StudentSocietyDAOContract) {
                const ab = await StudentSocietyDAOContract.methods.balanceOf(account).call()
                setAccountBalance(ab)
            } else {
                alert('Contract not exists.')
            }
        }

        if(account !== '') {
            getAccountInfo()
        }
    }, [account])

    const onpoint_get = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentSocietyDAOContract) {
            try {
                await StudentSocietyDAOContract.methods.point_get().send({
                    from: account
                })
                alert('You have got 100 pionts.')
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }
    }

    const onProposalinitiate = async () => {
        if(account === '') {
            alert('You have not connected yet.')
            return
        }

        if (StudentSocietyDAOContract) {
            try {
                await StudentSocietyDAO.methods.proposal_initiate().send({
                    from: account
                })

                alert('You have played the game.')
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onVote = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        } else if(account !== managerAccount) {
            alert('Only manager can invoke this method.')
            return
        }

        if (StudentSocietyDAOContract) {
            try {
                await StudentSocietyDAO.methods.member_vote().send({
                    from: account
                })

                alert('You have draw the game.')
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onJudge = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        } else if(account !== managerAccount) {
            alert('Only manager can invoke this method.')
            return
        }


        if (StudentSocietyDAOContract) {
            try {
                await StudentSocietyDAO.methods.proposal_judge().send({
                    from: account
                })
                if(proposals[index].fianl_judge = true){
                  alert('Proposal has been adopted.')
                }
                else {
                  alert('Proposal has been rejected.')
                }
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onClickConnectWallet = async () => {
        // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
        // @ts-ignore
        const {ethereum} = window;
        if (!Boolean(ethereum && ethereum.isMetaMask)) {
            alert('MetaMask is not installed!');
            return
        }

        try {
            // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
            if (ethereum.chainId !== GanacheTestChainId) {
                const chain = {
                    chainId: GanacheTestChainId, // Chain-ID
                    chainName: GanacheTestChainName, // Chain-Name
                    rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
                };

                try {
                    // 尝试切换到本地网络
                    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
                } catch (switchError: any) {
                    // 如果本地网络没有添加到Metamask中，添加该网络
                    if (switchError.code === 4902) {
                        await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
                        });
                    }
                }
            }

            // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
            await ethereum.request({method: 'eth_requestAccounts'});
            // 获取小狐狸拿到的授权用户列表
            const accounts = await ethereum.request({method: 'eth_accounts'});
            // 如果用户存在，展示其account，否则显示错误信息
            setAccount(accounts[0] || 'Not able to get accounts');
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div className='container'>
            <div className='main'>
                <h1>社团系统</h1>
                <Button onClick={onpoint_get}>新成员领取积分</Button>
                <div className='account'>
                    {account === '' && <Button onClick={onClickConnectWallet}>连接钱包</Button>}
                    <div>当前用户：{account === '' ? '无用户连接' : account}</div>
                    <div>当前用户拥有积分数量：{account === '' ? 0 : accountBalance}</div>
                </div>
                <div className='operation'>
                    <div style={{marginBottom: '20px'}}>操作栏</div>
                    <div className='iniitial'>
                        <Input placeholder="提案序号" maxLength={6} showCount value={this.state.ccode}
                        className={stock.search_row_input} onChange={this.changeCode.bind(this)} ></Input>
                        <Input placeholder="提案名称" maxLength={50} showCount value={this.state.ccode}
                        className={stock.search_row_input} onChange={this.changeCode.bind(this)} ></Input>
                        <Input placeholder="投票持续时间（秒）" maxLength={6} showCount value={this.state.ccode}
                        className={stock.search_row_input} onChange={this.changeCode.bind(this)} ></Input>
                        <Button style={{width: '200px'}} onClick={onProposalinitiate}>发起提案</Button>
                    </div>
                    <div className='vote'>
                        <Input placeholder="投票对象提案序号" maxLength={6} showCount value={this.state.ccode}
                        className={stock.search_row_input} onChange={this.changeCode.bind(this)} ></Input>
                        <Input placeholder="投票持续时间（秒）" maxLength={6} showCount value={this.state.ccode}
                        className={stock.search_row_input} onChange={this.changeCode.bind(this)} ></Input>
                        <Button style={{width: '200px'}} onClick={onVote}>投票</Button>
                    </div>
                    <div className='judge'>
                        <Input placeholder="结算提案序号" maxLength={6} showCount value={this.state.ccode}
                        className={stock.search_row_input} onChange={this.changeCode.bind(this)} ></Input>
                        <Button style={{width: '200px'}} onClick={onJudge}>查询提案结果</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default App;
