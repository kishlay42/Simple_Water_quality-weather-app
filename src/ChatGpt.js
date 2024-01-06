import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import videoBackground from './assets/common_background.mp4';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleGetAnswer = () => {
    setLoading(true);

    axios
      .post('http://127.0.0.1:5000/predict', { question })
      .then((response) => {
        setAnswer(response.data.answer);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error getting answer:', error);
        setAnswer('An error occurred.');
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(false); // Ensure loading is set to false initially
  }, []);

  return (
    <>
    <video
    autoPlay
    loop
    muted
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.6,
      objectFit: 'cover',
      zIndex: -1, // Set a negative z-index to ensure the video is in the background
    }}
  >
    <source src={videoBackground} type="video/mp4" />
  </video>
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
      <div className="App">
        <div>
          <input
            type="text"
            value={question}
            placeholder="Ask question..."
            onChange={handleQuestionChange}
            style={{ width: '90%', height: '35px' }}
          />
          <IconButton
            style={{
              width: '5%',
              height: '35px',
              color: 'white',
              margin: '5px',
            }}
            onClick={handleGetAnswer}
          >
            <SendIcon />
          </IconButton>
        </div>
        <div className="answer" style={{ color: 'white' }}>
          {loading && <p><strong>Typing...</strong></p>}
          {!loading && answer && <TypingText text={answer} />}
        </div>
      </div>
    </Container>
    </>
  );
}

function TypingText({ text }) {
  const [visibleText, setVisibleText] = useState('');
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [dotVisible, setDotVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const length = visibleText.length;
      if (length < text.length) {
        setVisibleText(text.slice(0, length + 1));
      } else {
        setShowFullAnswer(true); // Set to true when typing is completed
        clearInterval(timer);
      }
    }, 100); // Adjust the typing speed as needed

    // Create a timer for the blinking dot
    const dotTimer = setInterval(() => {
      setDotVisible((prev) => !prev);
    }, 500); // Adjust the blinking speed as needed

    return () => {
      clearInterval(timer);
      clearInterval(dotTimer);
    };
  }, [text, visibleText]);

  return (
    <p>
      <strong>Answer:</strong> {showFullAnswer ? text : visibleText}
      {dotVisible && !showFullAnswer && <span>&nbsp;&middot;</span>}
    </p>
  );
}

export default App;
