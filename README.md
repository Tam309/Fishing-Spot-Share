# **Fishing Spot Sharing Website**

# **Project Overview**

FishSpot is a social website where users can share their favorite fishing spots, interact with posts shared by others, like and comment on them, and discover new locations.

---

# **Feature**

1. **User Authentication**: Sign up and login features for users to manage their profiles.
2. **Fishing Spot Sharing**: Users can create posts to share fishing spots with descriptions, images, and location details.
3. **Post Interaction**: Users can like and comment on post
4. **User Profiles**: Each user has a profile showing their ammount of post and personal information.

---

# **Tech Stack**

1. **Frontend**: TypeScript, React, React Router, Axios (for API requests)
2. **Backend**: Node.js, Express.js, PostgreSQL (for database operations)
3. **API Documentation**: Swagger (Swagger docs available at https://fishing-spot-backend-fegydeb0a4fpc6hs.germanywestcentral-01.azurewebsites.net/api-docs/)

---

# **Installation and Setup**

## **Prerequisites**

- Node.js v14+ and npm v6+

## **Environment Variables**

- Set up a `.env` file in the root directory with the following variables:

```bash
VITE_BASE_URL: http://localhost:3001
```

## **Steps**

1. **Cloning repository**

```bash
git clone https://github.com/Tam309/Fishing-Spot-Share.git
```

2. **Change directory to client folder**

```bash
cd FishingWeb
```

3. **Install dependencies**

```bash
npm install
```

4. **Run the App**

```bash
npm run dev
```

---

# **Project Structure**

1. **Client**
```plaintext
FishingWeb/
|-- src/
    |-- components/ # Include all Componets
    |-- App.tsx # Root Component 
```
2. **Server**
```plaintext
server/
|-- helpers # Databse Setup
|-- routes/
     |-- user.js # User's route
     |-- post.js # Post's route
     |-- comment.js # Comment's route
|-- app.js # Main Sever File
```

---

# **Component Documentation**

## **Key Components**
1. **HomePage**: Displays the main feed of fishing spots shared by users.
2. **MySpotPage**: Displays all the spots which are posted by user.
3. **SinglePostPage**: Displays details of a specific post.
4. **ProfilePage**: Displays user's information

## **Additional Components**
- Each component is documented within the code, describing its purpose, props, and typical usage.

---

# **Routing**
- The app uses React Router to manage routing:
1. **`/`**: Landing Page
2. **`/home`**: HomePage    
3. **`/upload`**: Upload Page
4. **`/profile`**: Profile Page
5. **`/posts/:id`**: SinglePostPage  
6. **`/register`**: Register Page
7. **`/login`**: Login Page
8. **`/edit/:post_id`**: Edit Post Page
9. **`/discuss/:post_id`**: Disscuss Page
10. **`/mySpots`**: MySpotPage

---

# **Styling**
- The app uses Module css and TailWind css for styling

---
This README gives a high-level overview of the project's core features, setup instructions, and structure, making it easy for new contributors or developers to get started. Let me know if you'd like to add specific details about individual components or further instructions.
