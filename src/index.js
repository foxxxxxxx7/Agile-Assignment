import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from "react-dom/client";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TopMoviesPage from "./pages/topMoviesPage";
import TVHomePage from "./pages/TVHomePage";
import TVPage from "./pages/TVDetailsPage";
import TVReviewPage from "./pages/TVReviewPage";
import UpcomingTVPage from "./pages/upcomingTVPage";
import AddTVReviewPage from "./pages/TVReviewPage";
import FavoriteTVPage from "./pages/favoriteTVPage";
import TopTVPage from "./pages/topTVPage";
import TVContextProvider from "./contexts/TVContext";
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <TVContextProvider>
            <Routes>
              <Route exact path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/" element={<HomePage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage />} />
              <Route path="/movies/topMovies" element={<TopMoviesPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/tv" element={<TVHomePage />} />
              <Route path="/tv/:id" element={<TVPage />} />
              <Route path="/TVreviews/:id" element={<TVReviewPage />} />
              <Route path="/tv/upcomingTV" element={<UpcomingTVPage />} />
              <Route path="/TVreviews/form" element={<AddTVReviewPage />} />
              <Route path="/tv/favorites" element={<FavoriteTVPage />} />
              <Route path="/tv/topTV" element={<TopTVPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </TVContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);