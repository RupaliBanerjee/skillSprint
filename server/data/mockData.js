export const dataUser = [
  {
    email: "abc@gmail.com",
    password: "12345aaa",
    first_name: "abc",
    last_name: "xxx",
    contact_no: "2000434545",
    address_1: "129 hayes harlington",
    address_2: "47 elm park",
    role: "student",
    user_id: "2117280000",
  },
  {
    email: "lecturer1@gmail.com",
    password: "abcde123",
    first_name: "John",
    last_name: "Doe",
    contact_no: "1234567890",
    address_1: "456 Main Street",
    address_2: "Apt 789",
    role: "lecturer",
    user_id: "2117280001",
  },
  {
    email: "mentor1@gmail.com",
    password: "qwerty456",
    first_name: "Jane",
    last_name: "Smith",
    contact_no: "9876543210",
    address_1: "789 Elm Avenue",
    address_2: "Unit 123",
    role: "mentor",
    user_id: "2117280002",
  },
  {
    email: "student2@gmail.com",
    password: "password123",
    first_name: "Tom",
    last_name: "Johnson",
    contact_no: "5555555555",
    address_1: "123 Oak Street",
    address_2: "Apt 456",
    role: "student",
    user_id: "2117280003",
  },
  {
    email: "lecturer2@gmail.com",
    password: "abc123def",
    first_name: "Sarah",
    last_name: "Williams",
    contact_no: "987654321",
    address_1: "789 Pine Lane",
    address_2: "Unit 789",
    role: "lecturer",
    user_id: "2117280004",
  },
  {
    email: "mentor2@gmail.com",
    password: "mentor123",
    first_name: "Robert",
    last_name: "Davis",
    contact_no: "123456789",
    address_1: "456 Maple Avenue",
    address_2: "Apt 123",
    role: "mentor",
    user_id: "2117280005",
  },
  {
    email: "student3@gmail.com",
    password: "abcxyz789",
    first_name: "Emily",
    last_name: "Brown",
    contact_no: "9999999999",
    address_1: "321 Cedar Street",
    address_2: "Apt 789",
    role: "student",
    user_id: "2117280006",
  },
  {
    email: "lecturer3@gmail.com",
    password: "password456",
    first_name: "Michael",
    last_name: "Wilson",
    contact_no: "555555555",
    address_1: "987 Willow Avenue",
    address_2: "Unit 456",
    role: "lecturer",
    user_id: "2117280007",
  },
  {
    email: "mentor3@gmail.com",
    password: "mentor789",
    first_name: "Laura",
    last_name: "Anderson",
    contact_no: "1234567890",
    address_1: "654 Birch Lane",
    address_2: "Apt 789",
    role: "mentor",
    user_id: "2117280008",
  },
  {
    email: "student4@gmail.com",
    password: "abc123xyz",
    first_name: "David",
    last_name: "Taylor",
    contact_no: "9876543210",
    address_1: "321 Pine Street",
    address_2: "Apt 123",
    role: "student",
    user_id: "2117280009",
  },
];

export const student_taskMap = [
  {
    user_id: "2117280000",
    task_id: "HCI0001",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic_functionality",
        weightage: 8,
      },
      {
        name: "code_quality",
        weightage: 7,
      },
      {
        name: "documentation",
        weightage: 4,
      },
    ],
    solution_zip: "",
    totalScore: 24,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0002",
    score: [
      {
        name: "accuracy",
        weightage: 8,
      },
      {
        name: "basic_functionality",
        weightage: 8,
      },
      {
        name: "code_quality",
        weightage: 4,
      },
      {
        name: "documentation",
        weightage: 3,
      },
    ],
    solution_zip: "",
    totalScore: 23,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0003",
    score: [
      {
        name: "accuracy",
        weightage: 6,
      },
      {
        name: "basic_functionality",
        weightage: 10,
      },
      {
        name: "code_quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 3,
      },
    ],
    solution_zip: "",
    totalScore: 24,
  },
  {
    user_id: "2117280005",
    task_id: "HCI0016",
    score: [
      {
        name: "accuracy",
        weightage: 6,
      },
      {
        name: "basic_functionality",
        weightage: 10,
      },
      {
        name: "code_quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 3,
      },
    ],
    solution_zip: "",
    totalScore: 24,
  },
  {
    user_id: "2117280006",
    task_id: "HCI0017",

    score: [],
    solution_zip: "",
    totalScore: 0,
  },
  {
    user_id: "2117280007",
    task_id: "HCI0018",
    score: [],
    solution_zip: "",
    totalScore: 0,
  },
  {
    user_id: "2117280008",
    task_id: "HCI0019",
    score: [],
    solution_zip: "",
    totalScore: 0,
  },
  {
    user_id: "2117280009",
    task_id: "HCI0020",
    score: [
      {
        name: "accuracy",
        weightage: 6,
      },
      {
        name: "basic_functionality",
        weightage: 10,
      },
      {
        name: "code_quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 3,
      },
    ],
    solution_zip: "",
    totalScore: 24,
  },
];

export const taskDetails =[
  {
      
      "key" : "HCI0001",
      "publisher_id" : "2117280001",
      "assigner_id" : "",
      "title" : "Weather Report App",
      "summary" : "Develop a lightweight and intuitive weather application, named Vanilla Weather App, using vanilla JavaScript. The app should provide accurate and up-to-date weather information, including current conditions and detailed forecasts. Ensure the app is customizable, with a responsive design and user-friendly interface, offering a seamless and visually appealing experience for users to access weather data and plan their activities accordingly.",
      "comments" : {
          "publisher" : "In our case, we’re going to use OpenWeatherMap, one of the most popular free choices. OpenWeather describes itself as a group of IT experts and data scientists that does deep weather data science since 2014. For each point on Earth, OpenWeather provides reliable historical, current and forecasted weather data via light-speed APIs. /n Plugins:/n elements.envanto,weather app template ",
          "assigner" : "",
          "student" : ""
      },
      "start_date" :"2023/07/10",
      "end_date" : "2023/07/30",
      "task_type" : "ASSIGNMENT",
      "active" : false
     
  },
  { 
      "key" : "HCI0002",
      "publisher_id" : "2117280001",
      "assigner_id" : "",
      "title" : "Calendar App",
      "summary" : "Create a calendar application that allows users to manage their schedules, set reminders, and share events with others. The app should have an intuitive user interface and provide essential features such as creating, editing, and deleting events, as well as sending notifications for upcoming events. Ensure the calendar supports multiple views (day, week, month) and provides a seamless experience for users to organize their time effectively.",
      "comments" : {
          "publisher" : "For this task, you can utilize existing calendar libraries or build the calendar functionality from scratch. Make sure to consider the design and usability aspects to provide an excellent user experience. Feel free to explore different frameworks and technologies to implement the calendar app.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/08/01",
      "end_date" : "2023/08/21",
      "task_type" : "ASSIGNMENT",
      "active" : false
      
  },
  {
     
      "key" : "HCI0003",
      "publisher_id" : "2117280001",
      "assigner_id" : "",
      "title" : "E-commerce Website",
      "summary" : "Develop an e-commerce website for selling a variety of products. The website should provide features like product listing, searching, sorting, and filtering. Implement a shopping cart functionality to allow users to add products, proceed to checkout, and place orders. Ensure the website has an appealing design, is responsive, and provides a smooth shopping experience for users.",
      "comments" : {
          "publisher" : "Consider incorporating popular e-commerce platforms like Shopify or WooCommerce to streamline the development process. These platforms offer ready-to-use themes and plugins to enhance the functionality of your website. Remember to focus on user experience and make the website visually appealing.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/09/05",
      "end_date" : "2023/09/25",
      "task_type" : "ASSIGNMENT",
      "active" : false
      
  },
  {
    
      "key" : "HCI0016",
      "publisher_id" : "2117280004",
      "assigner_id" : "",
      "title" : "Fitness Tracking App",
      "summary" : "Design and develop a fitness tracking application that helps users monitor their exercise and wellness activities. The app should include features like tracking workouts, counting steps, recording heart rate, and providing personalized recommendations based on user goals. Ensure the app has an intuitive and visually appealing interface to motivate users in achieving their fitness targets.",
      "comments" : {
          "publisher" : "There are several fitness tracking APIs and libraries available that you can integrate into your application. Explore options like Google Fit, Apple HealthKit, or Fitbit API to access fitness-related data and provide accurate tracking features. Focus on creating an engaging user experience to keep users motivated and engaged with the app.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/10/10",
      "end_date" : "2023/10/30",
      "task_type" : "PROJECT",
      "active" : false
      
  },
  {
     
      "key" : "HCI0017",
      "publisher_id" : "2117280004",
      "assigner_id" : "",
      "title" : "Social Media App",
      "summary" : "Create a social media application that allows users to connect, share content, and interact with each other. The app should include features like creating user profiles, posting updates, following other users, commenting on posts, and direct messaging. Implement a responsive design and ensure the app provides a seamless experience for users to connect and engage with the community.",
      "comments" : {
          "publisher" : "Consider popular social media platforms like Facebook, Twitter, or Instagram as inspiration for designing and implementing your social media app. Pay attention to user privacy and security while implementing features like user authentication and data protection. Create an engaging and user-friendly interface to attract and retain users.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/11/15",
      "end_date" : "2023/12/05",
      "task_type" : "PROJECT",
      "active" : true
     
  },
  {
      
      "key" : "HCI0018",
      "publisher_id" : "2117280004",
      "assigner_id" : "",
      "title" : "Movie Recommendation System",
      "summary" : "Build a movie recommendation system that suggests movies to users based on their preferences and viewing history. The system should analyze user data, such as movie ratings, genres, and watch history, to generate personalized movie recommendations. Implement a user-friendly interface to display movie recommendations and allow users to explore and discover new movies.",
      "comments" : {
          "publisher" : "Consider utilizing machine learning algorithms like collaborative filtering or content-based filtering to create an effective movie recommendation system. Use movie datasets and libraries like IMDb or MovieLens to gather movie information and ratings. Focus on providing accurate recommendations and enhancing the user experience.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/12/20",
      "end_date" : "2024/01/09",
      "task_type" : "PROJECT",
      "active" : true
     
  },
  {
      
      "key" : "HCI0019",
      "publisher_id" : "2117280007",
      "assigner_id" : "",
      "title" : "Recipe App",
      "summary" : "Develop a recipe application that allows users to search, save, and explore various recipes. The app should include features like recipe search by ingredients, favorite recipes, and step-by-step instructions with images. Implement a visually appealing design and ensure the app provides a smooth and enjoyable experience for users to discover and try new recipes.",
      "comments" : {
          "publisher" : "You can utilize recipe APIs like Spoonacular or Edamam to fetch recipes and related information. Consider implementing features like meal planning, shopping list generation, or dietary restrictions to enhance the functionality of the recipe app. Pay attention to the presentation of recipes, including high-quality images and clear instructions.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/07/25",
      "end_date" : "2023/08/14",
      "task_type" : "ASSIGNMENT",
      "active" : true
      
  },
  {
     
      "key" : "HCI0020",
      "publisher_id" : "2117280007",
      "assigner_id" : "",
      "title" : "Travel Planning App",
      "summary" : "Design and develop a travel planning application that helps users organize and plan their trips. The app should provide features like searching for destinations, creating itineraries, booking flights and accommodations, and providing travel recommendations. Ensure the app has an intuitive interface and offers a seamless experience for users to plan and manage their travel effectively.",
      "comments" : {
          "publisher" : "Consider integrating travel APIs like Google Maps, TripAdvisor, or Skyscanner to fetch travel-related information and provide accurate recommendations. Implement features like interactive maps, reviews, and suggestions for local attractions to enhance the travel planning experience. Focus on creating a visually appealing and user-friendly interface.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2024/03/01",
      "end_date" : "2024/03/21",
      "task_type" : "PROJECT",
      "active" : true
  },
  {
     
      "key" : "HCI0009",
      "publisher_id" : "2117280007",
      "assigner_id" : "",
      "title" : "Language Learning App",
      "summary" : "Create a language learning application that helps users learn new languages through interactive lessons and exercises. The app should provide features like vocabulary building, grammar lessons, speaking practice, and progress tracking. Implement a visually appealing design and ensure the app offers a personalized learning experience for users.",
      "comments" : {
          "publisher" : "Consider incorporating language learning APIs like Duolingo or Babbel to access language courses and learning materials. Implement features like quizzes, flashcards, and audio exercises to make language learning engaging and effective. Focus on creating a user-friendly interface and providing feedback to users to improve their language skills.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2024/04/05",
      "end_date" : "2024/04/25",
      "task_type" : "ASSIGNMENT",
      "active" : false
  },
  {
      
      "key" : "HCI0010",
      "publisher_id" : "2117280004",
      "assigner_id" : "",
      "title" : "Online Marketplace",
      "summary" : "Develop an online marketplace platform that allows users to buy and sell various products and services. The platform should include features like product listings, search and filter options, user ratings and reviews, secure payment processing, and order management. Implement a responsive design and ensure the platform provides a safe and seamless experience for buyers and sellers.",
      "comments" : {
          "publisher" : "Consider popular online marketplaces like Amazon, eBay, or Etsy as inspiration for designing and implementing your online marketplace. Implement features like seller verification, buyer protection, and messaging systems to facilitate smooth transactions. Focus on creating a visually appealing and user-friendly interface to attract and retain users.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2024/05/10",
      "end_date" : "2024/05/30",
      "task_type" : "PROJECT",
      "active" : false
  },
  {
     
      "key" : "HCI0024",
      "publisher_id" : "2117280012",
      "assigner_id" : "",
      "title" : "News Aggregator App",
      "summary" : "Create a news aggregator application that collects and displays news articles from various sources. The app should include features like personalized news recommendations, topic-based filtering, bookmarking, and offline reading. Implement an appealing and user-friendly interface to keep users informed and engaged.",
      "comments" : {
          "publisher" : "Consider integrating news APIs like NewsAPI, RSS feeds, or social media APIs to fetch news articles and related information. Focus on providing reliable news sources, improving news personalization, and incorporating features like article sharing or comments.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/09/15",
      "end_date" : "2023/10/05",
      "task_type" : "ASSIGNMENT",
      "active" : true
  },
  {
     
      "key" : "HCI0025",
      "publisher_id" : "2117280015",
      "assigner_id" : "",
      "title" : "Food Delivery App",
      "summary" : "Develop a food delivery application that allows users to order food from nearby restaurants. The app should include features like restaurant listings, menu browsing, online ordering, order tracking, and payment integration. Implement an intuitive and visually appealing interface to provide a seamless food ordering experience.",
      "comments" : {
          "publisher" : "Consider integrating popular food delivery APIs like Uber Eats, DoorDash, or Grubhub to access restaurant listings and streamline the ordering process. Focus on optimizing the app for fast and secure food deliveries and incorporating user reviews and ratings for restaurants.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" :"2023/09/10",
      "end_date" : "2023/09/30",
      "task_type" : "ASSIGNMENT",
      "active" : true
  },
  {
     
      "key" : "HCI0026",
      "publisher_id" : "2117280015",
      "assigner_id" : "",
      "title" : "Job Search Platform",
      "summary" : "Build a job search platform that helps users find employment opportunities. The platform should include features like job listings, resume uploading, application tracking, and personalized job recommendations. Implement a user-friendly interface and provide effective tools for job seekers and employers.",
      "comments" : {
          "publisher" : "Consider integrating job search APIs like Indeed, LinkedIn, or Glassdoor to access job listings and related information. Focus on creating advanced search filters, incorporating user profiles, and providing resources for resume building and interview preparation.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/11/01",
      "end_date" : "2023/11/21",
      "task_type" : "PROJECT",
      "active" : true
  },
  {
      "key" : "HCI0027",
      "publisher_id" : "2117280015",
      "assigner_id" : "",
      "title" : "Online Banking App",
      "summary" : "Design and develop an online banking application that allows users to manage their finances and perform banking transactions. The app should include features like account balance checking, fund transfers, bill payments, and transaction history. Implement a secure and intuitive interface to ensure a smooth banking experience for users.",
      "comments" : {
          "publisher" : "Consider incorporating banking APIs or partnering with financial institutions to access banking services and ensure secure transactions. Focus on implementing multi-factor authentication, transaction encryption, and real-time balance updates.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/10/25",
      "end_date" : "2023/11/01",
      "task_type" : "PROJECT",
      "active" : true
  },
  {
      
      "key" : "HCI0029",
      "publisher_id" : "2117280018",
      "assigner_id" : "",
      "title" : "Music Streaming App",
      "summary" : "Develop a music streaming application that allows users to listen to and discover music from various genres and artists. The app should include features like playlist creation, personalized recommendations, offline playback, and social sharing. Implement an immersive and user-friendly interface to enhance the music listening experience.",
      "comments" : {
          "publisher" : "Consider integrating music streaming APIs like Spotify, Apple Music, or SoundCloud to access music catalogs and playback functionalities. Focus on creating seamless transitions between songs, incorporating artist information, and implementing social features like following and sharing playlists.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/09/25",
      "end_date" : "2023/10/31",
      "task_type" : "ASSIGNMENT",
      "active" : true
  },
  {
     
      "key" : "HCI0031",
      "publisher_id" : "2117280018",
      "assigner_id" : "",
      "title" : "Recipe Sharing Platform",
      "summary" : "Create a recipe sharing platform that allows users to share and discover recipes. The platform should include features like recipe uploads, search and filter options, user ratings and reviews, and social interactions. Implement a visually appealing design and provide a seamless experience for recipe enthusiasts.",
      "comments" : {
          "publisher" : "Consider popular recipe sharing platforms like Allrecipes, Food Network, or Tasty as inspiration for designing and implementing your platform. Implement features like recipe categorization, ingredient substitution suggestions, and social sharing options.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/08/05",
      "end_date" : "2023/08/24",
      "task_type" : "ASSIGNMENT",
      "active" : true
  },
  {
      
      "key" : "HCI0032",
      "publisher_id" : "2117280018",
      "assigner_id" : "",
      "title" : "Task Management App",
      "summary" : "Design and develop a task management application that helps users organize their tasks and track progress. The app should include features like task creation, assignment, due dates, reminders, and progress tracking. Implement an intuitive and visually appealing interface to enhance productivity and task management.",
      "comments" : {
          "publisher" : "Consider integrating task management libraries or frameworks like Trello, Asana, or Jira to access task management functionalities and best practices. Focus on creating user-friendly task organization, providing collaboration options, and implementing task prioritization.",
          "assigner" : "",
          "student" : ""
      },
      "start_date" : "2023/08/08",
      "end_date" : "2023/08/30",
      "task_type" : "ASSIGNMENT",
      "active" : true
  },
  {
      "key": "HCI0037",
      "title": "Fitness Challenge App",
      "summary":
        "Create a fitness challenge application that allows users to participate in various fitness challenges and track their progress. The app should include features like challenge selection, workout tracking, leaderboards, and achievement badges. Implement a visually appealing design and provide motivational features to encourage users to stay active and achieve their fitness goals.",
      "comments": {
        "publisher":
          "Consider integrating fitness tracking APIs like Fitbit, Google Fit, or Apple HealthKit to access fitness data and provide accurate tracking features. Implement features like personalized workout plans, progress visualizations, and social sharing to enhance the user experience and foster a sense of community.",
        "assigner": "",
        "student": ""
      },
      "publisher_id": "2117280024",
      "assigner_id": "",
      "start_date": "2023/09/15",
      "end_date": "2023/10/05",
      "pdf_file": {},
      "task_type": "ASSIGNMENT",
      "active": true
    }
  ]
  
