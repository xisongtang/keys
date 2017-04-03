import * as React from "react";

import { VisiblePassword } from "./VisiblePassword";
import { ReplicableVisiblePassword } from "./ReplicableVisiblePassword";
import { PasswordData } from "./PasswordData";

interface Props {
    item:PasswordData;
};

type State = PasswordData;


export class KeyBody extends React.Component<Props, State> implements React.ComponentLifecycle<Props, State>{

    constructor(props: Props) {
        super(props);
        let state: State = PasswordData.create(props.item);
        this.state = state;
        this.onWebsiteChange = this.onWebsiteChange.bind(this);
        this.onAccountIdChange = this.onAccountIdChange.bind(this);
        this.onDigitNumberChange = this.onDigitNumberChange.bind(this);
        this.onHashTypeChange = this.onHashTypeChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        console.log("constructor", this.state);
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillReceiveProps(nextProps: Readonly<Props>) {
        console.log("componentWillReceiveProps", this.state, nextProps.item);
        if (nextProps.item.website === this.state.website) {
            return;
        }
        let state: State = PasswordData.create(nextProps.item);
        this.setState(state);
    }

    shouldComponentUpdate(nextProps: Readonly<Props>) {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentWillUpdate(nextProps: Readonly<Props>) {
        console.log("componentWillUpdate");
    }

    componentDidUpdate(nextProps: Readonly<Props>) {
        console.log("componentDidUpdate");
    }

    render() {
        console.log("Render");
        return <div className="row">
            <div className="col-sx-12 col-sm-9 col-md-6 col-sm-offset-2 col-md-offset-3">
                <div className="form-group">
                    <label>网站</label>
                    <input type="text" className="form-control" value={this.state.website} onChange={this.onWebsiteChange} />
                </div>
                <div className="form-group">
                    <label>账号</label>
                    <input type="text" className="form-control" value={this.state.accountId} onChange={this.onAccountIdChange} />
                </div>
                <div className="form-group">
                    <label>位数</label>
                    <input type="number" className="form-control" value={this.state.digitNumber} onChange={this.onDigitNumberChange} />
                </div>
                <div className="form-group">
                    <label>Hash</label>
                    <select className="form-control" value={this.state.hashType} onChange={this.onHashTypeChange}>
                        {
                            PasswordData.HASH_TYPE.map((type:string) => {
                                return <option key={type} value={type}>
                                    {type.toLocaleUpperCase()}
                                </option>
                            })
                        }
                    </select>
                </div>
                <VisiblePassword password={this.state.password} onChange={this.onPasswordChange} title="密钥" />
                <hr />
                <ReplicableVisiblePassword editable={false} password={this.state.genPassword} title="生成密码" />
            </div>
        </div>;
    }

    onWebsiteChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = PasswordData.create(this.props.item);
        state.setWebsite(event.target.value);
        this.setState(state);
    }

    onAccountIdChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = PasswordData.create(this.props.item);
        state.setAccountId(event.target.value);
        this.setState(state);
    }

    onHashTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let state: State = PasswordData.create(this.props.item);
        state.setHashType(event.target.value);
        this.setState(state);
    }

    onDigitNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = PasswordData.create(this.props.item);
        state.setDigitNumber(~~event.target.value);
        this.setState(state);
    }

    onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = PasswordData.create(this.props.item);
        state.setPassword(event.target.value);
        this.setState(state);
    }
}