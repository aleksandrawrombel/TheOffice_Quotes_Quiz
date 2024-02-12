import React, { useState, useEffect } from 'react';
import "../style/main.css";

const Loading = () => {
  return (
    <>
      <div class="absCenter">
        <div class="canvas">
          <div class="move">
            <div class="plate"></div>
            <div class="stapler">
              <div class="metal"></div>
              <div class="top"></div>
              <div class="bottom"></div>
            </div>
            <div class="skew">
              <div class="tilt">
                <div class="jello">
                  <div class="shine"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
