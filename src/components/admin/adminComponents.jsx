import React, { useEffect,useState } from "react";
import "../../style/Admin/recuadro.css";
import Modal from "../../modal/Modal";
import { ModalProyect } from "./modalAdmin";
import Table from "react-bootstrap/Table";
import axios from 'axios';

export function Recuadro() {
  const [idModificar, setIdModificar] = useState(null);

  const [Proyects, setProyects] = useState([
 
  ]);



useEffect(() => {
    getProyects();
  }, [Proyects]);
 
  const getProyects = async () => {
    const response = await axios.get("http://localhost:4000/api/proyects");
    setProyects(response.data);
  };
 
  const deleteProyects = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/proyects/${id}`);
      getProyects();
    } catch (error) {
      console.log(error);
    }
  };




  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    images: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (idModificar !== null) {
      const indexModificar = Proyects.findIndex((Proyects) => Proyects._id === idModificar);
      const nuevosDatos = [...Proyects];
      nuevosDatos[indexModificar] = formValues;
      setProyects(nuevosDatos);
      setIdModificar(null);
    } else {
      setProyects((prevState) => [...prevState, formValues]);
    }
    setFormValues({ id: 0, name: "", description: "", price: 0, images: "" });
  };

 

  const [mostrar, setMostrarProyect] = useState(false);

  const [contenido, setContenido] = useState(false);

  function otroProyecto() {
    setMostrarProyect(true);
    setContenido(true);
  }

  

  return (
    <div className="Recuadro-contenedor container">
      <Modal isOpen={mostrar} onClose={() => setMostrarProyect(false)}>
        <ModalProyect />
      </Modal>
      <div className="Recuadro-Proyectos">
        <h2 className="Recuadro-Proyectos-titulo">Proyectos</h2>
        <hr className="Recuadro-hr" />
      </div>
      <div className="Recuadro-contenido">
        {contenido === false ? (
          <div className="Recuadro-contenido-sinContenido">
            <button
              className="Recuadro-contenido-sinContenido-boton"
              onClick={otroProyecto}
            >
              {" "}
              AGREGAR{" "}
            </button>
          </div>
        ) : (
          <div className="Recuadro-contenido-conContenido">
            <Table className="form-table" striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Final</th>
                  <th>Encargado</th>
                  <th>Estado</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Proyects.map((Proyects, index) => (
                  <tr key={index}>
                    <td>{Proyects.proyectName}</td>
                    <td>{Proyects.fechIn}</td>
                    <td>{Proyects.fechFin}</td>
                    <td>{Proyects.resp}</td>
                    <td>{Proyects.state}</td>
                    <td>
                      <button
                        className="icon-pen"
                        onClick={() => setIdModificar(Proyects._id)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="icon-trash"
                        onClick={() => deleteProyects(Proyects._id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
