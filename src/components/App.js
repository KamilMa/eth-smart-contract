import React, { Component } from 'react'
import Web3 from 'web3'
import HelloContract from '../abis/HelloContract.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // ładuje dane z blockchainu do state reacta
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    const helloContractData = HelloContract.networks[networkId]
    if (helloContractData) {
      const helloContract = new web3.eth.Contract(HelloContract.abi, helloContractData.address)
      this.setState({ helloContract })
      let message = await helloContract.methods.getMessage().call()
      this.setState({ message: message })
      let accountWeiBalance = await web3.eth.getBalance(this.state.account)
      let accountBalance = web3.utils.fromWei(accountWeiBalance, 'Ether')
      this.setState({ accountBalance: accountBalance.toString() })
      let sendMessage = await helloContract.methods.getMessage()
    } else {
      window.alert('HelloContract contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  sendMessage = (newMessage) => {
    this.state.helloContract.methods.setMessage(newMessage).send({ from: this.state.account })
    console.log(newMessage)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      helloContract: {},
      accountBalance: '0',
      message: " ",
      loading: true
    }
  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        message={this.state.message}
        balance={this.state.accountBalance}
        sendMessage={this.sendMessage}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App