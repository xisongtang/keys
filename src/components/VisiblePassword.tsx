import * as React from "react";

interface Props {
    password?: string;
    title?: string;
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
        let buttonClassName = !this.state.passwordVisible ? "glyphicons glyphicons-eye-open" : "glyphicons glyphicons-eye-close"
        return <div className="form-group">
            <label>{this.props.title}</label>
            <div className="input-group">
                <input type={this.state.passwordVisible ? "text" : "password"} className="form-control" value={this.props.password} onChange={this.props.onChange} readOnly={this.props.editable} />
                <span className="input-group-btn">
                    <button type="button" onClick={this.onToggleVisibleButtonClick} className="btn btn-default btn-sm">
                        <span className={buttonClassName} aria-hidden="true" />
                    </button>
                </span>
            </div>
        </div>
    }

    onToggleVisibleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState((prevState: State) => {
            return { passwordVisible: !prevState.passwordVisible };
        })
    }
}