import { useAppDispatch, useAppSelector } from "./App/hooks";
import { globalState, setIsLoading } from "./redux-slices/globalSlice";
import { AboutPage, HomePage, PoDPage } from "./Pages/index";
import { ErrorMessage, GlobalLoader, NavBar, NotFound } from "./Layouts/index";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import spaceVideo from "./assets/space-explorer-earth-view-vid.webm";
import useGetAgentView from "./hooks/useGetAgentView";

const ImagePageComponent = lazy(() => import("@SpaceExplorer/Pages/ImagePage/ImagePage"));
const ArticlePageComponent = lazy(() => import("@SpaceExplorer/Pages/ArticlesPage/ArticlesPage"));
const PlanetPageComponent = lazy(() => import("@SpaceExplorer/Pages/PlanetsPage/PlanetsPage"));

function App() {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoading(false));
    }, [dispatch]);

    const { isMobileWidth } = useGetAgentView();

    const hasErrorOnApp = globalData.error.error && globalData.error.page === "app";

    return (
        <div className="main">
            {isMobileWidth && (
                <video className="videoTag" autoPlay loop muted>
                    <source src={spaceVideo} type="video/webm" />
                </video>
            )}
            <Suspense fallback={<GlobalLoader />}>
                <NavBar />
            </Suspense>
            {globalData.loading && (
                <div className="loader-comp">
                    <GlobalLoader />
                </div>
            )}
            <Suspense fallback={<GlobalLoader />}>
                {hasErrorOnApp ? <ErrorMessage error={globalData.error.error} /> : null}
                {globalData.showPoD ? <PoDPage /> : null}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/gallery" element={<ImagePageComponent />} />
                    <Route path="/articles" element={<ArticlePageComponent />} />
                    <Route path="/planets" element={<PlanetPageComponent />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Analytics />
        </div>
    );
}
export default App;
