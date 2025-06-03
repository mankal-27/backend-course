const axios = require('axios');

console.log("App is running...");

async function fetchPosts(){
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('Fetched Posts:', response.data);
    const title = response.data.title;
    
    for (const post of response.data) {
      console.log('Post Title:', post.title);
      console.log('Post ID:', post.id);
    }
  }catch (error){
    console.error('Error fetching posts', error.message);
  }
}

fetchPosts();

setTimeout(() => {
  console.log('App exiting after 5 seconds');
  process.exit(0);
}, 5000)