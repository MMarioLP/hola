import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../style/Admin/modal.css";


const url = 'http://localhost:4000/api/users'
export function ModalProyect() {
  const [users, setUsers] = useState([
 
  ]);

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:4000/api/users");
    setUsers(response.data);
  };

  const [form, setForm] = useState([
    {
       proyectName: "",
       proyectDes: "",
        fechIn: "",
        fechFin: "",
        resp: "",
        state:"Activo",
        proyectIntegrante: []
    }
  ]);
  const peticionPost = () => {
    axios
      .post(url, form)
      .then((response) => {
        modalInsertar();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };


  leerObjetoDatos = e => {
    const { name, value } = e.target;
      this.setState({
          [name] : {...this.state[name], e.target.value},
      })
  }

  return (
    <div className="ModalProyect-container">
      <h2 className="ModalProyect-titulo">Creando proyecto</h2>
      <div className="ModalProyect-form">
        <form action="" >

          <div className="ModalProyect-form-Nombre">
            <label>Nombre del proyecto</label>
            <input type="text"   name="proyectName" />
          </div>

          <div className="ModalProyect-form-Description">
            <label>Description</label>
            <input
            
              name="proyectDes"
              id="ProyectDesc"
              cols="30"
              rows="10"
              type="text"
              onChange={handleChange}value={form ? form.proyectDes : ""}
             
            ></input>
          </div>

          <div className="ModalProyect-form-FechaIn">
            <label>Fecha Inicio</label>
            <input type="date"  name ="fechIn"  onChange={handleChange}value={form ? form.fechIn : ""}  />
          </div>

          <div className="ModalProyect-form-FechaFin">
            <label>Fecha Final</label>
            <input type="date" name ="fechFin"  onChange={handleChange}value={form ? form.fechFin : ""} />
          </div>

          <div className="ModalProyect-form-FechaFin">
            <label>Responsable</label>
            <input type="text"   name ="resp"  onChange={handleChange}value={form ? form.resp : ""}  />
          </div>

          <div className="ModalProyect-form-Integrantes">
            <label>Integrantes</label>
            
            
            <div className="ModalProyect-form-contenido">
             
               
              </div>
              
              <div className="ModalProyect-form-Integrantes-miembros">
                <label>Nombre ApellidoPaterno ApellidoMaterno</label>
                <input type="radio" id="responsable" name="responsable" value="responsable" />
                <button className="form-Integrantes-Drop"><i className="fa-solid fa-trash"></i></button>
                <div className="table-container">
                  <table>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.nombreUsuario}   </td>
                          <td>{user.apellidosUsuario}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

           
          </div>

          <div className="ModalProyect-form-Estado">
      <label>Estado</label>
      <div className="ModalProyect-form-Estado-values">
        <label>Activo</label>
        <input
          type="radio"
          name="state"
          

          checked={form.state  === "Activo"}
          onChange={handleChange}value={form ? form.state : "Activo"} 
         
        />
        <label>Pausado</label>
        <input
          type="radio"
          name="state"
          
          checked={form.state  === "Pausado"}
         
          onChange={handleChange}value={form ? form.state : "Pausado"} 
        />
        <label>Finalizado</label>
        <input
          type="radio"
          name="state"
         
          checked={form.state === "Finalizado"}
           onChange={handleChange}value={form ? form.state : "Finalizado"} 
        />
      </div>
    </div>

          <div className="ModalProyect-form-Btn">
            <button>
              onClick={()=>{
                setForm({
                  form:null,
                  tipoModa:"insertar"
                })
                modalInsertar()
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


