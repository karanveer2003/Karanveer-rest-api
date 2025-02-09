const apiKey = 'jaLoUOnpodHQlH3bysKEGvOBs9XFl5f6ffHyUzf0'; // Replace with your actual API key
    const baseUrl = 'https://api.nasa.gov/planetary/apod';

    // Function to fetch the Astronomy Picture of the Day (APOD)
    async function fetchAPOD() {
      const dateInput = document.getElementById('date').value;
      const date = dateInput ? dateInput : '';  // If no date is selected, it fetches today's APOD
      const url = `${baseUrl}?api_key=${apiKey}&date=${date}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Update the page with the fetched data
        document.getElementById('apod-title').innerText = data.title;
        document.getElementById('apod-description').innerText = data.explanation;

        // Clear previous content
        document.getElementById('apod-image').style.display = 'none';
        document.getElementById('apod-video').style.display = 'none';

        // Check if media is an image or a video
        if (data.media_type === 'image') {
          document.getElementById('apod-image').src = data.hdurl || data.url;
          document.getElementById('apod-image').style.display = 'block';
        } else if (data.media_type === 'video') {
          const videoSource = document.getElementById('video-source');
          videoSource.src = data.url;
          document.getElementById('apod-video').style.display = 'block';
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }