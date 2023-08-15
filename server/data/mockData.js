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
        weightage: 10,
      },
      {
        name: "basic functionality",
        weightage: 7,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 3,
      },
    ],
    solution_zip: "",
    totalScore: 25,
  },
  {
    user_id: "2117280009",
    task_id: "HCI0002",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage: 0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 0,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0003",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 5,
      },
      {
        name: "code quality",
        weightage: 4,
      },
      {
        name: "documentation",
        weightage: 2,
      },
    ],
    solution_zip: "",
    totalScore: 16,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0004",
    score: [
      {
        name: "accuracy",
        weightage: 8,
      },
      {
        name: "basic functionality",
        weightage: 10,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "",
    totalScore: 28,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0005",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage: 0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 0,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0016",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage: 0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0016_01"]
  },
  {
    user_id: "2117280000",
    task_id: "HCI0017",

    score: [
      {
        name: "accuracy",
        weightage: 6,
      },
      {
        name: "basic functionality",
        weightage: 10,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 3,
      },
    ],
    solution_zip: "",
    totalScore: 22,
  },
  {
    user_id: "2117280000",
    task_id: "HCI0018",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage: 0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0018_01"]
  },
  {
    user_id: "2117280008",
    task_id: "HCI0019",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage: 0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
  },
  {
    user_id: "2117280009",
    task_id: "HCI0020",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 10,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 25,
    subtask_id:["HCI0020_01"]
  },
  {
    user_id: "2117280008",
    task_id: "HCI0021",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 6,
      },
      {
        name: "code quality",
        weightage: 4,
      },
      {
        name: "documentation",
        weightage: 2,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 17,
    subtask_id:["HCI0021_01","HCI0021_03"]
  },
  {
    user_id: "2117280009",
    task_id: "HCI0032",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 10,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 25,
    subtask_id:["HCI0032_01","HCI0032_03"]
  },
  {
    user_id: "2117280010",
    task_id: "HCI0020",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 10,
      },
      {
        name: "code quality",
        weightage: 10,
      },
      {
        name: "documentation",
        weightage: 4,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 29,
    subtask_id:["HCI0020_02"]
  },
  {
    user_id: "2117280011",
    task_id: "HCI0020",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 5,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 20,
    subtask_id:["HCI0020_03"]
  },
  {
    user_id: "2117280011",
    task_id: "HCI0032",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 5,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 20,
    subtask_id:["HCI0032_02"]
  },
  {
    user_id: "2117280011",
    task_id: "HCI0021",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 5,
      },
      {
        name: "code quality",
        weightage: 5,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 20,
    subtask_id:["HCI0021_02"]
  },
  {
    user_id: "2117280009",
    task_id: "HCI0022",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
  },
  {
    user_id: "2117280011",
    task_id: "HCI0023",
    score: [
      {
        name: "accuracy",
        weightage: 7,
      },
      {
        name: "basic functionality",
        weightage: 9,
      },
      {
        name: "code quality",
        weightage:4,
      },
      {
        name: "documentation",
        weightage: 2,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 22,
    subtask_id:["HCI0023_02","HCI0023_03"]
  },
  {
    user_id: "2117280009",
    task_id: "HCI0023",
    score: [
      {
        name: "accuracy",
        weightage: 5,
      },
      {
        name: "basic functionality",
        weightage: 10,
      },
      {
        name: "code quality",
        weightage:6,
      },
      {
        name: "documentation",
        weightage: 5,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 26,
    subtask_id:["HCI0023_01"]
  },
  {
    user_id: "2117280009",
    task_id: "HCI0027",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "https://dl.dropboxusercontent.com/s/xfl5mrmhi0zuo9q/getGroundAssignment.zip",
    totalScore: 0,
    subtask_id:["HCI0027_01","HCI0027_02","HCI0027_03"]
  },
  {
    user_id: "2117280009",
    task_id: "HCI0035",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0035_02","HCI0035_03"]
  },
  {
    user_id: "2117280011",
    task_id: "HCI0035",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0035_01"]
  },
  {
    user_id: "2117280000",
    task_id: "HCI0036",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0036_01","HCI0036_03"]
  },
  {
    user_id: "2117280011",
    task_id: "HCI0036",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0036_02"],
  },
  {
    user_id: "2117280000",
    task_id: "HCI0033",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    
  },
  {
    user_id: "2117280009",
    task_id: "HCI0014",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0014_02"],
  },
  {
    user_id: "2117280011",
    task_id: "HCI0014",
    score: [
      {
        name: "accuracy",
        weightage: 0,
      },
      {
        name: "basic functionality",
        weightage: 0,
      },
      {
        name: "code quality",
        weightage:0,
      },
      {
        name: "documentation",
        weightage: 0,
      },
    ],
    solution_zip: "",
    totalScore: 0,
    subtask_id:["HCI0014_01","HCI0014_03"],
  },
];

export const taskDetails = [
  {
    key: "HCI0001",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Weather Report App",
    summary:"Develop a lightweight and intuitive weather application, named Vanilla Weather App, using vanilla JavaScript. The app should provide accurate and up-to-date weather information, including current conditions and detailed forecasts. Ensure the app is customizable, with a responsive design and user-friendly interface, offering a seamless and visually appealing experience for users to access weather data and plan their activities accordingly.",
    comments: {
      publisher:"In our case, we are going to use OpenWeatherMap, one of the most popular free choices. OpenWeather describes itself as a group of IT experts and data scientists that does deep weather data science since 2014. For each point on Earth, OpenWeather provides reliable historical, current and forecasted weather data via light-speed APIs. /n Plugins:/n elements.envanto,weather app template ",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/10",
    end_date: "2023/07/03",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },
  {
    key: "HCI0002",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Calendar App",
    summary:"Create a calendar application that allows users to manage their schedules, set reminders, and share events with others. The app should have an intuitive user interface and provide essential features such as creating, editing, and deleting events, as well as sending notifications for upcoming events. Ensure the calendar supports multiple views (day, week, month) and provides a seamless experience for users to organize their time effectively.",
    comments: {
      publisher:"For this task, you can utilize existing calendar libraries or build the calendar functionality from scratch. Make sure to consider the design and usability aspects to provide an excellent user experience. Feel free to explore different frameworks and technologies to implement the calendar app.",
      assigner: "",
      student: "",
    },
    start_date: "2023/07/20",
    end_date: "2023/08/14",
    task_type: "ASSIGNMENT",
    active: false,
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },
  {
    key: "HCI0022",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "E-commerce Website",
    summary:"Develop an e-commerce website for selling a variety of products. The website should provide features like product listing, searching, sorting, and filtering. Implement a shopping cart functionality to allow users to add products, proceed to checkout, and place orders. Ensure the website has an appealing design, is responsive, and provides a smooth shopping experience for users.",
    comments: {
      publisher:"Consider incorporating popular e-commerce platforms like Shopify or WooCommerce to streamline the development process. These platforms offer ready-to-use themes and plugins to enhance the functionality of your website. Remember to focus on user experience and make the website visually appealing.",
      assigner: "",
      student: "",
    },
    start_date: "2023/09/05",
    end_date: "2023/09/25",
    task_type: "ASSIGNMENT",
    active: false,
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },
  {
    key: "HCI0035",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Fitness Tracking App",
    summary:"Design and develop a fitness tracking application that helps users monitor their exercise and wellness activities. The app should include features like tracking workouts, counting steps, recording heart rate, and providing personalized recommendations based on user goals. Ensure the app has an intuitive and visually appealing interface to motivate users in achieving their fitness targets.",
    comments: {
      publisher:"There are several fitness tracking APIs and libraries available that you can integrate into your application. Explore options like Google Fit, Apple HealthKit, or Fitbit API to access fitness-related data and provide accurate tracking features. Focus on creating an engaging user experience to keep users motivated and engaged with the app.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/14",
    end_date: "2023/09/20",
    task_type: "PROJECT",
    active: true,
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "User profile and goal setting",
        task_completed: false,
        task_detail: "Implement user goal setting functionality",
        task_repo: "",
        task_id: "HCI0035_01",
      },
      {
        task_label: "Step counting",
        task_completed: false,
        task_detail: "Design and develop step tracking screens",
        task_repo: "",
        task_id: "HCI0035_02",
      },
      {
        task_label: "Notifications and reminders",
        task_completed: false,
        task_detail:"Design and develop reminder settings and scheduling functionality",
        task_repo: "",
        task_id: "HCI0035_03",
      },
    ],
  },
  {
    key: "HCI0023",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Social Media App",
    summary:"Create a social media application that allows users to connect, share content, and interact with each other. The app should include features like creating user profiles, posting updates, following other users, commenting on posts, and direct messaging. Implement a responsive design and ensure the app provides a seamless experience for users to connect and engage with the community.",
    comments: {
      publisher:"Consider popular social media platforms like Facebook, Twitter, or Instagram as inspiration for designing and implementing your social media app. Pay attention to user privacy and security while implementing features like user authentication and data protection. Create an engaging and user-friendly interface to attract and retain users.",
      assigner: "",
      student: "",
    },
    start_date: "2023/07/15",
    end_date: "2023/08/01",
    task_type: "PROJECT",
    active: false,
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"],
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "User profile ",
        task_completed: false,
        task_detail: "Implement user personal details edit page",
        task_repo: "",
        task_id: "HCI0023_01",
      },
      {
        task_label: "Post Creation",
        task_completed: false,
        task_detail:
          "Enable users to publish post and add images and videos to it",
        task_repo: "",
        task_id: "HCI0023_02",
      },
      {
        task_label: "Notifications and reminders",
        task_completed: false,
        task_detail: "Implement real-time notifications for new messages",
        task_repo: "",
        task_id: "HCI0023_03",
      },
    ],
  },
  {
    key: "HCI0036",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Movie Recommendation System",
    summary:"Build a movie recommendation system that suggests movies to users based on their preferences and viewing history. The system should analyze user data, such as movie ratings, genres, and watch history, to generate personalized movie recommendations. Implement a user-friendly interface to display movie recommendations and allow users to explore and discover new movies.",
    comments: {
      publisher:"Consider utilizing machine learning algorithms like collaborative filtering or content-based filtering to create an effective movie recommendation system. Use movie datasets and libraries like IMDb or MovieLens to gather movie information and ratings. Focus on providing accurate recommendations and enhancing the user experience.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/15",
    end_date: "2023/10/01",
    task_type: "PROJECT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"],
    subTaskInfo: [
      {
        task_label: "Movie Listing Page ",
        task_completed: false,
        task_detail:"Create a page that lists movies with relevant details, such as title, genre, and release year.",
        task_repo: "",
        task_id: "HCI0036_01",
      },
      {
        task_label: "User Preferences Page",
        task_completed: false,
        task_detail:"Design and develop a page where users can set their movie preferences, such as preferred genres or actors",
        task_repo: "",
        task_id: "HCI0036_02",
      },
      {
        task_label: "User Feedback Collection",
        task_completed: false,
        task_detail:"Create a feedback mechanism for users to provide ratings or feedback on recommended movies",
        task_repo: "",
        task_id: "HCI0036_03",
      },
    ],
  },
  {
    key: "HCI0033",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Recipe App",
    summary:"Develop a recipe application that allows users to search, save, and explore various recipes. The app should include features like recipe search by ingredients, favorite recipes, and step-by-step instructions with images. Implement a visually appealing design and ensure the app provides a smooth and enjoyable experience for users to discover and try new recipes.",
    comments: {
    publisher:"You can utilize recipe APIs like Spoonacular or Edamam to fetch recipes and related information. Consider implementing features like meal planning, shopping list generation, or dietary restrictions to enhance the functionality of the recipe app. Pay attention to the presentation of recipes, including high-quality images and clear instructions.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/05",
    end_date: "2023/09/01",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },
  {
    key: "HCI0020",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Travel Planning App",
    summary:"Design and develop a travel planning application that helps users organize and plan their trips. The app should provide features like searching for destinations, creating itineraries, booking flights and accommodations, and providing travel recommendations. Ensure the app has an intuitive interface and offers a seamless experience for users to plan and manage their travel effectively.",
    comments: {
      publisher:"Consider integrating travel APIs like Google Maps, TripAdvisor, or Skyscanner to fetch travel-related information and provide accurate recommendations. Implement features like interactive maps, reviews, and suggestions for local attractions to enhance the travel planning experience. Focus on creating a visually appealing and user-friendly interface.",
      assigner: "",
      student: "",
    },
    start_date: "2023/05/01",
    end_date: "2023/06/21",
    task_type: "PROJECT",
    active: false,
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "Destination Search and Suggestions",
        task_completed: false,
        task_detail:"Implement a search feature that allows users to search for destinations ",
        task_repo: "",
        task_id: "HCI0020_01",
      },
      {
        task_label: "Interactive Map",
        task_completed: false,
        task_detail:"Integrate a map component that visualizes the trip itinerary, allowing users to view and interact with destinations",
        task_repo: "",
        task_id: "HCI0020_02",
      },
      {
        task_label: "Budget and Expense Tracking",
        task_completed: false,
        task_detail:"Implement functionality for users to set budgets and track expenses related to each trip",
        task_repo: "",
        task_id: "HCI0020_03",
      },
    ],
  },
  {
    key: "HCI0009",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Language Learning App",
    summary:"Create a language learning application that helps users learn new languages through interactive lessons and exercises. The app should provide features like vocabulary building, grammar lessons, speaking practice, and progress tracking. Implement a visually appealing design and ensure the app offers a personalized learning experience for users.",
    comments: {
      publisher:"Consider incorporating language learning APIs like Duolingo or Babbel to access language courses and learning materials. Implement features like quizzes, flashcards, and audio exercises to make language learning engaging and effective. Focus on creating a user-friendly interface and providing feedback to users to improve their language skills.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/25",
    end_date: "2023/09/15",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },
  {
    key: "HCI0010",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Online Marketplace",
    summary:"Develop an online marketplace platform that allows users to buy and sell various products and services. The platform should include features like product listings, search and filter options, user ratings and reviews, secure payment processing, and order management. Implement a responsive design and ensure the platform provides a safe and seamless experience for buyers and sellers.",
    comments: {
      publisher:"Consider popular online marketplaces like Amazon, eBay, or Etsy as inspiration for designing and implementing your online marketplace. Implement features like seller verification, buyer protection, and messaging systems to facilitate smooth transactions. Focus on creating a visually appealing and user-friendly interface to attract and retain users.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/30",
    end_date: "2023/09/30",
    task_type: "PROJECT",
    subTaskInfo: [
      {
        task_label: "Product listing and management",
        task_completed: false,
        task_detail:
          "Implement product creation, editing, and deletion functionality",
        task_repo: "",
        task_id: "HCI0010_01",
      },
      {
        task_label: "Order management",
        task_completed: false,
        task_detail: "Implement order history and status updates",
        task_repo: "",
        task_id: "HCI0010_02",
      },
      {
        task_label: "Shopping cart and checkout process",
        task_completed: false,
        task_detail: "Implement secure payment processing integration",
        task_repo: "",
        task_id: "HCI0010_03",
      },
    ],
    active: false,
    pdf_file:"",
  },
  {
    key: "HCI0024",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "News Aggregator App",
    summary:"Create a news aggregator application that collects and displays news articles from various sources. The app should include features like personalized news recommendations, topic-based filtering, bookmarking, and offline reading. Implement an appealing and user-friendly interface to keep users informed and engaged.",
    comments: {
      publisher:"Consider integrating news APIs like NewsAPI, RSS feeds, or social media APIs to fetch news articles and related information. Focus on providing reliable news sources, improving news personalization, and incorporating features like article sharing or comments.",
      assigner: "",
      student: "",
    },
    start_date: "2023/09/15",
    end_date: "2023/10/05",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },
  {
    key: "HCI0025",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Food Delivery App",
    summary:"Develop a food delivery application that allows users to order food from nearby restaurants. The app should include features like restaurant listings, menu browsing, online ordering, order tracking, and payment integration. Implement an intuitive and visually appealing interface to provide a seamless food ordering experience.",
    comments: {
      publisher:"Consider integrating popular food delivery APIs like Uber Eats, DoorDash, or Grubhub to access restaurant listings and streamline the ordering process. Focus on optimizing the app for fast and secure food deliveries and incorporating user reviews and ratings for restaurants.",
      assigner: "",
      student: "",
    },
    start_date: "2023/09/10",
    end_date: "2023/09/30",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },
  {
    key: "HCI0026",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Job Search Platform",
    summary:"Build a job search platform that helps users find employment opportunities. The platform should include features like job listings, resume uploading, application tracking, and personalized job recommendations. Implement a user-friendly interface and provide effective tools for job seekers and employers.",
    comments: {
      publisher:"Consider integrating job search APIs like Indeed, LinkedIn, or Glassdoor to access job listings and related information. Focus on creating advanced search filters, incorporating user profiles, and providing resources for resume building and interview preparation.",
      assigner: "",
      student: "",
    },
    start_date: "2023/09/01",
    end_date: "2023/10/21",
    task_type: "PROJECT",
    active: false,
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "Communication and messaging",
        task_completed: false,
        task_detail:"Implement messaging functionality for job seekers and employers",
        task_repo: "",
        task_id: "HCI0026_01",
      },
      {
        task_label: "User registration and authentication",
        task_completed: false,
        task_detail:"Implement secure authentication mechanisms (e.g., OAuth, JWT)",
        task_repo: "",
        task_id: "HCI0026_02",
      },
      {
        task_label: "Application tracking",
        task_completed: false,
        task_detail: "Implement job application submission functionality",
        task_repo: "",
        task_id: "HCI0026_03",
      },
    ],
  },
  {
    key: "HCI0027",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Online Banking App",
    summary:"Design and develop an online banking application that allows users to manage their finances and perform banking transactions. The app should include features like account balance checking, fund transfers, bill payments, and transaction history. Implement a secure and intuitive interface to ensure a smooth banking experience for users.",
    comments: {
      publisher:"Consider incorporating banking APIs or partnering with financial institutions to access banking services and ensure secure transactions. Focus on implementing multi-factor authentication, transaction encryption, and real-time balance updates.",
      assigner: "",
      student: "",
    },
    start_date: "2023/07/25",
    end_date: "2023/08/12",
    task_type: "PROJECT",
    active: false,
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: true,
        task_detail:"Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0027_01",
      },
      {
        task_label: "Secure Messaging",
        task_completed: true,
        task_detail:"Implement a secure messaging feature that enables users to communicate with the bank's customer support",
        task_repo: "",
        task_id: "HCI0027_02",
      },
      {
        task_label: "Account Alerts and Notifications",
        task_completed: true,
        task_detail: "Develop a system for sending real-time alerts and notifications to users",
        task_repo: "",
        task_id: "HCI0027_03",
      },
    ],
  },
  {
    key: "HCI0029",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Music Streaming App",
    summary:"Develop a music streaming application that allows users to listen to and discover music from various genres and artists. The app should include features like playlist creation, personalized recommendations, offline playback, and social sharing. Implement an immersive and user-friendly interface to enhance the music listening experience.",
    comments: {
      publisher:"Consider integrating music streaming APIs like Spotify, Apple Music, or SoundCloud to access music catalogs and playback functionalities. Focus on creating seamless transitions between songs, incorporating artist information, and implementing social features like following and sharing playlists.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/25",
    end_date: "2023/10/02",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },
  {
    key: "HCI0031",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Recipe Sharing Platform",
    summary:"Create a recipe sharing platform that allows users to share and discover recipes. The platform should include features like recipe uploads, search and filter options, user ratings and reviews, and social interactions. Implement a visually appealing design and provide a seamless experience for recipe enthusiasts.",
    comments: {
      publisher:"Consider popular recipe sharing platforms like Allrecipes, Food Network, or Tasty as inspiration for designing and implementing your platform. Implement features like recipe categorization, ingredient substitution suggestions, and social sharing options.",
      assigner: "",
      student: "",
    },
    start_date: "2023/09/05",
    end_date: "2023/10/24",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },
  {
    key: "HCI0032",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Task Management App",
    summary:"Design and develop a task management application that helps users organize their tasks and track progress. The app should include features like task creation, assignment, due dates, reminders, and progress tracking. Implement an intuitive and visually appealing interface to enhance productivity and task management.",
    comments: {
      publisher:"Consider integrating task management libraries or frameworks like Trello, Asana, or Jira to access task management functionalities and best practices. Focus on creating user-friendly task organization, providing collaboration options, and implementing task prioritization.",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/08",
    end_date: "2023/07/03",
    task_type: "PROJECT",
    active: false,
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: false,
        task_detail:"Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0032_01",
      },
      {
        task_label: "Task Prioritization",
        task_completed: false,
        task_detail:
          "Implement a feature that allows users to prioritize tasks",
        task_repo: "",
        task_id: "HCI0032_02",
      },
      {
        task_label: "Task Details and Editing",
        task_completed: false,
        task_detail: "Implement task edit and update functionality",
        task_repo: "",
        task_id: "HCI0032_03",
      },
    ],
  },
  {
    key: "HCI0037",
    title: "Fitness Challenge App",
    summary:"Create a fitness challenge application that allows users to participate in various fitness challenges and track their progress. The app should include features like challenge selection, workout tracking, leaderboards, and achievement badges. Implement a visually appealing design and provide motivational features to encourage users to stay active and achieve their fitness goals.",
    comments: {
      publisher:"Consider integrating fitness tracking APIs like Fitbit, Google Fit, or Apple HealthKit to access fitness data and provide accurate tracking features. Implement features like personalized workout plans, progress visualizations, and social sharing to enhance the user experience and foster a sense of community.",
      assigner: "",
      student: "",
    },
    publisher_id: "2117280001",
    assigner_id: "",
    start_date: "2023/06/15",
    end_date: "2023/07/05",
    pdf_file: "",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },

  {
    key: "HCI0021",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Expense Tracking App",
    summary:"Create an expense tracking application that allows users to easily track and manage their expenses. The app should provide features such as expense categorization, budget setting, and reporting. Design an intuitive user interface that enables users to add, edit, and delete expenses effortlessly.",
    comments: {
      publisher:"Consider using popular libraries such as React or Angular for building the frontend of the app. Use a database system like MySQL or MongoDB to store and retrieve expense data.",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/12",
    end_date: "2023/06/31",
    task_type: "PROJECT",
    active: false,
    pdf_file:"",
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: false,
        task_detail:"Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0021_01",
      },
      {
        task_label: "Expense Categories",
        task_completed: false,
        task_detail:"develop a feature that allows users to categorize their expenses",
        task_repo: "",
        task_id: "HCI0021_02",
      },
      {
        task_label: "Expense Charts and Visualizations",
        task_completed: false,
        task_detail: "Implement visual representations, such as charts or graphs, to display expense trends",
        task_repo: "",
        task_id: "HCI0021_03",
      },
    ],
  },

  {
    key: "HCI0003",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Restaurant Review App",
    summary:"Develop a restaurant review application where users can search for restaurants, view their menus, and leave reviews. Implement features such as restaurant rating, user authentication, and search functionality. Create an attractive and user-friendly interface for the app.",
    comments: {
      publisher:"You can integrate with popular services like Google Maps and Yelp to fetch restaurant data and reviews. Use a modern frontend framework like React or Vue.js for building the app.",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/12",
    end_date: "2023/07/01",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },

  {
    key: "HCI0004",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Language Exchange Platform",
    summary:"Design and develop a language exchange platform that connects users who want to practice different languages. Implement features such as user profiles, messaging, and language preferences. Create a user-friendly interface that encourages language learning and interaction.",
    comments: {
      publisher:"Consider using a framework like Django or Ruby on Rails for building the backend of the platform. Use modern frontend technologies like React or Angular for the user interface.",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/12",
    end_date: "2023/07/02",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },

  {
    key: "HCI0005",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Event Planning App",
    summary:"Create an event planning application that allows users to create and manage events. The app should include features such as event registration, ticketing, and event notifications. Design an intuitive and visually appealing interface for event organizers and attendees.",
    comments: {
      publisher:"Consider using a combination of frontend and backend technologies such as React, Node.js, and MongoDB to build the app. Integration with popular payment gateways like Stripe can be beneficial for ticketing functionality.",
      assigner: "",
      student: "",
    },
    start_date: "2023/07/12",
    end_date: "2023/08/10",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },

  {
    key: "HCI0006",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Home Automation System",
    summary:"Develop a home automation system that allows users to control various aspects of their home, such as lighting, temperature, and security, through a centralized interface. Implement features like scheduling, remote access, and integration with smart devices.",
    comments: {
      publisher:"Consider using IoT technologies and protocols such as MQTT or Zigbee for communication between the home automation system and smart devices. Use a responsive web application or a mobile app for the control interface.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/31",
    end_date: "2023/09/20",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0007",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Recipe Organizer App",
    summary:
      "Create a recipe organizer application that allows users to save, categorize, and share their favorite recipes. The app should provide features such as recipe search, ingredient management, and meal planning. Design a user-friendly interface that enhances the cooking and recipe discovery experience.",
    comments: {
      publisher:
        "Consider integrating with popular recipe APIs like Spoonacular or Edamam to fetch recipe data. Use a modern frontend framework like React or Vue.js for building the app.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/17",
    end_date: "2023/09/15",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0008",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Virtual Fitness Trainer",
    summary:
      "Develop a virtual fitness trainer application that provides personalized workout plans, exercise demonstrations, and progress tracking. Implement features such as user profiles, exercise recommendations, and workout history. Design an engaging and interactive user interface that motivates users to achieve their fitness goals.",
    comments: {
      publisher:
        "Consider using machine learning algorithms to personalize the workout plans based on user preferences and fitness level. Use a mobile app or a web-based platform for the virtual fitness trainer.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/24",
    end_date: "2023/09/15",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0034",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Task Management System",
    summary:
      "Design and develop a task management system that allows users to create, assign, and track tasks within a team or organization. The system should include features such as task assignment, progress tracking, and deadline management. Create an intuitive user interface that enhances productivity and collaboration.",
    comments: {
      publisher:
        "Consider using a combination of frontend and backend technologies like React, Node.js, and MongoDB for building the system. Integration with communication tools like Slack or Microsoft Teams can enhance collaboration.",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/12",
    end_date: "2023/07/07",
    task_type: "ASSIGNMENT",
    active: false,
    pdf_file:"",
  },

  {
    key: "HCI0028",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Virtual Classroom Platform",
    summary:
      "Create a virtual classroom platform that facilitates online learning and collaboration. The platform should include features such as live video conferencing, screen sharing, and chat functionality. Design an intuitive and interactive interface that promotes effective teaching and learning experiences.",
    comments: {
      publisher:
        "Consider using video streaming technologies like WebRTC for real-time video conferencing. Use a frontend framework like React or Angular for building the platform.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/22",
    end_date: "2023/09/30",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0011",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Travel Planner App",
    summary:
      "Develop a travel planner application that helps users plan their trips, including itinerary creation, flight and hotel booking, and attraction recommendations. Implement features such as trip sharing, budget tracking, and real-time weather updates. Design a visually appealing and user-friendly interface for seamless travel planning.",
    comments: {
      publisher:
        "Consider integrating with popular travel APIs like Google Maps and TripAdvisor for fetching location data and attractions. Use a modern frontend framework like React or Vue.js for building the app.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/22",
    end_date: "2023/09/26",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0012",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Online Tutoring Platform",
    summary:
      "Design and develop an online tutoring platform that connects students with tutors for personalized learning sessions. Implement features such as scheduling, video conferencing, and lesson materials sharing. Create an intuitive and user-friendly interface that facilitates effective online tutoring.",
    comments: {
      publisher:
        "Consider using video streaming technologies like WebRTC for real-time tutoring sessions. Use a combination of frontend and backend technologies such as React, Node.js, and MongoDB for building the platform.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/22",
    end_date: "2023/09/15",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0013",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Online Art Gallery",
    summary:
      "Create an online art gallery platform that showcases and sells artwork from various artists. Implement features such as artist profiles, artwork categorization, and online purchasing. Design an aesthetically pleasing and user-friendly interface that enhances the art browsing and buying experience.",
    comments: {
      publisher:
        "Consider implementing secure payment gateways like PayPal or Stripe for art purchases. Use a modern frontend framework like React or Vue.js for building the platform.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/22",
    end_date: "2023/09/21",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0014",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Virtual Reality Game",
    summary:
      "Develop a virtual reality game that offers an immersive and interactive gaming experience. Create engaging gameplay mechanics, captivating visuals, and challenging levels. Design the game to be compatible with popular virtual reality platforms such as Oculus Rift or HTC Vive.",
    comments: {
      publisher:
        "Consider using game development engines like Unity or Unreal Engine for building the game. Ensure the game mechanics and controls are optimized for virtual reality gameplay.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/12",
    end_date: "2023/09/24",
    task_type: "PROJECT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"],
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: false,
        task_detail:
          "Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0014_01",
      },
      {
        task_label: "Collision Detection",
        task_completed: false,
        task_detail:
          "Implement collision detection mechanisms to ensure accurate interaction between the player and the virtual objects",
        task_repo: "",
        task_id: "HCI0014_02",
      },
      {
        task_label: "Game Progression and Levels",
        task_completed: false,
        task_detail: "Implement the current progress page",
        task_repo: "",
        task_id: "HCI0014_03",
      },
    ],
  },

  {
    key: "HCI0015",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Online Music Lessons",
    summary:
      "Design and develop an online platform that offers music lessons for various instruments. Implement features such as video lessons, practice materials, and progress tracking. Create an intuitive and user-friendly interface that enhances the learning experience for aspiring musicians.",
    comments: {
      publisher:
        "Consider using video streaming technologies like WebRTC for real-time music lessons. Use a combination of frontend and backend technologies such as React, Node.js, and MongoDB for building the platform.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/31",
    end_date: "2023/09/30",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0016",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Virtual Fashion Store",
    summary:
      "Create a virtual fashion store where users can browse and purchase clothing items and accessories. Implement features such as product categorization, user reviews, and secure online transactions. Design an attractive and user-friendly interface that provides a seamless shopping experience.",
    comments: {
      publisher:
        "Consider integrating with popular payment gateways like PayPal or Stripe for secure transactions. Use a modern frontend framework like React or Vue.js for building the store interface.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/15",
    end_date: "2023/09/30",
    task_type: "PROJECT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"],
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: false,
        task_detail:
          "Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0016_01",
      },
      {
        task_label: "Product Categories and Filtering",
        task_completed: false,
        task_detail:
          "Implement product categorization and filtering",
        task_repo: "",
        task_id: "HCI0016_02",
      },
      {
        task_label: "Wishlist and Favorites",
        task_completed: false,
        task_detail: " Create functionality that allows users to save their favorite fashion items to a wishlist",
        task_repo: "",
        task_id: "HCI0016_03",
      },
    ],
  },

  {
    key: "HCI0017",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Online Bookstore",
    summary:
      "Develop an online bookstore platform that allows users to browse and purchase books. Implement features such as book categorization, user reviews, and personalized recommendations. Design an intuitive and visually appealing interface that enhances the book browsing and buying experience.",
    comments: {
      publisher:
        "Consider integrating with popular book APIs like Google Books or OpenLibrary for fetching book data. Use a modern frontend framework like React or Vue.js for building the platform.",
      assigner: "",
      student: "",
    },
    start_date: "2023/06/12",
    end_date: "2023/07/10",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0018",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Online Fitness Community",
    summary:
      "Create an online fitness community platform where users can connect, share their fitness journeys, and participate in challenges. Implement features such as user profiles, activity tracking, and social interactions. Design an engaging and interactive interface that fosters a supportive fitness community.",
    comments: {
      publisher:
        "Consider using a combination of frontend and backend technologies such as React, Node.js, and MongoDB for building the platform. Integration with fitness tracking devices and apps can enhance the activity tracking functionality.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/12",
    end_date: "2023/09/30",
    task_type: "PROJECT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"],
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: false,
        task_detail:
          "Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0018_01",
      },
      {
        task_label: "Workout Library",
        task_completed: false,
        task_detail:
          "develop a library of pre-defined workouts or exercise routines",
        task_repo: "",
        task_id: "HCI0018_02",
      },
      {
        task_label: "Community Forums",
        task_completed: false,
        task_detail: "Create discussion forums for fitness-related conversations",
        task_repo: "",
        task_id: "HCI0018_03",
      },
    ],
  },

  {
    key: "HCI0019",
    publisher_id: "2117280001",
    assigner_id: "",
    title: "Home Renovation Planner",
    summary:
      "Design and develop a home renovation planner application that helps users plan and track their home improvement projects. Implement features such as project management, budget tracking, and task scheduling. Create an intuitive and user-friendly interface that enhances the renovation planning process.",
    comments: {
      publisher:
        "Consider using a combination of frontend and backend technologies like React, Node.js, and MongoDB for building the application. Integration with project management tools like Trello or Asana can enhance collaboration and task management.",
      assigner: "",
      student: "",
    },
    start_date: "2023/08/22",
    end_date: "2023/09/27",
    task_type: "ASSIGNMENT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"]
  },

  {
    key: "HCI0038",
    publisher_id: "2117280002",
    assigner_id: "2117280001",
    title: "Online Meditation Platform",
    summary:
      "Create an online meditation platform that offers guided meditation sessions, mindfulness exercises, and relaxation techniques. Implement features such as user profiles, progress tracking, and personalized recommendations. Design a calming and visually appealing interface that promotes mental well-being.",
    comments: {
      publisher:
        "Consider using video streaming technologies for delivering guided meditation sessions. Use a combination of frontend and backend technologies such as React, Node.js, and MongoDB for building the platform.",
      assigner: "",
      student: "",
    },
    start_date: "2023/07/12",
    end_date: "2023/08/18",
    task_type: "PROJECT",
    active: true,
    pdf_file:"",
    assesment_criteria:["accuracy","basic functionality","code quality","documentation"],
    subTaskInfo: [
      {
        task_label: "Account Settings and Preferences",
        task_completed: false,
        task_detail:
          "Create a page where users can manage their account settings, update personal information",
        task_repo: "",
        task_id: "HCI0038_01",
      },
      {
        task_label: "Mindfulness Reminders",
        task_completed: false,
        task_detail:
          "Implement a feature that sends periodic mindfulness reminders or notifications to users ",
        task_repo: "",
        task_id: "HCI0038_02",
      },
      {
        task_label: "Community Forums",
        task_completed: false,
        task_detail: "Create discussion forums for fitness-related conversations",
        task_repo: "",
        task_id: "HCI0038_03",
      },
    ],
  },
];
