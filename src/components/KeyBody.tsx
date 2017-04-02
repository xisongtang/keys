import * as React from "react";
import * as CryptoJS from "crypto-js";

import { VisiblePassword } from "./VisiblePassword";
import { ReplicableVisiblePassword } from "./ReplicableVisiblePassword";
import { PasswordData } from "./PasswordData";

type Props = PasswordData

interface State extends PasswordData {
    password: string;
    hashType: string;
    digitNumber: number;
}

const HASH_TYPE: ReadonlyArray<string> = ["MD5", "SHA1", "SHA256", "SHA224", "SHA384", "SHA512", "RIPEMD160"];

const HASHER: Readonly<{ [key: string]: CryptoJS.lib.Hasher; }> = { MD5: CryptoJS.algo.MD5, SHA1: CryptoJS.algo.SHA1, SHA256: CryptoJS.algo.SHA256, SHA224: CryptoJS.algo.SHA224, SHA384: CryptoJS.algo.SHA384, SHA512: CryptoJS.algo.SHA512, RIPEMD160: CryptoJS.algo.RIPEMD160 };

const ALPHABET: Readonly<string> = "0123456789012345678901234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+-={}|<>,.{}[];:'\"\\";


export class KeyBody extends React.Component<Props, State> implements React.ComponentLifecycle<Props, State>{

    constructor(props: Props) {
        super(props);
        let state: State = {
            website: props.website,
            accountId: props.accountId,
            hashType: props.hashType ? props.hashType : HASH_TYPE[0],
            digitNumber: props.digitNumber ? props.digitNumber : 16,
            password: props.password ? props.password : 'password'
        }
        state.genPassword = this.generatePassword(state);
        this.state = state;
        this.onWebsiteChange = this.onWebsiteChange.bind(this);
        this.onAccountIdChange = this.onAccountIdChange.bind(this);
        this.onDigitNumberChange = this.onDigitNumberChange.bind(this);
        this.onHashTypeChange = this.onHashTypeChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        console.log("constructor");
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillReceiveProps(nextProps: Readonly<Props>) {
        console.log("componentWillReceiveProps");
        if (nextProps.website === this.state.website) {
            return;
        }
        let state: State = {
            website: nextProps.website ? nextProps.website : this.state.website,
            accountId: nextProps.accountId ? nextProps.accountId : this.state.accountId,
            hashType: nextProps.hashType ? nextProps.hashType : this.state.hashType,
            digitNumber: nextProps.digitNumber ? nextProps.digitNumber : this.state.digitNumber,
            password: nextProps.password ? nextProps.password : this.state.password
        };
        if (!nextProps.genPassword) {
            state.genPassword = this.generatePassword(state);
        } else {
            state.genPassword = nextProps.genPassword;
        }
        this.setState(state);
    }

    shouldComponentUpdate(nextProps: Readonly<Props>) {
        console.log("shouldComponentUpdate", this.state.website, nextProps.website);
        return true;
    }

    componentWillUpdate(nextProps: Readonly<Props>) {
        console.log("componentWillUpdate", this.state.website, nextProps.website);
    }

    componentDidUpdate(nextProps: Readonly<Props>) {
        console.log("componentDidUpdate", this.state.website, nextProps.website);
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
                            HASH_TYPE.map((type) => {
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
        let state: State = Object.assign({}, this.state, { website: event.target.value });
        state.genPassword = this.generatePassword(state);
        this.setState(state);
    }

    onAccountIdChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = Object.assign({}, this.state, { accountId: event.target.value });
        state.genPassword = this.generatePassword(state);
        this.setState(state);
    }

    onHashTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let state: State = Object.assign({}, this.state, { hashType: event.target.value });
        state.genPassword = this.generatePassword(state);
        this.setState(state);
    }

    onDigitNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = Object.assign({}, this.state, { digitNumber: event.target.value });
        state.genPassword = this.generatePassword(state);
        this.setState(state);
    }

    onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state: State = Object.assign({}, this.state, { password: event.target.value });
        state.genPassword = this.generatePassword(state);
        this.setState(state);
    }

    generatePassword(state: PasswordData): string {
        let website: string = state.website as string, password: string = state.password as string, accountId: string = state.accountId as string, digitNumber = state.digitNumber;
        let salt: string = website + accountId;
        let wordArray: CryptoJS.lib.WordArray = CryptoJS.PBKDF2(password, salt, {
            keySize: digitNumber, iterations: 100, hasher: HASHER[state.hashType as string]
        });
        let result: string = wordArray.words.map((v: number, i: number) => {
            if (digitNumber === undefined || i >= digitNumber) return;
            let index: number = v % ALPHABET.length;
            index < 0 && (index += ALPHABET.length);
            return ALPHABET[index];
        }).join('');
        return result;
    }
}