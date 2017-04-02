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
        let buttonClassName = !this.state.passwordVisible ? "glyphicons glyphicons-eye-open" : "glyphicons glyphicons-eye-close"
        return <div className="form-group">
            <label>{this.props.title}</label>
            <div className="input-group">
                <input type={this.state.passwordVisible ? "text" : "password"} value={this.props.password} onChange={this.props.onChange} readOnly={!this.props.editable}
                    ref={(input) => { this.textInput = input; }} className="form-control" />
                <span className="input-group-btn">
                    <button type="button" onClick={this.onClick} className="btn btn-blue btn-sm" >
                        <span className="glyphicons glyphicons-copy" aria-hidden="true" />
                    </button>
                </span>
                <span className="input-group-btn">
                    <button type="button" onClick={this.onToggleVisibleButtonClick} className="btn btn-default btn-sm">
                        <span className={buttonClassName} aria-hidden="true" />
                    </button>
                </span>
            </div>
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