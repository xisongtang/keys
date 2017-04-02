import * as React from "react";

interface Props {
    password: string;
    title?:string;
    editable?: boolean;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface State {
    passwordVisible: boolean;
}

export class VisiblePassword extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            passwordVisible: false
        }

        this.onToggleVisibleButtonClick = this.onToggleVisibleButtonClick.bind(this);
    }

    render() {
        let buttonClassName=!this.state.passwordVisible?"glyphicons x05 glyphicons-eye-open":"glyphicons x05 glyphicons-eye-close"
        return <div><span>{this.props.title}</span><input type={this.state.passwordVisible ? "text" : "password"} value={this.props.password} onChange={this.props.onChange} readOnly={this.props.editable}/><button onClick={this.onToggleVisibleButtonClick}><span className={buttonClassName} aria-hidden="true"></span></button></div>
    }

    onToggleVisibleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState((prevState: State) => {
            return { passwordVisible: !prevState.passwordVisible };
        })
    }
}