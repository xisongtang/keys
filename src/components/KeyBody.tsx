import * as React from "react";

interface KeyBodyProps {
    readonly website?: string;
    readonly accountId?: string;
    readonly hashType?: string;
    readonly password?: string;
}

interface KeyBodyStates extends KeyBodyProps {
    readonly genPassword?: string;
}

let HashType: ReadonlyArray<string> = ["md5", "sha1"];


export class KeyBody extends React.Component<KeyBodyProps, KeyBodyStates> {
    public static defaultProps: Partial<KeyBodyProps> = {
        hashType: HashType[0]
    }

    constructor(props: KeyBodyProps) {
        super(props);
        this.state = {
            website: props.website,
            accountId: props.accountId,
            hashType: props.hashType
        };
        this.onWebsiteChange = this.onWebsiteChange.bind(this);
        this.onAccountIdChange = this.onAccountIdChange.bind(this);
        this.onHashTypeChange = this.onHashTypeChange.bind(this);
    }
    render() {
        return <div>
            <div><span>网站</span><input type="text" value={this.state.website} onChange={this.onWebsiteChange} /></div>
            <div><span>账号</span><input type="text" value={this.state.accountId} onChange={this.onAccountIdChange} /></div>
            <div>
                <span>hash方式</span>
                <select value={this.state.hashType} onChange={this.onHashTypeChange}>
                    {
                        HashType.map((type) => {
                            return <option key={type} value={type}>
                                {type.toLocaleUpperCase()}
                            </option>
                        })
                    }
                </select>
            </div>
            <div><span>密钥</span><input type="password" /></div>
            <div><span>生成密码</span><span>{this.state.genPassword}</span></div>
            <button>生成</button>
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
            accountId: event.target.value
        })
    }
}