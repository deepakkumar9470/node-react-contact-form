import React,{useState} from 'react'
import '../App.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
   const notify = () => toast("Wow so easy !");
   const [sent, setSent] = useState(false)
   const [name, setName] = useState(" ")
   const [phone, setPhone] = useState(" ")
   const [message, setMessage] = useState(" ")

   const submitFormHandler = async (e) =>{
       try {
           await axios.post('http://localhost:5000/send',{
               name,
               phone,
               message
           })
        } catch (error) {
           console.log(error)
        }
       e.preventDefault()
       setSent(true)
   }

    return (
        <div class="container">
        <h1 class="brand"><span>NodeJS</span> Form Assignment</h1>
         <div class="wrapper animated bounceInLeft">
            <div class="company-info">
                <h3>NodeJS Form</h3>
                
                <ul>
                <li><i class="fa fa-road"></i> 55 Something here</li>
                <li><i class="fa fa-phone"></i>+91-9990008888</li>
                <li><i class="fa fa-envelope"></i> admin@scizers.com</li>
                </ul>
            </div>
        <div class="contact">
            <h3>Email Us</h3>
               
            { !sent ? (
                <form onSubmit={submitFormHandler}>
                <p>
                    <label>Name</label>
                    <input type="text" name="name" autoComplete="false" required="true" value = {name}
                    onChange = {(e)=> setName(e.target.value)}/>
                </p>
                <p>
                    <label>Phone Number</label>
                    <input type="text" name="phone" maxlength="10" autoComplete="false" value = {phone}required="true" onChange = {(e)=> setPhone(e.target.value)}/>
                </p>
                <p class="full">
                    <label>Message</label>
                    <textarea name="message" rows="5"  required="true" onChange = {(e)=> setMessage(e.target.value)} value = {message}></textarea>
                </p>
                <p class="full">
                    <button type="submit">Submit</button>
                </p>
                
             </form>
              ) : null
            }
           </div>
          </div>
    </div>
    )
}

export default ContactForm;
