import React from "react";
import { Link } from "react-router-dom";
import "../../style/Admin/header.css";

export function HeaderAdmin( props ) {
  return (
    <header className="HeaderAdmin-header">
      <Link to="/" >
      <i class="fa-sharp fa-regular fa-circle-left HeaderAdmin-return" />
      </Link>
      <h3 className="HeaderAdmin-Titulo">{props.titulo}</h3>
    </header>
  );
}