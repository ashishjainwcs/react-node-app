import Main from "../Main/Main";
import { SiteDataContext } from "../Context/Context";
import React from "react";

class App extends React.Component {



    constructor() { // lifecycle
        super();
        console.log("App component construction");
    }

    render() {


        return <>

            <Main />

        </>
    }
}

export default App;