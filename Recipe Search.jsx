
// let's define our apps root component
const CoffeeApp = (props) => { 
    
    // pull out the useEffect and useEffect hook functions using destructuring
    const { useState, useEffect } = React;

    // create a state variable to hold our API results, we can use setData so react re-renders when it changes!
    const [data, setData] = useState('');
    const [search, setSearch] = useState('coffee');
    
    function fetchResults( search )
    {
            // create a configuration for our axios call
            // method: GET, this is a standard request
            // url of the tasty API
            // paramaters of our search query
            // and our API key
            const options = {
                method: 'GET',
                url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
                params: {prefix: search},
                headers: {
                'X-RapidAPI-Key': '43f69766b8mshce25bd26ef3ccc3p171d7ejsn467ab21b663e',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
            };
            
            // make the axios call
            axios.request(options).then(function (response) {
                
                // if the call works, use the set data defined on line 9 to set the data and react will re-render based on that
                setData(response.data);
            }).catch(function (error) {

                // I hope theres no error, but if there is, we will show a popup box
                alert("ERROR!")
            });
    }

    // if the API data is blank (which it will be at the start), just show 'loading...' if not, let's just turn the data into a string for now and print it
    return ( 
        <div> 
          <h1>Delicious Coffee Recipes</h1>
          <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={()=>fetchResults(search)}>search</button>
          <h2>Results has {data?.results?.length} entries:</h2>
          <ul>
            { data?.results?.map( r => <li>{r.display}</li>) }
          </ul>
            
            <div>{data ? JSON.stringify(data) : "loading..."}</div>
        </div> 
    ) 
} 

// Let's launch react with the app we just defined and get it started!
ReactDOM.render( <CoffeeApp />, document.getElementById('root') );
