import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { PasswordData } from "./PasswordData";
import { KeyBody } from "./KeyBody";
import { KeyListItem } from "./KeyListItem";

interface Props {

}

interface State {
    items: PasswordData[];
    currentItem: PasswordData;
    isAdding: boolean;
}

export class App extends React.Component<Props, State> implements React.ComponentLifecycle<Props, State>{
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            items: [],
            currentItem: new PasswordData,
            isAdding: false
        };
        axios.get("./data.json").then(
            (response: AxiosResponse) => {
                let items: PasswordData[] = response.data.data.map((value: PasswordData) => {
                    return PasswordData.create(value);
                });
                this.setState({
                    items: items,
                    currentItem: items[0]
                });
            }
        );

        this.onAddButtonClick = this.onAddButtonClick.bind(this);
    }

    render() {
        return <div className="row">
            <div className="col-xs-7 col-sm-9 g-left">
                <KeyBody item={this.state.currentItem} />
            </div>
            <div className="col-xs-5 col-sm-3 g-right">
                <div className="list-group">
                    {this.state.items.map((data: PasswordData) => {
                        return <KeyListItem data={data} key={data.website} onClick={
                            (event: React.MouseEvent<HTMLAnchorElement>) => {
                                if (this.state.currentItem.website !== data.website)
                                    this.setState({
                                        currentItem: PasswordData.create(data)
                                    });
                            }
                        } selected={this.state.currentItem.website === data.website} />
                    })}
                    <a href="#" onClick={this.onAddButtonClick} className="list-group-item adding-item">
                        <span className="glyphicons glyphicons-plus"></span>
                    </a>
                </div>
            </div>
        </div>
    }

    onAddButtonClick(event: React.MouseEvent<HTMLAnchorElement>) {

    }
}
