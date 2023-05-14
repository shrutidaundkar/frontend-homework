import { useEffect, useState } from "react";
import axios from "axios";

const url = "https://thronesapi.com/api/v2/Characters";
function Search() {
  const [charList, setCharList] = useState([]);
  const [searchedChar, setSearchedChar] = useState("");

  useEffect(() => {
    axios.get(url).then((res) => setCharList(res.data));
  }, []);

  return (
    <div class="container">
      <h2>
        <label for="searchInput">
          Search for Your Favorite "Game of Thrones" Character:
        </label>
      </h2>
      <input
        type="text"
        id="searchInput"
        className="searchInput"
        placeholder="Search Character here.."
        onChange={(e) => setSearchedChar(e.target.value)}
      />

      <section id="container-characters" class="mx-auto">
        {charList
          .filter((item) => {
            if (searchedChar === "") {
              return item;
            } else if (
              item.fullName.toUpperCase().includes(searchedChar.toUpperCase())
            ) {
              return item;
            }
          })
          .map((item) => {
            let altText = `${item.fullName} of ${item.family}`;
            return (
              <div class="card">
                <div className="card-body">
                  <img src={item.imageUrl} alt={altText} class="card-img" />
                  <span className="card-title">{item.fullName}</span>
                  <p className="card-text">{item.family}</p>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Search;

// reference for axios https://youtu.be/-Q4PltNC_Jo
