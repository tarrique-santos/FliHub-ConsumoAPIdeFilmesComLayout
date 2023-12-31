import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../img/Hulu_Logo.svg.png";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const KEY = process.env.REACT_APP_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreName, setSelectedGenreName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;

    if (searchTerm) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${searchTerm}`;
    }

    if (selectedGenre) {
      apiUrl += `&with_genres=${selectedGenre}`;
    }

    if (selectedCategory !== "all") {
      apiUrl = `https://api.themoviedb.org/3/discover/${selectedCategory}?api_key=${KEY}&language=pt-BR`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [KEY, searchTerm, selectedGenre, selectedCategory]);

  const genreNames = {
    28: "Ação",
    878: "Ficção",
    12: "Aventura",
    35: "Comédia",
    10749: "Romance",
    18: "Drama",
    37: "Faroeste",
    27: "Terror",
    53: "Suspense",
    // Adicione outros gêneros aqui, se necessário
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleGenreChange = (e) => {
    const selectedGenreId = e.target.value;
    setSelectedGenre(selectedGenreId);

    setSelectedGenreName(genreNames[selectedGenreId] || "Todos");
  };

  // Configurações do slider do react-slick
  const sliderSettings = {
    infinite: true,
    slidesToShow: 5, // Mostra 5 slides em telas maiores
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1068,
        settings: {
          slidesToShow: 4, // Mostra 3 slides em telas médias
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2, // Mostra 2 slides em telas menores
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Mostra 1 slide em telas muito pequenas
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Modifique as configurações do slider para mostrar apenas um slide por vez
  const sliderSettings2 = {
    infinite: true,
    slidesToShow: 1, // Mostra 1 slide de cada vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1068,
        settings: {
          slidesToShow: 1, // Mostra 1 slide de cada vez em telas médias
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1, // Mostra 1 slide de cada vez em telas menores
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Mostra 1 slide de cada vez em telas muito pequenas
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Divide a lista de filmes em 3 partes
  const numSlides = 2;
  const chunkSize = Math.ceil(movies.length / numSlides);
  const movieChunks = [];
  for (let i = 0; i < movies.length; i += chunkSize) {
    movieChunks.push(movies.slice(i, i + chunkSize));
  }

  // const filmes = [
  //   {
  //     id: 1,
  //     title: 'Avatar II',
  //     image: 'https://pipocasclub.com.br/wp-content/uploads/2022/12/avatar-2-image002-e1671144701779.png',
  //   },
  //   {
  //     id: 2,
  //     title: 'Deadpool II',
  //     image: 'https://cinemaemserie.com.br/wp-content/uploads/2018/05/deadpool-2-capa-rezenha.jpg',
  //   },
  //   {
  //     id: 3,
  //     title: 'Elementos',
  //     image: 'https://ovicio.com.br/wp-content/uploads/2023/03/20230328-scale-1.jpg',
  //   },
  //   {
  //     id: 4,
  //     title: 'Homem-aranha III: Sem Volta Para Casa',
  //     image: 'https://i.ytimg.com/vi/t5LHl6XN6EY/maxresdefault.jpg',
  //   },
  //   {
  //     id: 5,
  //     title: 'Besouro Azul',
  //     image: 'https://ultimatodobacon.com.br/static/31c3c4c30ae7d95637fdc7f7b053844f/ebf99/besouro-azul-capa.png',
  //   },
  // ];

  return (
    <Container>
      <header>
        <img id="logo" src={logo} alt="FlixHub Logo" />
      </header>
      <nav>
        <form id="search">
          <input
            type="search"
            placeholder="Pesquisar"
            id="searchIpt"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <ul id="opc">
              <li>
                <select value={selectedGenre} onChange={handleGenreChange}>
                  <option value="">Todos</option>
                  {Object.keys(genreNames).map((genreId) => (
                    <option key={genreId} value={genreId}>
                      {genreNames[genreId]}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
        </form>
      </nav>
      <div>
        <h2>
          {selectedCategory === "series" ? "Séries" : "Filmes"} -{" "}
          {selectedGenreName}
        </h2>

        <Slider {...sliderSettings2}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div id="cxBanner">
                <Link to={`/${movie.id}`}>
                  <img
                    src={`${imagePath}${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
              <h2 id="titulo">{movie.title}</h2>
            </div>
          ))}
        </Slider>

        <h2>
          {selectedCategory === "series" ? "Séries" : "Filmes"} -{" "}
          {selectedGenreName}
        </h2>

        {movieChunks.map((chunk, index) => (
          <div key={index}>
            <h3>Slider {index + 1}</h3>
            <Slider {...sliderSettings}>
              {chunk.map((movie) => (
                <Movie key={movie.id}>
                  <img
                    src={`${imagePath}${movie.poster_path}`}
                    alt={movie.title}
                    id="imgPost"
                  />
                  <span>{movie.title}</span>
                  <Link to={`/${movie.id}`}>
                    <Btn>Ver mais</Btn>
                  </Link>
                </Movie>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Home;