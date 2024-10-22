import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@SpaceExplorer/styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./App/store";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
