import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreateStory, StoryPage } from './page';

const App = () => {
  return (
    <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
      <p className="text-2xl font-bold text-navy-500 tracking-widest">DeepFiction</p>
      <div className="flex items-center">
        <p className="mr-2 text-sm">Powered by</p>
        <img src={logo} alt="logo" className="w-16 object-contain" />
      </div>
      </Link>
      <Link to="/create-story" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
        Create
      </Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/create-story" element={<CreateStory />} />
        <Route path="/:id" element={<StoryPage />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App