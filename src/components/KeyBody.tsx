import * as React from "react";
import * as CryptoJS from "crypto-js";

interface KeyBodyProps {
    readonly website?: string;
    readonly accountId?: string;
    readonly password?: string;
    readonly hashType?: string;
    readonly digitNumber?: number;
}

interface KeyBodyStates {
    website?: string;
    accountId?: string;
    password: string;
    hashType: string;
    digitNumber: number;
    genPassword?: string;
    passwordVisible: boolean;
}

const HASH_TYPE: ReadonlyArray<string> = ["MD5", "SHA1", "SHA256", "SHA224", "SHA384", "SHA512", "RIPEMD160"];

const HASHER: Readonly<{ [key: string]: CryptoJS.lib.Hasher; }> = { MD5: CryptoJS.algo.MD5, SHA1: CryptoJS.algo.SHA1, SHA256: CryptoJS.algo.SHA256, SHA224: CryptoJS.algo.SHA224, SHA384: CryptoJS.algo.SHA384, SHA512: CryptoJS.algo.SHA512, RIPEMD160: CryptoJS.algo.RIPEMD160 };

const ALPHABET: Readonly<string> = "0123456789012345678901234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+-={}|<>,.{}[];:'\"\\";


export class KeyBody extends React.Component<KeyBodyProps, KeyBodyStates> {

    constructor(props: KeyBodyProps) {
        super(props);
        this.state = {
            website: props.website,
            accountId: props.accountId,
            hashType: props.hashType ? props.hashType : HASH_TYPE[0],
            digitNumber: props.digitNumber ? props.digitNumber : 16,
            password: props.password ? props.password : 'password',
            passwordVisible: false
        };
        this.onWebsiteChange = this.onWebsiteChange.bind(this);
        this.onAccountIdChange = this.onAccountIdChange.bind(this);
        this.onDigitNumberChange = this.onDigitNumberChange.bind(this);
        this.onHashTypeChange = this.onHashTypeChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onGenerateButtonClick = this.onGenerateButtonClick.bind(this);
        this.onToggleVisibleButtonClick = this.onToggleVisibleButtonClick.bind(this);
    }
    render() {
        return <div>
            <div><span>网站</span><input type="text" value={this.state.website} onChange={this.onWebsiteChange} /></div>
            <div><span>账号</span><input type="text" value={this.state.accountId} onChange={this.onAccountIdChange} /></div>
            <div>
                <span>hash方式</span>
                <select value={this.state.hashType} onChange={this.onHashTypeChange}>
                    {
                        HASH_TYPE.map((type) => {
                            return <option key={type} value={type}>
                                {type.toLocaleUpperCase()}
                            </option>
                        })
                    }
                </select>
            </div>
            <div><span>位数</span><input type="digitNumber" value={this.state.digitNumber} onChange={this.onDigitNumberChange} /></div>
            <div><span>密钥</span><input type={this.state.passwordVisible ? "text" : "password"} value={this.state.password} onChange={this.onPasswordChange} /><button onClick={this.onToggleVisibleButtonClick}><span className="glyphicons x05 glyphicons-eye-open" aria-hidden="true"></span></button></div>
            <div><span>生成密码</span><span>{this.state.genPassword}</span></div>
            <input type="button" onClick={this.onGenerateButtonClick} value="生成" />
        </div>;
    }

    onWebsiteChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            website: event.target.value
        });
    }

    onAccountIdChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            accountId: event.target.value
        })
    }

    onHashTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            hashType: event.target.value
        })
    }

    onDigitNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            digitNumber: ~~event.target.value
        })
    }

    onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.target.value
        })
    }

    onToggleVisibleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState((prevState: KeyBodyStates) => {
            return { passwordVisible: !prevState.passwordVisible };
        })
    }

    onGenerateButtonClick(event: React.MouseEvent<HTMLInputElement>) {
        let website: string = this.state.website ? this.state.website : '', password: string = this.state.password ? this.state.password : '', accountId: string = this.state.accountId ? this.state.accountId : '';
        let salt: string = website + accountId;
        let wordArray: CryptoJS.lib.WordArray = CryptoJS.PBKDF2(password, salt, {
            keySize: this.state.digitNumber, iterations: 100, hasher: HASHER[this.state.hashType]
        });
        let result: string = wordArray.words.map((v: number, i: number) => {
            if (this.state.digitNumber === undefined || i >= this.state.digitNumber) return;
            let index: number = v % ALPHABET.length;
            index < 0 && (index += ALPHABET.length);
            return ALPHABET[index];
        }).join('');
        this.setState({ genPassword: result });
    }
}