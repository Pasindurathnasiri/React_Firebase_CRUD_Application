import React,{useState,useEffect} from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {

    var [contactObjects,setcontactObjects] = useState({});
    var [currentId,setCurrentId] = useState('')


    useEffect(()=>{
        firebaseDb.child('contacts').on('value',snapshot=>{
           if(snapshot.val()!=null)
           setcontactObjects({
               ...snapshot.val()
           }) 
        })
    },[])


    const addOrEdit = obj =>{
        if(currentId=='')
        firebaseDb.child('contacts').push(
            obj,
            err=>{
                if(err){
                    console.log(err);
                }else{
                    setCurrentId('')
                }
                   
            }
            
        )
        else
        firebaseDb.child(`contacts/${currentId}`).set(
            obj,
            err=>{
                if(err){
                    console.log(err);
                }else{
                    setCurrentId('')
                }
       
            }
            
        )

    }

    return ( 
        <React.Fragment>
        <div className="content">
            <div className="title">
                <h1>Contacts</h1>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({addOrEdit,currentId,contactObjects})} />

                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                {/* <th>Address</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id=>{
                                    return <tr key={id}>
                                        <td>{contactObjects[id].fullName}</td>
                                        <td>{contactObjects[id].mobile}</td>
                                        <td>{contactObjects[id].email}</td>
                                        {/* <td>{contactObjects[id].address}</td> */}
                                        <td>
                                            <a className="btn text-primary" onClick={()=>{setCurrentId(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger">
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                            
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
            
        </div>
        
        </React.Fragment>
     );
}
 
export default Contacts;