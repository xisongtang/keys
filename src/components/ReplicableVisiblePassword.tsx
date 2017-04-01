import * as React from "react";
import { VisiblePassword } from "./VisiblePassword";

interface Props {
    title?: string;
    password?: string;
    editable?: boolean;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface State {
    passwordVisible: boolean;
}

export class ReplicableVisiblePassword extends React.Component<Props, State> {
    private textInput: HTMLInputElement;
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            passwordVisible: false
        }

        this.onClick = this.onClick.bind(this);
        this.onToggleVisibleButtonClick = this.onToggleVisibleButtonClick.bind(this);
    }

    render() {
        return <div>
            <span>{this.props.title}</span>
            <input type={this.state.passwordVisible ? "text" : "password"} value={this.props.password} onChange={this.props.onChange} readOnly={!this.props.editable}
                ref={(input) => { this.textInput = input; }} />
            <button onClick={this.onToggleVisibleButtonClick}><span className="glyphicons x05 glyphicons-eye-open" aria-hidden="true"></span></button>
            <button onClick={this.onClick} ><span className="glyphicons x05 glyphicons-copy" aria-hidden="true"></span></button>
        </div>
    }

    onClick(event: React.MouseEvent<HTMLInputElement>) {
        this.setState({ passwordVisible: true });
        this.textInput.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    onToggleVisibleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState((prevState: State) => {
            return { passwordVisible: !prevState.passwordVisible };
        })
    }
}