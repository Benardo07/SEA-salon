
  import React from "react";

  const Loading: React.FC = () => {
    return (
      <main className="flex flex-auto w-screen h-screen justify-center items-center relative bottom-20 z-10">
        <div className="loader"></div>
      </main>
    );
  };
  
  export default Loading;