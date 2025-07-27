import MovieDetail from './MovieDetail';

// Helper function to create a delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// export async function generateStaticParams() {
//   try {
//     const today = new Date();
//     const todayStr = today.toISOString().slice(0, 10);
    
//     const fifteenDaysAgoDate = new Date(today.setDate(today.getDate() - 15));
//     const fifteenDaysAgoStr = fifteenDaysAgoDate.toISOString().slice(0, 10);

//     const url = `https://api.themoviedb.org/3/discover/movie?api_key=328aa2fcc30517cb12a60920c82d1f97&region=IN&with_original_language=hi&language=en-US&primary_release_date.gte=${fifteenDaysAgoStr}&primary_release_date.lte=${todayStr}`;

//     console.log('DEBUG: Generated TMDb API URL:', url);

//     // --- ADD DELAY HERE ---
//     console.log('DEBUG: Waiting for 2 seconds before fetching...');
//     await delay(2000); // Delay for 2000 milliseconds (2 seconds)
//     // ----------------------

//     const response = await fetch(url);

//     if (response.ok) {
//       const data = await response.json();
//       console.log('DEBUG: Fetched movie data (results count):', data.results?.length);
      
//       if (data.results && data.results.length > 0) {
//           const movieIds = data.results.map((movie: any) => ({
//             id: movie.id.toString()
//           }));
//           console.log('DEBUG: Movie IDs from API:', movieIds.map(m => m.id).join(', '));
          
//           const fallbackIds = [
//             '1', '2', '3', '4', '5', '6',
//             '1505116', '1034541', '1029235', '1147710', '1096197', '1184918',
//             '1081213', '1073498', '1029281', '1147460', '1184641', '1147715',
//             '1083433', '1311649', '617126',
//             '1234821', '1241634', '1241635', '1241636', '1241637'
//           ];
          
//           const allParams = [...movieIds, ...fallbackIds.map(id => ({ id }))];
//           console.log('DEBUG: All params returned (count):', allParams.length);
//           return allParams;
//       } else {
//           console.warn('API returned OK status but no results found or results array is empty.');
//       }
//     } else {
//       console.error(`API response not OK: ${response.status} ${response.statusText}`);
//       const errorBody = await response.text();
//       console.error('API Response Body:', errorBody);
//     }
//   } catch (error) {
//     console.error('Error fetching movies for static params:', error);
//   }
  
//   console.warn('API fetch failed or returned no results. Returning only hardcoded fallback params.');
//   return [
//     { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' },
//     { id: '1234821' }, { id: '1241634' }, { id: '1505116' }, { id: '1034541' }, { id: '1029235' },
//     { id: '1147710' }, { id: '1096197' }, { id: '1184918' }, { id: '1081213' },
//     { id: '1073498' }, { id: '1029281' }, { id: '1147460' }, { id: '1184641' },
//     { id: '1147715' }, { id: '1241635' }, { id: '1241636' }, { id: '1241637' },
//     { id : '1083433'}, { id : '1311649'}, { id : '617126'}
//   ];
// }



export default async function MoviePage({ params }: { params: { id: string } }) {
   const { id } = await params;

  // Fetch the specific movie data for this ID
  // const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=328aa2fcc30517cb12a60920c82d1f97&language=en-US`;
  
  // try {
  //   const response = await fetch(movieDetailsUrl);
    
  //   if (!response.ok) {
  //     // Handle error, maybe show a 404 page or a message
  //     console.error(`Failed to fetch movie details for ID ${id}: ${response.status} ${response.statusText}`);
  //     return <div>Error loading movie details. Please try again.</div>;
  //   }

  //   const movieData = await response.json();

    // Pass the full movie data to MovieDetail
    return <MovieDetail movieId={id} />; // Assuming MovieDetail can now accept movieData directly
  }