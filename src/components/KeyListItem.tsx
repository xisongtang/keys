import * as React from "react";

import { PasswordData } from "./PasswordData";

interface Props {
    data: PasswordData;
    selected: boolean;
    onClick(event: React.MouseEvent<HTMLAnchorElement>): void
}

interface State {

}

export class KeyListItem extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
    }

    render() {
        let className = "list-group-item text-overflow ";
        className += this.props.selected ? "active" : "";
        return <a href="#" onClick={this.props.onClick} className={className}>
            <h4 className="list-group-item-heading">{this.props.data.website}</h4>
            <p className="list-group-item-text">{this.props.data.accountId}</p>
        </a>
    }
}