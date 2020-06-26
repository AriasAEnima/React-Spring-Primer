/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//import React from 'react';
//import {circulos} from './Sketch';
var vaciado=true;
class Dibujo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            status: []
        };
    }
    componentDidMount() {
        this.timerID = setInterval(
                () => {this.sendStatus();  this.actualizar();   },               
                2000
                );            
    
    }

    sendStatus() {   
                     
        const data = new FormData();       
        data.append('lista', circles());            
        fetch('/addcircles', {
            method: 'POST',
            body: data
        })
                .then(function (response) {                        
                    if (response.ok) {                           
                        //console.log("paso", data);   
                       
                        vaciarSinLimpiar();
                        return response.text();
                    } else {
                        console.log("Algo paso", data);
                        throw "Error en la llamada Ajax";
                    }
                    

                });   
         
               
     }
     
     actualizar(){
          fetch("/circulos")
                      .then(res => res.json())
                      .then(
                              (result) => {
                          this.setState({
                              isLoaded: true,
                              status: result
                          }
                          );
                         if(result.length===0 && !vaciado){
                             console.log("VACIOOO ");
                             vaciar();
                             okRunD();
                             vaciado=true;
                         }else if(result.length!==0 ){
                             vaciado=false;
                         }              
                          console.log("result:" + result.toString() + "s");
                          console.log("estado:" + this.state.status);
                          addCirculos(this.state.status);
                      },
                              // Note: it's important to handle errors here
                                      // instead of a catch() block so that we don't swallow
                                              // exceptions from actual bugs in components.
                                                      (error) => {
                                                  this.setState({
                                                      isLoaded: true,
                                                      error
                                                  });
                                              }); 
         
     }
     
    reiniciar(){     
         vaciar();
         stopD();
        fetch('/reiniciar', {
              method: 'POST',               
          })
                  .then(function (response) {                        
                      if (response.ok) {                               
                          return response.text()
                      } else {                          
                          throw "Error en la llamada Ajax";
                      }

                  });
       
       
    }
    
  
    render() {
        const {error, isLoaded, status} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                    <div> 
                        <h1>The server status is:</h1>
                        <p>                             
                            {status.length}
                        </p>
                         <button onClick={this.reiniciar}> Reinicie! </button>
                    </div>
                  
                    
                    );
        }
    }
}

ReactDOM.render(
        <Dibujo />,
        document.getElementById('estadoserver')
);

