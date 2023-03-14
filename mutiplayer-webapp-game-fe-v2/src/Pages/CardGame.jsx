import { useEffect, useState, useRef } from "react";
import Card from "../Components/Card";

function CardGame() {
  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-sm"><Card></Card></div>
          <div class="col-sm"><Card></Card></div>
          <div class="col-sm"><Card></Card></div>
        </div>
        <div class="row">
          <div class="col-sm"><Card></Card></div>
          <div class="col-sm"><Card></Card></div>
          <div class="col-sm"><Card></Card></div>
        </div>
        <div class="row">
          <div class="col-sm"><Card></Card></div>
          <div class="col-sm"><Card></Card></div>
          <div class="col-sm"><Card></Card></div>
        </div>
      </div>
    </div>
  );
}
export default CardGame;
