import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [buttText, setButtText] = useState("Get Joke");
  const [showButton, setShowButton] = useState(true);
  const [goodJokesCount, setGoodJokesCount] = useState(0);
  const [badJokesCount, setBadJokesCount] = useState(0);

  const handlePress = () => {
    setLoading(true); 
    setError(null);
    setButtText("I'm trying, I'm trying...")

    const apiUrl = "https://official-joke-api.appspot.com/random_joke";

    axios.get(apiUrl)
    .then((response) => {
      setJoke(response.data); // Populate
      setButtText("No, that just bad...");
    })
    .catch((err) => {
      setError("Failed to fetch joke."); // Set error on f up
      setButtonText("Whoopsie... Try again?");
    })
    .finally(() => {
      setLoading(false); // Not loading
      setShowButton(false);
    });

  };

  const handleBadJoke = () => {
    setBadJokesCount(badJokesCount + 1); // Increment bad jokes count
    setShowButton(true); // Show the button again for fetching another joke
    setJoke(null); // Clear the previous joke
    setButtText("Get Joke"); // Reset button text
  };

  const handleGoodJoke = () => {
    setGoodJokesCount(goodJokesCount + 1); // Increment good jokes count
    setShowButton(true); // Show the button again for fetching another joke
    setJoke(null); // Clear the previous joke
    setButtText("Get Joke"); // Reset button text
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Press the button to see a joke!</Text>

        {showButton && (<Button title={buttText} onPress={handlePress} />)}

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {error && <Text style={styles.error}>{error}</Text>}

        {joke && (
          <View style={styles.jokeContainer}>
            <Text style={styles.setup}>{joke.setup}</Text>
            <Text style={styles.punchline}>{joke.punchline}</Text>
            <View style={styles.ratingContainer}>
              <Button title="Good Joke" onPress={handleGoodJoke} />
              <Button title="Bad Joke" onPress={handleBadJoke} />
            </View>
          </View>
        )}
      
        <View style={styles.countContainer}>
          <Text style={styles.countText}>Good Jokes: {goodJokesCount}</Text>
          <Text style={styles.countText}>Bad Jokes: {badJokesCount}</Text>
        </View>

        {!showButton && (
          <Button title="Fetch Another Joke" onPress={handlePress} />
        )}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  jokeContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  setup: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  punchline: {
    fontSize: 16,
    color: '#155724',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  countContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  countText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
