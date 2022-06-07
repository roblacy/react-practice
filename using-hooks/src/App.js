import React from 'react';

import './App.css';
import useFetch from './useFetch';
import useFetchReducer from './useFetchReducer';

function App() {
  const [addText] = React.useState("Add Greeting");
  const [removeText] = React.useState("Remove Greeting");
  const [greetings, setGreetings] = React.useState([]);
  const [bCount1, setBCount1] = React.useState(0);
  const [bCount2, setBCount2] = React.useState(0);

  function addGreeting() {
    const newGreeting = {
      id: Math.random(),
      text: 'yo dude',
    };
    setGreetings(curGreetings => [...curGreetings, newGreeting]);
  }

  function removeGreeting() {
    if (greetings.length > 0) {
      greetings.length = greetings.length - 1;
      setGreetings([...greetings]);
    }
  }

  // only calls callback when bCount1 changes
  React.useEffect(() => {
    console.log(`clicked button1 ${bCount1} times`);
  }, [bCount1]);

  // only calls callback when bCount2 changes
  React.useEffect(() => {
    console.log(`clicked button2 ${bCount2} times`);
  }, [bCount2]);

  return (
    <div className="App">
      <br />
      <button onClick={addGreeting}>{addText}</button>
      <br /><br />
      <button onClick={removeGreeting}>{removeText}</button>
      <br /><br />
      {greetings.map(greeting => <Greeting key={greeting.id} />)}
      <br /><br />
      <DataSection />
      <br /><br />
      <button onClick={() => setBCount1(bCount1 + 1)}>Button 1</button>
      <br />
      <span>{bCount1}</span>
      <br /><br />
      <button onClick={() => setBCount2(bCount2 + 1)}>Button 2</button>
      <br />
      <span>{bCount2}</span>
      <br /><br />
      <DataSection2 />
      <br /><br />
    </div>
  );
}

function Greeting() {
  const [greeting, setGreeting] = React.useState('hello there');

  React.useEffect(() => {
    // would fetch data from API here and return in some kind of promise
    Promise.resolve('hey there how are you')
      .then(data => {
        console.log('just got data from API...');
        setGreeting(data);
      });
    // function returned from useEffect called when component unmounted
    return () => {
      console.log('data connection from useEffect being cleaned up');
    };

    // empty array tells useEffect that there are no dependencies and it doesn't have to rerender every update
  }, []);

  return (
    <div>{greeting}</div>
  );
}

function DataSection() {
  //  const [data, setData] = React.useState('[]');
  const someUrl = 'just faking this';
  const data = useFetch(someUrl);

  // useFetch(fetchedData => {
  //   setData(fetchedData);
  // });

  return (
    <div>
      <div>here is the data we fetched:</div>
      <div>{data}</div>
    </div>
  );
}

// uses reducer
function DataSection2() {
  const someUrl = 'just faking this';
  const result = useFetchReducer(someUrl);
  const data = result.loading === 'yes' ? 'loading' : result.data;

  return (
    <div>
      <div>here is the data:</div>
      <div>{data}</div>
    </div>
  );

}

export default App;
