import * as React from "react";

import {PasswordData} from "./PasswordData";

interface Props {
    data:PasswordData;
    selected:boolean;
    onClick(event:React.MouseEvent<HTMLLIElement>):void
}

interface State {

}

export class ListItem extends React.Component<Props, State> {
    constructor(props:Readonly<Props>) {
        super(props);
    }

    render() {
        return <li onClick={this.props.onClick} className={this.props.selected?"selected":undefined}>
            <div>{this.props.data.website}</div>
            <div>{this.props.data.accountId}</div>
        </li>
    }
}