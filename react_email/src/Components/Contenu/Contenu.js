/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './Contenu.css';
import { useState } from 'react';
import axios from 'axios';
import { Editor } from "primereact/editor";
import { Button } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import { TableCaption } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react' ;

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
export default function Contenu(props) {
    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');
    const [file,setFile] = useState();
    const [filename,setFilename] = useState('');
    const [emails,setEmails] = useState([]);
    const filereader =new FileReader();
    const[headeer,setHeeader]=useState([]);
    const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null, cellKey: null });
    const [currentText,setCurrentText]=useState('');
    const [send,setSend]=useState(false);
    const [password,setPassword]=useState(props.password);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [attachment, setAttachment] = useState({ selectedFile: null });
    useEffect(() => {
        console.log(attachment);
    },[attachment])
   
    const checkpassword=async(password,email)=>{
        const response = await axios.post('http://127.0.0.1:8081/checkpassword', {
           
    
            email: email,
            password: password,
        
        },{
            
        });
        return response;
    }
    const validatePassword = async () => {
        try {
            const response = await checkpassword(password, props.email);
            if (response.status !== 200) {
                setIsPasswordValid(false);
               alert("Password is incorrect");
                
            } else {
                

                setIsPasswordValid(true);
                alert("Password is correct");
                
            }
        } catch (error) {
            console.error("Password check failed", error);
            setIsPasswordValid(false);
        }
    };
    useEffect(() => {
        

        // Call validatePassword when email or password changes
        if (props.email && password) {
            validatePassword();
        }
    }, [ password]);
   
   
    const onEdit = (rowKey, cellKey, currentText) => {
        setInEditMode({
            status: true,
            rowKey: rowKey,
            cellKey: cellKey,
        });
        setCurrentText(currentText);
    }
    
    
    const updateEmails = (rowKey, cellKey, newText) => {
        const updatedEmails = emails.map((email, index) => {
            if (index === rowKey) {
                const updatedEmail = { ...email };
                updatedEmail[headeer[cellKey]] = newText;
                return updatedEmail;
            }
            return email;
        });
        setEmails(updatedEmails);
    };
    
   
    const csvFileToArray = string  => {
        const header=string.slice(0,string.indexOf('\n')).split(',');
        setHeeader(header);
        const emailIndex = header.findIndex(field => field.toLowerCase().includes('email'));
        const rows=string.slice(string.indexOf('\n')+1).split('\n');
        const arr = rows.map(row => {
            const values = row.split(',');
            const obj = header.reduce((acc,cur,index) => {
                acc[cur]=values[index];
                return acc;
            },{});
            return obj;
        });
        const filteredArr = arr.filter(row =>  row[header[emailIndex]] !== undefined);
        console.log("filteredArr\n",filteredArr);
        setEmails(filteredArr);
    }
    const createemails=(file)=>{
        if(file){
        filereader.onload = (e) => {
            const text = (e.target.result);
            csvFileToArray(text);
        }
        filereader.readAsText(file);

        }
     
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        sendEmail()
    }
    const sendEmail = async () => {
        try {
            const formData = new FormData();
            formData.append('subject', subject);
            formData.append('message', message);
            formData.append('file', JSON.stringify(emails));
            formData.append('filename', filename);
            formData.append('email', props.email);
            formData.append('password', password);
            
            if (attachment.selectedFile) {
                formData.append('attachment', attachment.selectedFile);
            }
            console.log(formData)
            // Send the request using Axios
            const response = await  fetch ('http://127.0.0.1:8081/emails',{
                method: 'POST',
                body: formData,
                
            });

            
    
            console.log(response.json());
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    useEffect((
        
    ) => {console.log(emails)}, [emails]);
  return (
    <>
    <Box className='All_contenu' style={{
        float: 'left',
        position: 'relative',
        top: '50px',
    }}  borderRadius='lg' borderWidth='1px'>

        <div className='title'>Client Email Automation</div>
        <div className='Subject'>
            <Text mb='7px'
                style={
                    {
                        color: 'blue',
                        fontSize: '20px',
                    }
                }
                >Subject</Text>
            <Input type='text' className='form-control'onChange={(e)=>{
                setSubject(e.target.value);
            }} />
            
        </div>
        <div className='data'>
            <div className='Message'>
                <Text mb='7px'
                style={
                    {
                        color: 'blue',
                        fontSize: '20px',
                    }
                }
                >Message</Text>
                <Editor className='form-control' id='message' value={message}
                onTextChange={(e)=>{
                    setMessage(e.htmlValue);
                }}
                style={{ height: '320px' }}
                />
                
            </div>
           
        </div>
        
        <div className='To'  style={{
            display: 'flex',
            flexDirection: 'row',
        
        }}>
            <div className='data_csv'>
            <Text mb='7px'
                style={
                    {
                        color: 'green',
                        fontSize: '20px',
                    }
                }>Upload Spreadsheet of Client Emails</Text>
                <Input type='file' className='form-control' 
                accept='.csv'
                onChange={(e)=>{
                    setFile(e.target.files[0]);
                    setFilename(e.target.files[0].name);
                }}
                onBlur={() => {
                    createemails(file);
                }}
                />
                 <p
                 style={{
                     marginTop: '10px',
                     marginLeft: '22px',
                 }}
                 >Your Data &#8594;</p>
                 </div>
                 <div style={{
                    float:'right'
                 }}>
                    <Text mb='7px'>
                        Your Attachement 
                    </Text>
                    <input type="file" accept=".pdf"
                     onChange={(event) => setAttachment({ selectedFile: event.target.files[0] })} />

                 </div>
        </div>
        <div className='button_center'>
            <Button className='btn btn-primary' onClick={(e)=>{
                handleSubmit(e);
                setSend(true);
                 
                
            }}> {
               send ? <Spinner /> : 
            
                <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='Send email'
            icon={<EmailIcon />}
          />
        
        }
          </Button>
        </div>  
    
    </Box>
    {isPasswordValid === false ? (
                <div style={{
                    position: 'relative',
                    top: '20px',
                    left: '500px',
                    color: 'red',
                    fontSize: '20px',
                }}>
                    <p style={{
                        color: 'blue',
                        fontSize: '20px',
                    }}>
                        Incorrect password for your email
                    </p>
                    <Input type='password' className='form-control' style={{
                        width: '200px',
                    }} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
            )
        : null
        }

    { emails.length > 0 ? (
        
   
    <>
        <div  style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: '130px',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: "Gill Sans Extrabold",
            left: '400px',
            maxWidth: 'fit-content',
            color: 'blue',
        }}>
            When you click on the cell, you can edit the data
        </div>
        
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: '150px',
            left: '400px',
            maxWidth: 'fit-content',
        }}>
            <TableContainer
            style={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
            >

          <Table variant='striped' colorScheme='teal'>
          <TableCaption>All Client Data from {filename}</TableCaption>
            <Thead>
           {
             headeer.map((head,index) => (
                <Th key={index}  >{head}</Th>
            ))
           } 
           
           </Thead>
           <Tbody>
        {emails.map((email, rowIndex) => (
            <Tr key={rowIndex}>
                {headeer.map((col, colIndex) => (
                    <Td key={colIndex} onClick={() => onEdit(rowIndex, colIndex, email[col])}>
                        {inEditMode.status && inEditMode.rowKey === rowIndex && inEditMode.cellKey === colIndex ? (
                            <Input 
                                type='text' 
                                value={currentText} 
                                onChange={(e) => setCurrentText(e.target.value)} 
                                onBlur={() => {
                                    updateEmails(inEditMode.rowKey, inEditMode.cellKey, currentText);
                                    setInEditMode({ status: false, rowKey: null, cellKey: null });
                                }} 
                            />
                        ) : (
                            email[col]
                        )}
                    </Td>
                ))}
            </Tr>
        ))}
    </Tbody>

    </Table>
            </TableContainer>

        </div> 
    </>
    ) : null    
}
        </>

  );
}

