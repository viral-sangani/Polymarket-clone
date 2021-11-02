// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Polymarket {
    address public owner;
    address public polyToken;

    mapping(uint256 => Questions) public questions;
    uint256 public totalQuestions = 0;

    constructor(address _polyToken) {
        owner = msg.sender;
        polyToken = _polyToken;
    }

    struct Questions {
        uint256 id;
        string question;
        uint256 timestamp;
        address createdBy;
        string creatorImageHash;
        AmountAdded[] yesCount;
        AmountAdded[] noCount;
        uint256 totalAmount;
        uint256 totalYesAmount;
        uint256 totalNoAmount;
        bool eventCompleted;
        string description;
        string resolverUrl;
    }

    struct AmountAdded {
        address user;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => uint256) public winningAmount;
    address[] public winningAddresses;

    event QuestionCreated(
        uint256 id,
        string question,
        uint256 timestamp,
        address createdBy,
        string creatorImageHash,
        uint256 totalAmount,
        uint256 totalYesAmount,
        uint256 totalNoAmount
    );

    function createQuestion(
        string memory _question,
        string memory _creatorImageHash,
        string memory _description,
        string memory _resolverUrl
    ) public {
        require(msg.sender == owner, "Unauthorized");

        uint256 timestamp = block.timestamp;

        Questions storage question = questions[totalQuestions];

        question.id = totalQuestions++;
        question.question = _question;
        question.timestamp = timestamp;
        question.createdBy = msg.sender;
        question.creatorImageHash = _creatorImageHash;
        question.totalAmount = 0;
        question.totalYesAmount = 0;
        question.totalNoAmount = 0;
        question.description = _description;
        question.resolverUrl = _resolverUrl;

        emit QuestionCreated(
            totalQuestions,
            _question,
            timestamp,
            msg.sender,
            _creatorImageHash,
            0,
            0,
            0
        );
    }

    function addYesBet(uint256 _questionId) public payable {
        require(_questionId == 0, "Question ID cannot be null");
        Questions storage question = questions[_questionId];
        AmountAdded memory amountAdded = AmountAdded(
            msg.sender,
            msg.value,
            block.timestamp
        );

        question.totalYesAmount += msg.value;
        question.totalAmount += msg.value;
        question.yesCount.push(amountAdded);
    }

    function addNoBet(uint256 _questionId) public payable {
        require(_questionId == 0, "Question ID cannot be null");
        Questions storage question = questions[_questionId];
        AmountAdded memory amountAdded = AmountAdded(
            msg.sender,
            msg.value,
            block.timestamp
        );

        question.totalNoAmount += msg.value;
        question.totalAmount += msg.value;
        question.noCount.push(amountAdded);
    }

    function getGraphData(uint256 _questionId)
        public
        view
        returns (AmountAdded[] memory, AmountAdded[] memory)
    {
        Questions storage question = questions[_questionId];
        return (question.yesCount, question.noCount);
    }

    function distributeWinningAmount(uint256 _questionId, bool eventOutcome)
        public
        payable
    {
        require(msg.sender == owner, "Unauthorized");
        require(_questionId == 0, "Question ID cannot be empty");

        Questions storage question = questions[_questionId];
        if (eventOutcome) {
            for (uint256 i = 0; i < question.yesCount.length; i++) {
                uint256 amount = (question.totalNoAmount *
                    question.yesCount[i].amount) / question.totalYesAmount;
                winningAmount[question.yesCount[i].user] += (amount +
                    question.yesCount[i].amount);
                winningAddresses.push(question.yesCount[i].user);
            }

            for (uint256 i = 0; i < winningAddresses.length; i++) {
                address payable _address = payable(winningAddresses[i]);
                ERC20(polyToken).transfer(_address, winningAmount[_address]);
                delete winningAmount[_address];
            }
            delete winningAddresses;
        } else {
            for (uint256 i = 0; i < question.noCount.length; i++) {
                uint256 amount = (question.totalYesAmount *
                    question.noCount[i].amount) / question.totalNoAmount;
                winningAmount[question.noCount[i].user] += (amount +
                    question.noCount[i].amount);
                winningAddresses.push(question.noCount[i].user);
            }

            for (uint256 i = 0; i < winningAddresses.length; i++) {
                address payable _address = payable(winningAddresses[i]);
                ERC20(polyToken).transfer(_address, winningAmount[_address]);
                delete winningAmount[_address];
            }
            delete winningAddresses;
        }
    }
}

// "Will Modi win?", "abcd", "xyz", "https;//google.com"
