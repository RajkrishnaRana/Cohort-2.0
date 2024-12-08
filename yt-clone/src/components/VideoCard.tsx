import React from "react";

function VideoCard() {
  return (
    <div>
      <img src="/thumbnail-1.jpg" className="rounded-lg h-60 w-70"></img>
      <div className="grid grid-cols-12 pt-3">
        <div className="col-span-1">
          <img src="/author.jpg" className="rounded-full w-12 h-12"></img>
        </div>

        <div className="col-span-11 pl-5">
          <div>Calm Nature Village scen | Kerala Tour</div>
          <div className="text-gray-500 text-base">Rajkrishna Rana</div>
          <div className="text-gray-500 text-base">46Mn | 13 days ago</div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
