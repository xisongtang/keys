import * as React from "react";
import * as Axios from "axios";
import axios from "axios";

import { KeyBody } from "./KeyBody";
import { ListItem } from "./ListItem";
import { PasswordData } from "./PasswordData";

interface Props {

}

interface State {
    items: PasswordData[];
    currentItem: PasswordData;
}

export class App extends React.Component<Props, State> implements React.ComponentLifecycle<Props, State>{
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            items: [],
            currentItem: {
                website: "qq.com",
                accountId: "313193401@qq.com"
            }
        };
        axios.get("/data.json").then(
            (response: Axios.AxiosResponse) => {
                this.setState({ items: response.data.data })
            }
        );
    }

    render() {
        return <div>
            <div className="g-left">
                {this.state.items.map((data: PasswordData) => {
                    return <ListItem data={data} key={data.website} onClick={
                        (event: React.MouseEvent<HTMLLIElement>) => {
                            this.setState({
                                currentItem:data
                            })
                        }
                    } />
                })}
            </div>
            <KeyBody website={this.state.currentItem.website} accountId={this.state.currentItem.accountId} />
        </div>
    }
}