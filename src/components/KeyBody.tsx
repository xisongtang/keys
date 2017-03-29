import * as React from "react";

export interface KeyBodyProps { website: string; accountId: string; }

export class KeyBody extends React.Component<KeyBodyProps, undefined> {
    render() {
        return <div>
            <div><span>网站</span><input type="text" value={this.props.website} /></div>
            <div><span>账号</span><input type="text" value={this.props.accountId} /></div>
            <div><span>密钥</span><input type="password" /></div>
            <div><span>hash方式</span><input type="text" /></div>
            <div><span>生成密码</span><span></span></div>
        </div>;
    }
}