import React from "react";

import Auth from "@/components/auth";

const Home = () => {
  const isUser = false;

  if (!isUser)
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );

  return <div>Home</div>;
};

export default Home;
