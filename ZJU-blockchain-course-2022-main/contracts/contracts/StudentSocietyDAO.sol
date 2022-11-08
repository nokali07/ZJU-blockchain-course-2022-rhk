// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment the line to use openzeppelin/ERC20
// You can use this dependency directly because it has been installed already
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StudentSocietyDAO {

    event ProposalInitiated(uint32 proposalIndex);//发起提案事件
    event ProposalEnded(uint32 proposalIndex);//提案投票时间结束事件

    uint256 constant public INI_fee = 10; //发起投案的费用
    uint256 constant public VOTE_fee = 1; //投票费用
    uint256 constant public SUC_bonus = 20; //投案通过的奖励

    struct Proposal {
        uint32 index;      // index of this proposal
        address proposer;  // who make this proposal
        uint256 startTime; // proposal start time
        uint256 duration;  // proposal duration
        string name;       // proposal name
        uint256 votecount;  // 提案得到的投票计数，同意+1，反对-1。初始值为0
        bool fianl_judge; //判断投票是否通过
    }

    ERC20 studentERC20;

    mapping(uint32 => Proposal) proposals; // A map from proposal index to proposal
    mapping(address => bool) claimedmemberList; 

    constructor() {
        // maybe you need a constructor
        studentERC20 = new ERC20("club", "clubToken");
    }

    //社团成员领取初始积分100分 
    function point_get() external {
        require(claimedmemberList[msg.sender] == false, "This member has got piont already");
        studentERC20.transfer(msg.sender,100);
        claimedmemberList[msg.sender] = true;
    }
    
    //成员发起提案
    function proposal_initiate(Proposal memory proposal_to) public{
        studentERC20.transferFrom(msg.sender, address(this), INI_fee);//支付提案费用
        proposals[proposal_to.index] = proposal_to;
        emit ProposalInitiated(proposal_to.index); //触发事件
    }

    //成员投票
    function member_vote(uint32 index,bool Flag) public{
        //判断是否在投票时间内
        require(block.timestamp <= proposals[index].startTime + proposals[index].duration,"Vote has ended");

        studentERC20.transferFrom(msg.sender, address(this), VOTE_fee); //支付投票费用
        if(Flag ==  true){
            //投同意票，Flag为true
            proposals[index].votecount += 1;
        }
        else{
            proposals[index].votecount -= 1;
        }
    }

    //投票结束后，判断提案是否通过
    function proposal_judge(uint32 index) public{
        require(block.timestamp > proposals[index].startTime + proposals[index].duration);
        if (proposals[index].votecount > 0){
            //votecount>0表示赞成票多于反对票，提案通过
            proposals[index].fianl_judge = true;
            studentERC20.transfer(proposals[index].proposer,SUC_bonus);
        }
        else{
            proposals[index].fianl_judge = false;
        }
        return proposals[index].fianl_judge;
    }
}
