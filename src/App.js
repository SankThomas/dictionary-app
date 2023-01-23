import React, { useState } from "react";

export default function App() {
  // Initialize state value. One to hold the text you search
  // And add the functionality to clear input when you submit the form
  // And the other to hold the data when you run the GET request
  const [word, setWord] = useState("");
  const [words, setWords] = useState();

  // Create the function to submit the form
  // Also add the function to fetch the data inside the form submission
  // So that the GET request is not run on every keystroke, but on form submission only
  const handleSubmit = (e) => {
    e.preventDefault();

    const getWordDefinition = async () => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setWords(data[0]);
      console.log(data[0]);

      setWord("");
    };

    getWordDefinition();
  };

  return (
    <>
      <br />
      <h1>Dictionary</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Get definition of a word"
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Look Up Definition</button>
      </form>
      <br />

      {/* If there is nothing in the input, then render an empty paragraph.
Otherwise, render the definition of the word */}
      {!words ? (
        <p></p>
      ) : (
        <>
          <br />
          <br />
          <p className="definition">
            {words.word}{" "}
            <small style={{ display: "inline-block", marginLeft: 20 }}>
              {words.phonetic}
            </small>
          </p>

          <ul style={{ listStyleType: "none" }}>
            {words.phonetics.map((p, index) => (
              <li
                key={index}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {p.text}
                <audio controls>
                  <source src={p.audio} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 10 }}>
            {/* Map over the meanings of the word and render every single meaning */}
            {words.meanings.map((meaning, index) => (
              <article key={index} style={{ marginTop: 30 }}>
                <small style={{ color: "#555", fontSize: "16px" }}>
                  {meaning.partOfSpeech}
                </small>

                <ol>
                  {meaning.definitions.map((def, index) => (
                    <li
                      key={index}
                      style={{
                        color: "#555",
                        fontSize: "1.25rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {def.definition}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
