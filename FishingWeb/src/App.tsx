// import React, { useState } from "react";
// import { FaSearch, FaUpload, FaUser, FaMapMarkerAlt, FaFish, FaComments } from "react-icons/fa";
// import { BiMenu } from "react-icons/bi";

// const FishingSpotWebsite = () => {
//   const [currentPage, setCurrentPage] = useState("home");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const renderPage = () => {
//     switch (currentPage) {
//       case "home":
//         return <HomePage />;
//       case "explore":
//         return <ExploreSpotsPage />;
//       case "upload":
//         return <UploadSpotPage />;
//       case "mySpots":
//         return <MySpotsPage />;
//       case "profile":
//         return <ProfilePage />;
//       case "sharedSpots":
//         return <SharedSpotsPage />;
//       default:
//         return <HomePage />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-blue-600 p-4 text-white">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">FishSpot</h1>
//           <div className="hidden md:flex space-x-4">
//             <button onClick={() => setCurrentPage("home")} className="hover:text-blue-200">Home</button>
//             <button onClick={() => setCurrentPage("explore")} className="hover:text-blue-200">Explore Spots</button>
//             <button onClick={() => setCurrentPage("upload")} className="hover:text-blue-200">Upload Spot</button>
//             <button onClick={() => setCurrentPage("mySpots")} className="hover:text-blue-200">My Spots</button>
//             <button onClick={() => setCurrentPage("sharedSpots")} className="hover:text-blue-200">Shared Spots</button>
//             <button onClick={() => setCurrentPage("profile")} className="hover:text-blue-200">Profile</button>
//           </div>
//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               <BiMenu size={24} />
//             </button>
//           </div>
//         </div>
//       </nav>
//       {isMenuOpen && (
//         <div className="md:hidden bg-blue-500 p-4">
//           <button onClick={() => { setCurrentPage("home"); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">Home</button>
//           <button onClick={() => { setCurrentPage("explore"); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">Explore Spots</button>
//           <button onClick={() => { setCurrentPage("upload"); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">Upload Spot</button>
//           <button onClick={() => { setCurrentPage("mySpots"); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">My Spots</button>
//           <button onClick={() => { setCurrentPage("sharedSpots"); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">Shared Spots</button>
//           <button onClick={() => { setCurrentPage("profile"); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">Profile</button>
//         </div>
//       )}
//       {renderPage()}
//     </div>
//   );
// };

// const HomePage = () => {
//   return (
//     <div className="relative h-screen">
//       <div 
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514469038836-36452c63d69a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')" }}
//       ></div>
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
//         <h1 className="text-5xl font-bold mb-4">Discover Your Perfect Fishing Spot</h1>
//         <p className="text-xl mb-8">Share and explore the best fishing locations with fellow anglers</p>
//         <div className="w-full max-w-md">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for fishing spots..."
//               className="w-full py-3 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600">
//               <FaSearch size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExploreSpotsPage = () => {
//   const spots = [
//     { id: 1, name: "Crystal Lake", description: "Clear waters with abundant trout", image: "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
//     { id: 2, name: "Rocky River", description: "Challenging spot for experienced anglers", image: "https://images.unsplash.com/photo-1508343919546-4a5d6c083f44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
//     { id: 3, name: "Sunset Beach", description: "Perfect for surf fishing", image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80" },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Explore Fishing Spots</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {spots.map((spot) => (
//           <div key={spot.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
//             <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
//               <p className="text-gray-600">{spot.description}</p>
//               <div className="mt-4 flex justify-between items-center">
//                 <span className="text-sm text-gray-500 flex items-center">
//                   <FaMapMarkerAlt className="mr-1" /> 2.5 miles away
//                 </span>
//                 <span className="text-sm text-gray-500 flex items-center">
//                   <FaFish className="mr-1" /> Trout, Bass
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const UploadSpotPage = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Upload a New Fishing Spot</h2>
//       <form className="bg-white rounded-lg shadow-md p-6">
//         <div className="mb-4">
//           <label htmlFor="spotName" className="block text-gray-700 font-bold mb-2">Spot Name</label>
//           <input type="text" id="spotName" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
//           <input type="text" id="location" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
//           <textarea id="description" rows="4" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="fishSpecies" className="block text-gray-700 font-bold mb-2">Fish Species</label>
//           <input type="text" id="fishSpecies" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="e.g., Trout, Bass, Salmon" />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 font-bold mb-2">Upload Images</label>
//           <div className="border-dashed border-2 border-gray-400 rounded-lg p-4 text-center">
//             <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
//             <p className="text-gray-600">Drag and drop your images here, or click to select files</p>
//             <input type="file" multiple className="hidden" />
//           </div>
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Upload Spot</button>
//       </form>
//     </div>
//   );
// };

// const MySpotsPage = () => {
//   const mySpots = [
//     { id: 1, name: "Secret Cove", description: "Hidden gem for night fishing", image: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1315&q=80" },
//     { id: 2, name: "Mountain Stream", description: "Great for fly fishing", image: "https://images.unsplash.com/photo-1610850775142-b4d106bb7481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">My Fishing Spots</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {mySpots.map((spot) => (
//           <div key={spot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
//               <p className="text-gray-600 mb-4">{spot.description}</p>
//               <div className="flex justify-between">
//                 <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Edit</button>
//                 <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProfilePage = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col md:flex-row items-center mb-6">
//           <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
//           <div>
//             <h2 className="text-3xl font-bold mb-2">John Doe</h2>
//             <p className="text-gray-600 mb-2">Avid angler and nature enthusiast</p>
//             <p className="text-gray-600">Seattle, Washington</p>
//           </div>
//         </div>
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2">Bio</h3>
//           <p className="text-gray-600">I've been fishing for over 20 years and love exploring new spots. Always up for trading fishing stories and tips!</p>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="bg-gray-100 p-4 rounded-lg text-center">
//             <h4 className="font-semibold">Spots Uploaded</h4>
//             <p className="text-2xl font-bold text-blue-600">15</p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded-lg text-center">
//             <h4 className="font-semibold">Total Likes</h4>
//             <p className="text-2xl font-bold text-blue-600">127</p>
//           </div>
//         </div>
//         <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Edit Profile</button>
//       </div>
//     </div>
//   );
// };

// const SharedSpotsPage = () => {
//   const sharedSpots = [
//     { id: 1, name: "Golden Pond", description: "A serene spot for carp fishing", image: "https://images.unsplash.com/photo-1593816151811-39a9db0b7c82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80", sharedBy: "Alice Smith", date: "2023-05-15" },
//     { id: 2, name: "Whispering Creek", description: "Perfect for trout fishing in spring", image: "https://images.unsplash.com/photo-1516034618791-0a1dd83f7e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", sharedBy: "Bob Johnson", date: "2023-05-10" },
//     { id: 3, name: "Eagle's Nest Lake", description: "Great for bass fishing with beautiful scenery", image: "https://images.unsplash.com/photo-1454623228540-d5832958ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", sharedBy: "Carol Davis", date: "2023-05-05" },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Recently Shared Fishing Spots</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sharedSpots.map((spot) => (
//           <div key={spot.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
//             <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
//               <p className="text-gray-600 mb-4">{spot.description}</p>
//               <div className="flex justify-between items-center text-sm text-gray-500">
//                 <span className="flex items-center">
//                   <FaUser className="mr-1" /> {spot.sharedBy}
//                 </span>
//                 <span>{spot.date}</span>
//               </div>
//               <div className="mt-4 flex justify-between items-center">
//                 <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center">
//                   <FaComments className="mr-2" /> Discuss
//                 </button>
//                 <span className="text-sm text-gray-500 flex items-center">
//                   <FaFish className="mr-1" /> Carp, Bass
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FishingSpotWebsite;

// src/App.tsx
import React from 'react';
import FishingSpotWebsite from './components/FishSpotWebsite';

const App: React.FC = () => {
  return (
    <FishingSpotWebsite />
  );
};

export default App;
