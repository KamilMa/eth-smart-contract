import React, { Component } from 'react'

class Main extends Component {

    render() {
        return (
            <div id="content" className="mt-3">
                <div className="card mb-2" >
                    <div className="card-body">
                        <form className="mb-2" onSubmit={(event) => {
                            event.preventDefault()
                            let amount
                            amount = this.input.value.toString()
                            this.props.sendMessage(amount)
                        }}>
                            <div>
                                <label className="float-left"><b>HelloContract</b></label>
                                <span className="float-right text-muted">
                                    <br />
                                Message: {this.props.message}
                                    <br />
                                Balance Account: {this.props.balance} ETH
                            </span>
                            </div>
                            <div className="form-group my-2">
                                <label>Write new message</label>
                                <input
                                    type="text"
                                    ref={(input) => { this.input = input }}
                                    className="form-control form-control-lg w-50"
                                    placeholder="Message.."
                                    required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-sm">Send!</button>

                        </form>
                        <button
                            type="submit"
                            className="btn btn-link btn-block btn-sm"
                            onClick={(event) => {
                                event.preventDefault()
                            }}>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main